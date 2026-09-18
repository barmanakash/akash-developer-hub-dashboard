from typing import Optional

from pydantic import BaseModel, Field


class SkillCreate(BaseModel):
    name: str = Field(..., min_length=1)
    category: str = "Other"
    level: int = Field(default=0, ge=0, le=100)
    icon: Optional[str] = ""
    description: Optional[str] = ""


class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    level: Optional[int] = Field(default=None, ge=0, le=100)
    icon: Optional[str] = None
    description: Optional[str] = None