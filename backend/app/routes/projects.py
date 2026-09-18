from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException

from app.database import projects_collection
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.services.activity_service import create_activity


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)


def clean_project(project):
    project.pop("_id", None)
    return project


@router.get("/")
def get_projects():
    projects = list(
        projects_collection.find(
            {},
            {"_id": 0}
        ).sort("createdAt", -1)
    )

    return projects


@router.get("/{project_id}")
def get_project(project_id: str):
    project = projects_collection.find_one(
        {"id": project_id},
        {"_id": 0}
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project


@router.post("/", status_code=201)
def create_project(project: ProjectCreate):
    project_data = project.model_dump()

    project_data["id"] = str(uuid4())
    project_data["createdAt"] = datetime.now(
        timezone.utc
    ).isoformat()

    projects_collection.insert_one(project_data)

    create_activity(
        activity_type="added",
        title="Project added",
        description=(
            f"{project_data['name']} was added "
            "to your project collection."
        ),
        project_id=project_data["id"],
        project_name=project_data["name"],
    )

    return clean_project(project_data)


@router.put("/{project_id}")
def update_project(
    project_id: str,
    project: ProjectUpdate
):
    existing_project = projects_collection.find_one(
        {"id": project_id}
    )

    if not existing_project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    update_data = project.model_dump(
        exclude_unset=True
    )

    update_data["updatedAt"] = datetime.now(
        timezone.utc
    ).isoformat()

    projects_collection.update_one(
        {"id": project_id},
        {"$set": update_data}
    )

    updated_project = projects_collection.find_one(
        {"id": project_id},
        {"_id": 0}
    )

    create_activity(
        activity_type="updated",
        title="Project updated",
        description=(
            f"{updated_project['name']} "
            "was updated."
        ),
        project_id=project_id,
        project_name=updated_project["name"],
    )

    return updated_project


@router.delete("/{project_id}")
def delete_project(project_id: str):
    project = projects_collection.find_one(
        {"id": project_id},
        {"_id": 0}
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    projects_collection.delete_one(
        {"id": project_id}
    )

    create_activity(
        activity_type="deleted",
        title="Project deleted",
        description=(
            f"{project['name']} was removed "
            "from your project collection."
        ),
        project_id=project_id,
        project_name=project["name"],
    )

    return {
        "message": "Project deleted successfully",
        "id": project_id
    }