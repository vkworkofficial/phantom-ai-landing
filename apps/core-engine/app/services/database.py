from sqlalchemy import Column, String, JSON, DateTime, Integer, Float, Boolean, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone
import os
from typing import Optional, Dict
from app.models.simulation import SeanceReport
from pydantic import TypeAdapter

Base = declarative_base()

class DBSeanceReport(Base):
    __tablename__ = "seance_reports"
    
    id = Column(String, primary_key=True, index=True)
    target_url = Column(String, nullable=False)
    status = Column(String, nullable=False)
    ghosts_deployed = Column(Integer, default=0)
    friction_points = Column(JSON, default=[])
    conversion_blockers = Column(JSON, default=[])
    confusion_score = Column(Float, default=0.0)
    telemetry = Column(JSON, nullable=True)
    heatmap_data = Column(JSON, default=[])
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class PostgresStorage:
    def __init__(self, db_url: str):
        self.engine = create_engine(db_url)
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

    def list_reports(self) -> Dict[str, SeanceReport]:
        db = self.SessionLocal()
        try:
            db_reports = db.query(DBSeanceReport).all()
            results = {}
            for db_report in db_reports:
                data = {c.name: getattr(db_report, c.name) for c in db_report.__table__.columns}
                results[db_report.id] = TypeAdapter(SeanceReport).validate_python(data)
            return results
        finally:
            db.close()

# Hybrid Storage that falls back to SQLite if Postgres is not configured
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Use SQLite for local development if no Postgres is provided
    # Standard YC/Dev practice for cross-platform ease
    DATABASE_URL = "sqlite:///./phantom_substrate.db"

simulation_storage = PostgresStorage(DATABASE_URL)
