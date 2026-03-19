from celery import Celery
import os

# Phantom Celery Substrate v5.0
# Requires REDIS_URL to be set in environment

redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "phantom_substrate",
    broker=redis_url,
    backend=redis_url,
    include=["app.tasks.simulations"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=3600, # 1 hour max for deep seance
)

if __name__ == "__main__":
    celery_app.start()
