from datetime import datetime, timezone
from uuid import uuid4

from app.database import activities_collection


def create_activity(
    activity_type: str,
    title: str,
    description: str,
    project_id: str = "",
    project_name: str = "",
):
    activity = {
        "id": str(uuid4()),
        "type": activity_type,
        "title": title,
        "description": description,
        "projectId": project_id,
        "projectName": project_name,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }

    activities_collection.insert_one(activity)

    return activity