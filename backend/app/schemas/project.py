from typing import List, Optional

from pydantic import BaseModel, Field


class ProjectBase(BaseModel):
    name: str = Field(..., min_length=1)
    category: str = "Full-Stack"
    status: str = "Completed"
    year: int
    description: str = Field(..., min_length=1)
    technologies: List[str] = []
    features: List[str] = []
    progress: int = Field(default=100, ge=0, le=100)
    liveUrl: Optional[str] = ""
    githubUrl: Optional[str] = ""
    screenshots: List[str] = []
    gradient: str = ""


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    year: Optional[int] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    features: Optional[List[str]] = None
    progress: Optional[int] = Field(default=None, ge=0, le=100)
    liveUrl: Optional[str] = None
    githubUrl: Optional[str] = None
    screenshots: Optional[List[str]] = None
    gradient: Optional[str] = None