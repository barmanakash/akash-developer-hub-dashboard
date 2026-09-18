const API_BASE_URL = "http://127.0.0.1:8000/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

// -------------------------
// Projects
// -------------------------

export const getProjects = () => {
  return apiRequest("/projects/");
};

export const getProject = (projectId) => {
  return apiRequest(`/projects/${projectId}`);
};

export const createProject = (project) => {
  return apiRequest("/projects/", {
    method: "POST",
    body: JSON.stringify(project),
  });
};

export const updateProject = (projectId, project) => {
  return apiRequest(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
};

export const deleteProject = (projectId) => {
  return apiRequest(`/projects/${projectId}`, {
    method: "DELETE",
  });
};

// -------------------------
// Activities
// -------------------------

export const getActivities = () => {
  return apiRequest("/activities/");
};

export const createActivity = (activity) => {
  return apiRequest("/activities/", {
    method: "POST",
    body: JSON.stringify(activity),
  });
};

// -------------------------
// Skills
// -------------------------

export const getSkills = () => {
  return apiRequest("/skills/");
};

export const getSkill = (skillId) => {
  return apiRequest(`/skills/${skillId}`);
};

export const createSkill = (skill) => {
  return apiRequest("/skills/", {
    method: "POST",
    body: JSON.stringify(skill),
  });
};

export const updateSkill = (skillId, skill) => {
  return apiRequest(`/skills/${skillId}`, {
    method: "PUT",
    body: JSON.stringify(skill),
  });
};

export const deleteSkill = (skillId) => {
  return apiRequest(`/skills/${skillId}`, {
    method: "DELETE",
  });
};

// -------------------------
// Experience
// -------------------------

export const getExperience = () => {
  return apiRequest("/experience/");
};

export const getExperienceItem = (experienceId) => {
  return apiRequest(`/experience/${experienceId}`);
};

export const createExperience = (experience) => {
  return apiRequest("/experience/", {
    method: "POST",
    body: JSON.stringify(experience),
  });
};

export const updateExperience = (experienceId, experience) => {
  return apiRequest(`/experience/${experienceId}`, {
    method: "PUT",
    body: JSON.stringify(experience),
  });
};

export const deleteExperience = (experienceId) => {
  return apiRequest(`/experience/${experienceId}`, {
    method: "DELETE",
  });
};

// -------------------------
// Dashboard
// -------------------------

export const getDashboardStats = () => {
  return apiRequest("/dashboard/stats");
};

// -------------------------
// Health
// -------------------------

export const getHealth = () => {
  return apiRequest("/health");
};