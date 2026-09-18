from fastapi import APIRouter

from app.database import (
    activities_collection,
    projects_collection,
    skills_collection,
)


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats():
    projects = list(
        projects_collection.find(
            {},
            {"_id": 0}
        )
    )

    activities = list(
        activities_collection.find(
            {},
            {"_id": 0}
        )
    )

    skills = list(
        skills_collection.find(
            {},
            {"_id": 0}
        )
    )

    total_projects = len(projects)

    active_projects = sum(
        1
        for project in projects
        if "progress" in project.get(
            "status",
            ""
        ).lower()
        or (
            project.get("progress", 0) > 0
            and project.get("progress", 0) < 100
        )
    )

    live_projects = sum(
        1
        for project in projects
        if project.get("liveUrl")
    )

    technologies = set()

    for project in projects:
        for technology in project.get(
            "technologies",
            []
        ):
            technologies.add(
                technology.strip()
            )

    return {
        "totalProjects": total_projects,
        "activeProjects": active_projects,
        "liveProjects": live_projects,
        "technologies": len(
            [item for item in technologies if item]
        ),
        "skills": len(skills),
        "recentProjects": sorted(
            projects,
            key=lambda item: (
                item.get("createdAt", ""),
                item.get("id", "")
            ),
            reverse=True,
        )[:5],
        "recentActivities": sorted(
            activities,
            key=lambda item: (
                item.get("createdAt", ""),
                item.get("id", "")
            ),
            reverse=True,
        )[:10],
    }