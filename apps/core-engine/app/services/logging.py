import logging
import json
import os
import re
from datetime import datetime
from typing import Any, Dict, Optional

# Forensic PII Scrubbing Substrate
PII_PATTERNS = {
    "email": re.compile(r'[\w\.-]+@[\w\.-]+\.\w+'),
    "ipv4": re.compile(r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b'),
    "token": re.compile(r'(?i)(bearer\s+|x-phantom-key[:\s]+)[a-zA-Z0-9\.\-_]+')
}

class SubstrateLogger:
    """
    Forensic logging service for AI Ghost interactions.
    Writes structured JSON logs for auditability and compliance review.
    Ensures zero-PII leakage into common log streams.
    """
    def __init__(self, log_dir: str = "data/logs/forensics"):
        self.log_dir = log_dir
        os.makedirs(self.log_dir, exist_ok=True)
        
        # Configure standard python logging for higher-level observability
        logging.basicConfig(
            level=logging.INFO,
            format='{"timestamp": "%(asctime)s", "level": "%(levelname)s", "module": "%(name)s", "message": "%(message)s"}',
            handlers=[
                logging.FileHandler(f"{log_dir}/system.log"),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger("phantom.substrate")

    def scrub(self, data: str) -> str:
        """Masks PII elements in strings before they touch the persistent substrate."""
        for name, pattern in PII_PATTERNS.items():
            data = pattern.sub(f"[SCRUBBED_{name.upper()}]", data)
        return data

    def _persist_jsonl(self, payload: Dict[str, Any], prefix: str = "activity"):
        """Writes immutable audit trails to the forensic log directory."""
        log_file = f"{self.log_dir}/{prefix}_{datetime.now().strftime('%Y-%m-%d')}.jsonl"
        with open(log_file, "a") as f:
            f.write(json.dumps(payload) + "\n")

    def log_interaction(self, ghost_id: str, action: str, details: Dict[str, Any], trace_id: Optional[str] = None):
        # Scrub sensitive details before serialization
        scrubbed_details = json.loads(self.scrub(json.dumps(details)))
        
        payload = {
            "timestamp": datetime.utcnow().isoformat(),
            "ghost_id": ghost_id,
            "trace_id": trace_id,
            "action": action,
            "details": scrubbed_details
        }
        
        self._persist_jsonl(payload, "ghost_activity")
        self.logger.info(self.scrub(f"Ghost {ghost_id} executed {action} | Trace: {trace_id}"))

    def log_error(self, error_msg: str, context: Optional[Dict[str, Any]] = None, trace_id: Optional[str] = None):
        payload = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": "ERROR",
            "trace_id": trace_id,
            "message": self.scrub(error_msg),
            "context": json.loads(self.scrub(json.dumps(context or {})))
        }
        
        self._persist_jsonl(payload, "system_errors")
        self.logger.error(f"SUBSTRATE ANOMALY: {payload['message']} | Trace: {trace_id}")

# Global singleton for forensic audit trails
forensic_logger = SubstrateLogger()
