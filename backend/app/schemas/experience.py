from typing import List, Optional

from pydantic import BaseModel


class ExperienceCreate(BaseModel):
    company: str
    role: str
    location: Optional[str] = ""
    startDate: str
    endDate: Optional[str] = ""
    description: Optional[str] = ""
    responsibilities: List[str] = []
    technologies: List[str] = []
    companyUrl: Optional[str] = ""


class ExperienceUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    location: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    description: Optional[str] = None
    responsibilities: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    companyUrl: Optional[str] = None