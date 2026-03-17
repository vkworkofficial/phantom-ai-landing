import json
import os
from typing import Dict, Optional
from app.models.simulation import SeanceReport
from pydantic import TypeAdapter

class JSONStorage:
    """
    Scrappy but effective persistence layer for SeanceReports.
    Ensures the substrate is immortal across restarts.
    """
    def __init__(self, file_path: str = "data/simulations.json"):
        self.file_path = file_path
        os.makedirs(os.path.dirname(self.file_path), exist_ok=True)
        if not os.path.exists(self.file_path):
            with open(self.file_path, "w") as f:
                json.dump({}, f)

    def _load_all(self) -> Dict[str, dict]:
        try:
            with open(self.file_path, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return {}

    def _save_all(self, data: Dict[str, dict]):
        with open(self.file_path, "w") as f:
            json.dump(data, f, indent=2, default=str)

    def save_report(self, report: SeanceReport):
        data = self._load_all()
        # Convert to dict, handling datetime objects
        report_dict = json.loads(report.model_dump_json())
        data[report.id] = report_dict
        self._save_all(data)

    def get_report(self, sim_id: str) -> Optional[SeanceReport]:
        data = self._load_all()
        report_data = data.get(sim_id)
        if not report_data:
            return None
        return TypeAdapter(SeanceReport).validate_python(report_data)

    def list_reports(self) -> Dict[str, SeanceReport]:
        data = self._load_all()
        return {k: TypeAdapter(SeanceReport).validate_python(v) for k, v in data.items()}

# Global singleton for the substrate
simulation_storage = JSONStorage()
