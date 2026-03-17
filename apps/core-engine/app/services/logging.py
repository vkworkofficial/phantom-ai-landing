import logging
import json
import os
from datetime import datetime
from typing import Any, Dict

class SubstrateLogger:
    """
    Forensic logging service for AI Ghost interactions.
    Writes structured JSON logs for auditability and VIP review.
    """
    def __init__(self, log_dir: str = "data/logs/forensics"):
        self.log_dir = log_dir
        os.makedirs(self.log_dir, exist_ok=True)
        
        # Configure standard python logging to also go to file
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s [%(levelname)s] %(message)s',
            handlers=[
                logging.FileHandler(f"{log_dir}/system.log"),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger("phantom")

    def log_interaction(self, ghost_id: str, action: str, details: Dict[str, Any]):
        payload = {
            "timestamp": datetime.utcnow().isoformat(),
            "ghost_id": ghost_id,
            "action": action,
            "details": details
        }
        
        log_file = f"{self.log_dir}/ghost_activity_{datetime.now().strftime('%Y-%m-%d')}.jsonl"
        with open(log_file, "a") as f:
            f.write(json.dumps(payload) + "\n")
        
        self.logger.info(f"Ghost {ghost_id} executed {action}")

    def log_error(self, error_msg: str, context: Optional[Dict[str, Any]] = None):
        payload = {
            "timestamp": datetime.utcnow().isoformat(),
            "error": error_msg,
            "context": context
        }
        self.logger.error(f"SUBSTRATE ANOMALY: {error_msg}")
        
# Global singleton for forensic audit trails
forensic_logger = SubstrateLogger()
