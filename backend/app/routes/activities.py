from fastapi import APIRouter

from app.database import activities_collection
from app.schemas.activity import ActivityCreate
from app.services.activity_service import create_activity


router = APIRouter(
    prefix="/api/activities",
    tags=["Activities"]
)


@router.get("/")
def get_activities():
    activities = list(
        activities_collection.find(
            {},
            {"_id": 0}
        ).sort("createdAt", -1)
    )

    return activities


@router.post("/", status_code=201)
def add_activity(activity: ActivityCreate):
    return create_activity(
        activity_type=activity.type,
        title=activity.title,
        description=activity.description,
        project_id=activity.projectId or "",
        project_name=activity.projectName or "",
    )