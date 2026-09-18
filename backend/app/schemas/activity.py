from typing import Optional

from pydantic import BaseModel


class ActivityCreate(BaseModel):
    type: str
    title: str
    description: str
    projectId: Optional[str] = ""
    projectName: Optional[str] = ""


class ActivityResponse(ActivityCreate):
    id: str
    createdAt: str