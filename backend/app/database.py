from pymongo import MongoClient

from app.config import MONGODB_URI, DATABASE_NAME


client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000
)

database = client[DATABASE_NAME]


projects_collection = database["projects"]
activities_collection = database["activities"]
skills_collection = database["skills"]
experience_collection = database["experience"]


def check_database_connection():
    client.admin.command("ping")
    return True