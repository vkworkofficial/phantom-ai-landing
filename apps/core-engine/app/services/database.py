from sqlalchemy import Column, String, JSON, DateTime, Integer, Float, Boolean, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone
import os
from typing import Optional, Dict
from app.core.config import settings
from app.models.simulation import SeanceReport
from pydantic import TypeAdapter

Base = declarative_base()

class DBOrganization(Base):
    __tablename__ = "organizations"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class DBUser(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(String, default="member") # admin, member
    organization_id = Column(String, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class DBAuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    action = Column(String, nullable=False) # e.g., 'START_SIMULATION', 'DOWNLOAD_REPORT'
    actor_id = Column(String, index=True) # Ghost Key or User ID
    resource_id = Column(String, index=True) # simulation_id
    status = Column(String) # 'success', 'failure'
    ip_address = Column(String)

class DBSeanceReport(Base):
    __tablename__ = "seance_reports"
    
    id = Column(String, primary_key=True, index=True)
    organization_id = Column(String, index=True, nullable=True) # Optional for backward compatibility/public runs
    target_url = Column(String, nullable=False)
    status = Column(String, nullable=False)
    ghosts_deployed = Column(Integer, default=0)
    friction_points = Column(JSON, default=[])
    conversion_blockers = Column(JSON, default=[])
    confusion_score = Column(Float)
    pmf_score = Column(Float)
    disappointment_breakdown = Column(JSON)
    telemetry = Column(JSON)
    heatmap_data = Column(JSON)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    seance_token = Column(String, nullable=True)
    # Metadata for websocket orchestration
    personas = Column(JSON, nullable=True)
    industry = Column(String, nullable=True)
    primary_goal = Column(String, nullable=True)

class PostgresStorage:
    def __init__(self, db_url: str):
        # CTO Mandate: Ensure production URLs use the correct prefix and SSL
        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://", 1)
        
        connect_args = {}
        if settings.DATABASE_SSL and not db_url.startswith("sqlite"):
            connect_args["sslmode"] = "require"

        # Initialize engine with robust connection pooling (Phantom High-Performance Substrate)
        self.engine = create_engine(
            db_url,
            connect_args=connect_args,
            pool_size=10,
            max_overflow=20,
            pool_pre_ping=True
        )
        Base.metadata.create_all(bind=self.engine)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def save_report(self, report: SeanceReport):
        db = self.SessionLocal()
        try:
            report_dict = report.model_dump()
            # Ensure HttpUrl is stringified for SQLAlchemy String column
            if 'target_url' in report_dict and report_dict['target_url']:
                report_dict['target_url'] = str(report_dict['target_url'])
            
            db_report = DBSeanceReport(**report_dict)
            db.merge(db_report)
            db.commit()
        finally:
            db.close()

    def get_report(self, sim_id: str) -> Optional[SeanceReport]:
        db = self.SessionLocal()
        try:
            db_report = db.query(DBSeanceReport).filter(DBSeanceReport.id == sim_id).first()
            if not db_report:
                return None
            
            # Convert DB model back to Pydantic
            data = {c.name: getattr(db_report, c.name) for c in db_report.__table__.columns}
            return TypeAdapter(SeanceReport).validate_python(data)
        finally:
            db.close()

    def list_reports(self, organization_id: Optional[str] = None) -> Dict[str, SeanceReport]:
        db = self.SessionLocal()
        try:
            query = db.query(DBSeanceReport)
            if organization_id:
                query = query.filter(DBSeanceReport.organization_id == organization_id)
            db_reports = query.all()
            results = {}
            for db_report in db_reports:
                data = {c.name: getattr(db_report, c.name) for c in db_report.__table__.columns}
                results[db_report.id] = TypeAdapter(SeanceReport).validate_python(data)
            return results
        finally:
            db.close()

    def bootstrap_org(self, org_id: str, name: str):
        db = self.SessionLocal()
        try:
            org = DBOrganization(id=org_id, name=name)
            db.merge(org)
            db.commit()
        finally:
            db.close()

    def log_action(self, action: str, actor_id: str, resource_id: str = None, status: str = "success", ip: str = None):
        if not settings.SECURITY_AUDIT_LOGS_ENABLED:
            return
        db = self.SessionLocal()
        try:
            log_entry = DBAuditLog(
                action=action,
                actor_id=actor_id,
                resource_id=resource_id,
                status=status,
                ip_address=ip
            )
            db.add(log_entry)
            db.commit()
        finally:
            db.close()

# Hybrid Storage that falls back to SQLite if Postgres is not configured
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Use SQLite for local development if no Postgres is provided
    # Standard YC/Dev practice for cross-platform ease
    DATABASE_URL = "sqlite:///./phantom_substrate.db"

simulation_storage = PostgresStorage(DATABASE_URL)
