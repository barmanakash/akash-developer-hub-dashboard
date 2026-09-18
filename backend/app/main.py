from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import FRONTEND_URL
from app.database import check_database_connection

from app.routes.projects import router as projects_router
from app.routes.activities import router as activities_router
from app.routes.skills import router as skills_router
from app.routes.experience import router as experience_router
from app.routes.dashboard import router as dashboard_router


app = FastAPI(
    title="Akash Developer Hub API",
    description=(
        "Backend API for the Akash Developer Hub "
        "developer portfolio dashboard."
    ),
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(projects_router)
app.include_router(activities_router)
app.include_router(skills_router)
app.include_router(experience_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "Akash Developer Hub API is running",
        "version": "1.0.0",
    }


@app.get("/api/health")
def health_check():
    try:
        check_database_connection()

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception as error:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(error),
        }