const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:8000";

async function apiRequest(
  endpoint,
  options = {}
) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    }
  );

  if (!response.ok) {
    let errorMessage =
      "Something went wrong with the API request.";

    try {
      const errorData =
        await response.json();

      if (errorData?.detail) {
        errorMessage =
          errorData.detail;
      }
    } catch (error) {
      console.error(
        "Unable to read API error:",
        error
      );
    }

    throw new Error(errorMessage);
  }

  return response.json();
}


export async function getProjects() {
  return apiRequest(
    "/api/projects/"
  );
}


export async function getProject(
  projectId
) {
  return apiRequest(
    `/api/projects/${projectId}`
  );
}


export async function createProject(
  project
) {
  return apiRequest(
    "/api/projects/",
    {
      method: "POST",
      body: JSON.stringify(project),
    }
  );
}


export async function updateProject(
  projectId,
  project
) {
  return apiRequest(
    `/api/projects/${projectId}`,
    {
      method: "PUT",
      body: JSON.stringify(project),
    }
  );
}


export async function deleteProject(
  projectId
) {
  return apiRequest(
    `/api/projects/${projectId}`,
    {
      method: "DELETE",
    }
  );
}


export async function getActivities() {
  return apiRequest(
    "/api/activities/"
  );
}


export async function createActivity(
  activity
) {
  return apiRequest(
    "/api/activities/",
    {
      method: "POST",
      body: JSON.stringify(activity),
    }
  );
}


export async function getSkills() {
  return apiRequest(
    "/api/skills/"
  );
}


export async function getExperience() {
  return apiRequest(
    "/api/experience/"
  );
}


export async function getDashboardStats() {
  return apiRequest(
    "/api/dashboard/stats"
  );
}


export async function checkApiHealth() {
  return apiRequest(
    "/api/health"
  );
}