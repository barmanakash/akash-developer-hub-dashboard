from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException

from app.database import experience_collection
from app.schemas.experience import (
    ExperienceCreate,
    ExperienceUpdate,
)


router = APIRouter(
    prefix="/api/experience",
    tags=["Experience"]
)


@router.get("/")
def get_experience():
    return list(
        experience_collection.find(
            {},
            {"_id": 0}
        ).sort("startDate", -1)
    )


@router.get("/{experience_id}")
def get_experience_item(
    experience_id: str
):
    experience = experience_collection.find_one(
        {"id": experience_id},
        {"_id": 0}
    )

    if not experience:
        raise HTTPException(
            status_code=404,
            detail="Experience not found"
        )

    return experience


@router.post("/", status_code=201)
def create_experience(
    experience: ExperienceCreate
):
    experience_data = experience.model_dump()

    experience_data["id"] = str(uuid4())
    experience_data["createdAt"] = datetime.now(
        timezone.utc
    ).isoformat()

    experience_collection.insert_one(
        experience_data
    )

    experience_data.pop("_id", None)

    return experience_data


@router.put("/{experience_id}")
def update_experience(
    experience_id: str,
    experience: ExperienceUpdate
):
    existing = experience_collection.find_one(
        {"id": experience_id}
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Experience not found"
        )

    update_data = experience.model_dump(
        exclude_unset=True
    )

    update_data["updatedAt"] = datetime.now(
        timezone.utc
    ).isoformat()

    experience_collection.update_one(
        {"id": experience_id},
        {"$set": update_data}
    )

    updated = experience_collection.find_one(
        {"id": experience_id},
        {"_id": 0}
    )

    return updated


@router.delete("/{experience_id}")
def delete_experience(
    experience_id: str
):
    result = experience_collection.delete_one(
        {"id": experience_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Experience not found"
        )

    return {
        "message": "Experience deleted successfully",
        "id": experience_id
    }