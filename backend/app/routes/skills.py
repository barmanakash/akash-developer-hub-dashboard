from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException

from app.database import skills_collection
from app.schemas.skill import SkillCreate, SkillUpdate


router = APIRouter(
    prefix="/api/skills",
    tags=["Skills"]
)


@router.get("/")
def get_skills():
    return list(
        skills_collection.find(
            {},
            {"_id": 0}
        ).sort("name", 1)
    )


@router.get("/{skill_id}")
def get_skill(skill_id: str):
    skill = skills_collection.find_one(
        {"id": skill_id},
        {"_id": 0}
    )

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    return skill


@router.post("/", status_code=201)
def create_skill(skill: SkillCreate):
    skill_data = skill.model_dump()

    skill_data["id"] = str(uuid4())
    skill_data["createdAt"] = datetime.now(
        timezone.utc
    ).isoformat()

    skills_collection.insert_one(skill_data)

    skill_data.pop("_id", None)

    return skill_data


@router.put("/{skill_id}")
def update_skill(
    skill_id: str,
    skill: SkillUpdate
):
    existing_skill = skills_collection.find_one(
        {"id": skill_id}
    )

    if not existing_skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    update_data = skill.model_dump(
        exclude_unset=True
    )

    update_data["updatedAt"] = datetime.now(
        timezone.utc
    ).isoformat()

    skills_collection.update_one(
        {"id": skill_id},
        {"$set": update_data}
    )

    updated_skill = skills_collection.find_one(
        {"id": skill_id},
        {"_id": 0}
    )

    return updated_skill


@router.delete("/{skill_id}")
def delete_skill(skill_id: str):
    result = skills_collection.delete_one(
        {"id": skill_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    return {
        "message": "Skill deleted successfully",
        "id": skill_id
    }