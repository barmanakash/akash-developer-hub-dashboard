const ACTIVITY_KEY = "akash_developer_activity";

function getActivities() {
  try {
    const stored = localStorage.getItem(ACTIVITY_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to read activity:", error);

    return [];
  }
}

export function logActivity({
  type,
  title,
  description,
  projectId = "",
  projectName = "",
}) {
  try {
    const activities = getActivities();

    const activity = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

      type,

      title,

      description,

      projectId,

      projectName,

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      ACTIVITY_KEY,
      JSON.stringify([
        activity,
        ...activities,
      ])
    );

    window.dispatchEvent(
      new Event("activityUpdated")
    );

    return activity;
  } catch (error) {
    console.error("Unable to save activity:", error);

    return null;
  }
}

export function clearActivities() {
  try {
    localStorage.removeItem(ACTIVITY_KEY);

    window.dispatchEvent(
      new Event("activityUpdated")
    );
  } catch (error) {
    console.error("Unable to clear activities:", error);
  }
}