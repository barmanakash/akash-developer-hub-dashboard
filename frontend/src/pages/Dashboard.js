import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";

import { drawerWidth } from "../components/Sidebar";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import projects from "../data/projects";
import { getProjects } from "../services/api";

const PROJECTS_KEY = "akash_developer_projects";
const DELETED_KEY = "akash_deleted_projects";
const ACTIVITY_KEY = "akash_developer_activity";

function getStoredProjects() {
  try {
    const storedProjects =
      localStorage.getItem(PROJECTS_KEY);

    if (!storedProjects) {
      return [];
    }

    const parsedProjects = JSON.parse(
      storedProjects
    );

    return Array.isArray(parsedProjects)
      ? parsedProjects
      : [];
  } catch (error) {
    console.error(
      "Unable to read dashboard projects:",
      error
    );

    return [];
  }
}

function getDeletedProjectIds() {
  try {
    const deletedProjects =
      localStorage.getItem(DELETED_KEY);

    if (!deletedProjects) {
      return [];
    }

    const parsedProjects = JSON.parse(
      deletedProjects
    );

    return Array.isArray(parsedProjects)
      ? parsedProjects.map((id) => String(id))
      : [];
  } catch (error) {
    console.error(
      "Unable to read deleted projects:",
      error
    );

    return [];
  }
}

// Same rules as the Projects page:
// saved projects + built-in projects, minus deleted ones.
function getAllProjects() {
  const storedProjects = getStoredProjects();

  const deletedIds = new Set(
    getDeletedProjectIds()
  );

  const storedIds = new Set(
    storedProjects.map((project) =>
      String(project.id)
    )
  );

  return [
    ...storedProjects.filter(
      (project) =>
        !deletedIds.has(String(project.id))
    ),
    ...projects.filter(
      (project) =>
        !storedIds.has(String(project.id)) &&
        !deletedIds.has(String(project.id))
    ),
  ];
}

// Adds backend projects on top, exactly like the Projects page does.
async function loadAllProjects() {
  const localProjects = getAllProjects();

  try {
    const backendProjects =
      await getProjects();

    if (!Array.isArray(backendProjects)) {
      return localProjects;
    }

    const backendIds = new Set(
      backendProjects.map((project) =>
        String(project.id)
      )
    );

    return [
      ...backendProjects,
      ...localProjects.filter(
        (project) =>
          !backendIds.has(String(project.id))
      ),
    ];
  } catch (error) {
    console.error(
      "Unable to load projects from backend:",
      error
    );

    return localProjects;
  }
}

// Statuses used in the app: "In Progress" and "In Development".
function isActiveProject(project) {
  const status = String(
    project.status || ""
  ).toLowerCase();

  return (
    status.includes("progress") ||
    status.includes("development")
  );
}

// "Reactjs", "React.js" and "React" are one technology,
// and so are "Fast API" / "FastAPI" and "mui" / "MUI".
function normalizeTechnology(technology) {
  const key = String(technology)
    .toLowerCase()
    .replace(/[\s._-]+/g, "");

  return key.length > 4 && key.endsWith("js")
    ? key.slice(0, -2)
    : key;
}

function getStoredActivities() {
  try {
    const storedActivities =
      localStorage.getItem(ACTIVITY_KEY);

    if (!storedActivities) {
      return [];
    }

    const parsedActivities = JSON.parse(
      storedActivities
    );

    return Array.isArray(parsedActivities)
      ? parsedActivities
      : [];
  } catch (error) {
    console.error(
      "Unable to read dashboard activities:",
      error
    );

    return [];
  }
}

function formatActivityTime(dateValue) {
  if (!dateValue) {
    return "Recently";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diff =
    Date.now() - date.getTime();

  const minutes = Math.floor(
    diff / (1000 * 60)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function getActivityIcon(type) {
  if (type === "added") {
    return (
      <FiberNewRoundedIcon
        sx={{ fontSize: 18 }}
      />
    );
  }

  if (type === "updated") {
    return (
      <UpdateRoundedIcon
        sx={{ fontSize: 18 }}
      />
    );
  }

  if (type === "deleted") {
    return (
      <DeleteOutlineRoundedIcon
        sx={{ fontSize: 18 }}
      />
    );
  }

  return (
    <UpdateRoundedIcon
      sx={{ fontSize: 18 }}
    />
  );
}

function getActivityColor(type) {
  if (type === "added") {
    return "#5eead4";
  }

  if (type === "updated") {
    return "#60a5fa";
  }

  if (type === "deleted") {
    return "#fb7185";
  }

  return "#9b7cff";
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [dashboardProjects, setDashboardProjects] =
    useState(() => getAllProjects());

  const [activities, setActivities] =
    useState(() =>
      getStoredActivities()
    );

  const handleMenuClick = () => {
    setMobileOpen(true);
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

  const refreshDashboard = async () => {
    setActivities(
      getStoredActivities()
    );

    setDashboardProjects(
      await loadAllProjects()
    );
  };

  useEffect(() => {
    refreshDashboard();

    window.addEventListener(
      "storage",
      refreshDashboard
    );

    window.addEventListener(
      "activityUpdated",
      refreshDashboard
    );

    document.addEventListener(
      "visibilitychange",
      refreshDashboard
    );

    return () => {
      window.removeEventListener(
        "storage",
        refreshDashboard
      );

      window.removeEventListener(
        "activityUpdated",
        refreshDashboard
      );

      document.removeEventListener(
        "visibilitychange",
        refreshDashboard
      );
    };
  }, []);

  const statistics = useMemo(() => {
    const totalProjects =
      dashboardProjects.length;

    const activeProjects =
      dashboardProjects.filter(
        isActiveProject
      ).length;

    const liveProjects =
      dashboardProjects.filter(
        (project) =>
          String(project.liveUrl || "")
            .trim() !== ""
      ).length;

    const technologySet = new Set();

    dashboardProjects.forEach(
      (project) => {
        if (
          Array.isArray(
            project.technologies
          )
        ) {
          project.technologies.forEach(
            (technology) => {
              const key =
                normalizeTechnology(
                  technology || ""
                );

              if (key) {
                technologySet.add(key);
              }
            }
          );
        }
      }
    );

    return {
      totalProjects,
      activeProjects,
      liveProjects,
      technologies:
        technologySet.size,
    };
  }, [dashboardProjects]);

  const recentProjects = useMemo(() => {
    return [...dashboardProjects]
      .sort((a, b) => {
        const dateA =
          new Date(
            a.createdAt || 0
          ).getTime();

        const dateB =
          new Date(
            b.createdAt || 0
          ).getTime();

        if (
          dateA &&
          dateB &&
          dateA !== dateB
        ) {
          return dateB - dateA;
        }

        return (
          Number(b.id) -
          Number(a.id)
        );
      })
      .slice(0, 3);
  }, [dashboardProjects]);

  const recentActivities = useMemo(() => {
    return activities
      .slice()
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      )
      .slice(0, 5);
  }, [activities]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#07090d",
        color: "#ffffff",
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleClose}
      />

      <Box
        sx={{
          ml: {
            xs: 0,
            md: `${drawerWidth}px`,
          },
          minHeight: "100vh",
        }}
      >
        <Topbar
          onMenuClick={handleMenuClick}
        />

        <Container
          maxWidth={false}
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 4,
              lg: 5,
            },
            py: {
              xs: 3,
              md: 4,
            },
            maxWidth: 1600,
            mx: "auto",
          }}
        >
          {/* Welcome Section */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            <Box
              sx={{
                mb: 4,
                p: {
                  xs: 2.5,
                  md: 3.5,
                },
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                background:
                  "linear-gradient(120deg, rgba(124,92,255,0.13), rgba(255,255,255,0.025))",
                border:
                  "1px solid rgba(124,92,255,0.15)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  right: -80,
                  top: -100,
                  backgroundColor:
                    "rgba(124,92,255,0.09)",
                  filter: "blur(10px)",
                }}
              />

              <Typography
                sx={{
                  position: "relative",
                  fontSize: {
                    xs: 23,
                    md: 29,
                  },
                  fontWeight: 800,
                  letterSpacing: "-0.8px",
                }}
              >
                Welcome back, Akash.
              </Typography>

              <Typography
                sx={{
                  position: "relative",
                  mt: 1,
                  maxWidth: 650,
                  fontSize: {
                    xs: 12.5,
                    md: 14,
                  },
                  lineHeight: 1.7,
                  color: "#858c9a",
                }}
              >
                Keep track of everything
                you've built, the technologies
                you've used, and the projects
                you're currently working on.
              </Typography>
            </Box>
          </motion.div>

          {/* Statistics */}

          <Grid
            container
            spacing={2}
            sx={{
              mb: 4,
            }}
          >
            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <StatCard
                title="Total Projects"
                value={String(
                  statistics.totalProjects
                ).padStart(2, "0")}
                subtitle="Projects in your collection"
                icon={
                  <FolderRoundedIcon />
                }
                iconColor="#9b7cff"
                delay={0.1}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <StatCard
                title="Active Projects"
                value={String(
                  statistics.activeProjects
                ).padStart(2, "0")}
                subtitle="Currently in development"
                icon={
                  <PlayCircleOutlineRoundedIcon />
                }
                iconColor="#5eead4"
                delay={0.15}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <StatCard
                title="Live Projects"
                value={String(
                  statistics.liveProjects
                ).padStart(2, "0")}
                subtitle="Projects available online"
                icon={
                  <LanguageRoundedIcon />
                }
                iconColor="#60a5fa"
                delay={0.2}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <StatCard
                title="Technologies"
                value={String(
                  statistics.technologies
                ).padStart(2, "0")}
                subtitle="Technologies used across projects"
                icon={
                  <CodeRoundedIcon />
                }
                iconColor="#fbbf24"
                delay={0.25}
              />
            </Grid>
          </Grid>

          {/* Recent Projects Heading */}

          <Box
            sx={{
              mb: 2.5,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 750,
                  color: "#ffffff",
                  letterSpacing: "-0.4px",
                }}
              >
                Recent Projects
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color: "#6f7684",
                }}
              >
                A quick look at your latest
                work.
              </Typography>
            </Box>

            <Typography
              onClick={() =>
                navigate("/projects")
              }
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                fontSize: 12,
                color: "#9b7cff",
                fontWeight: 600,
                cursor: "pointer",
                transition:
                  "all 0.2s ease",
                "&:hover": {
                  color: "#c1b4ff",
                  transform:
                    "translateX(2px)",
                },
              }}
            >
              View all projects →
            </Typography>
          </Box>

          {/* Projects */}

          {recentProjects.length > 0 ? (
            <Grid
              container
              spacing={2.5}
              sx={{
                mb: 4,
              }}
            >
              {recentProjects.map(
                (project, index) => (
                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                      xl: 4,
                    }}
                    key={project.id}
                  >
                    <ProjectCard
                      project={project}
                      delay={
                        0.15 +
                        index * 0.1
                      }
                    />
                  </Grid>
                )
              )}
            </Grid>
          ) : (
            <Box
              sx={{
                mb: 4,
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                border:
                  "1px solid rgba(255,255,255,0.07)",
                backgroundColor:
                  "rgba(255,255,255,0.02)",
              }}
            >
              <Typography
                sx={{
                  color: "#858c9a",
                  fontSize: 14,
                  mb: 2,
                }}
              >
                No projects available yet.
              </Typography>

              <Button
                variant="contained"
                startIcon={
                  <AddRoundedIcon />
                }
                onClick={() =>
                  navigate(
                    "/projects/add"
                  )
                }
                sx={{
                  borderRadius: 2,
                  textTransform:
                    "none",
                  fontWeight: 700,
                  backgroundColor:
                    "#7c5cff",
                  "&:hover": {
                    backgroundColor:
                      "#6d4df5",
                  },
                }}
              >
                Add Project
              </Button>
            </Box>
          )}

          {/* Dashboard Lower Section */}

          <Grid
            container
            spacing={2.5}
            sx={{
              mb: 4,
            }}
          >
            {/* Recent Activity */}

            <Grid
              size={{
                xs: 12,
                lg: 8,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: {
                    xs: 2.5,
                    md: 3,
                  },
                  borderRadius: 3,
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                  backgroundColor:
                    "rgba(255,255,255,0.02)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    gap: 2,
                    mb: 2.5,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 750,
                        color:
                          "#ffffff",
                        letterSpacing:
                          "-0.3px",
                      }}
                    >
                      Recent Activity
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 12,
                        color:
                          "#6f7684",
                      }}
                    >
                      Latest changes in your
                      developer hub.
                    </Typography>
                  </Box>

                  <Typography
                    onClick={() =>
                      navigate(
                        "/activity"
                      )
                    }
                    sx={{
                      fontSize: 12,
                      color:
                        "#9b7cff",
                      fontWeight: 600,
                      cursor:
                        "pointer",
                      whiteSpace:
                        "nowrap",
                      transition:
                        "all 0.2s ease",
                      "&:hover": {
                        color:
                          "#c1b4ff",
                        transform:
                          "translateX(2px)",
                      },
                    }}
                  >
                    View activity →
                  </Typography>
                </Box>

                {recentActivities.length >
                0 ? (
                  <Box
                    sx={{
                      display:
                        "flex",
                      flexDirection:
                        "column",
                    }}
                  >
                    {recentActivities.map(
                      (
                        activity,
                        index
                      ) => {
                        const activityColor =
                          getActivityColor(
                            activity.type
                          );

                        return (
                          <Box
                            key={
                              activity.id ||
                              index
                            }
                            sx={{
                              display:
                                "flex",
                              alignItems:
                                "flex-start",
                              gap: 1.5,
                              py: 1.5,
                              borderBottom:
                                index ===
                                recentActivities.length -
                                  1
                                  ? "none"
                                  : "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <Box
                              sx={{
                                width: 34,
                                height: 34,
                                flexShrink: 0,
                                borderRadius:
                                  2,
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                color:
                                  activityColor,
                                backgroundColor:
                                  `${activityColor}14`,
                                border:
                                  `1px solid ${activityColor}22`,
                              }}
                            >
                              {getActivityIcon(
                                activity.type
                              )}
                            </Box>

                            <Box
                              sx={{
                                minWidth:
                                  0,
                                flex: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize:
                                    13,
                                  fontWeight:
                                    700,
                                  color:
                                    "#ffffff",
                                }}
                              >
                                {
                                  activity.title
                                }
                              </Typography>

                              <Typography
                                sx={{
                                  mt: 0.35,
                                  fontSize:
                                    11.5,
                                  lineHeight:
                                    1.5,
                                  color:
                                    "#737b89",
                                }}
                              >
                                {
                                  activity.description
                                }
                              </Typography>
                            </Box>

                            <Typography
                              sx={{
                                flexShrink:
                                  0,
                                fontSize:
                                  10.5,
                                color:
                                  "#555c69",
                                pt: 0.3,
                              }}
                            >
                              {formatActivityTime(
                                activity.createdAt
                              )}
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      py: 4,
                      textAlign:
                        "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        color:
                          "#6f7684",
                      }}
                    >
                      No recent activity yet.
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 11,
                        color:
                          "#4f5662",
                      }}
                    >
                      Add or update a project
                      to see activity here.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Quick Actions */}

            <Grid
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: {
                    xs: 2.5,
                    md: 3,
                  },
                  borderRadius: 3,
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                  background:
                    "linear-gradient(145deg, rgba(124,92,255,0.09), rgba(255,255,255,0.02))",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 750,
                    color: "#ffffff",
                    letterSpacing:
                      "-0.3px",
                  }}
                >
                  Quick Actions
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    mb: 2.5,
                    fontSize: 12,
                    color: "#6f7684",
                  }}
                >
                  Manage your developer hub.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    <AddRoundedIcon />
                  }
                  onClick={() =>
                    navigate(
                      "/projects/add"
                    )
                  }
                  sx={{
                    mb: 1.2,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform:
                      "none",
                    justifyContent:
                      "flex-start",
                    px: 2,
                    fontWeight: 700,
                    backgroundColor:
                      "#7c5cff",
                    boxShadow:
                      "none",
                    transition:
                      "all 0.2s ease",
                    "&:hover": {
                      backgroundColor:
                        "#6d4df5",
                      transform:
                        "translateY(-1px)",
                      boxShadow:
                        "0 8px 24px rgba(124,92,255,0.22)",
                    },
                  }}
                >
                  Add New Project
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={
                    <ArrowForwardRoundedIcon />
                  }
                  onClick={() =>
                    navigate(
                      "/projects"
                    )
                  }
                  sx={{
                    mb: 1.2,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform:
                      "none",
                    justifyContent:
                      "space-between",
                    px: 2,
                    fontWeight: 650,
                    color: "#c7ccd6",
                    borderColor:
                      "rgba(255,255,255,0.09)",
                    transition:
                      "all 0.2s ease",
                    "&:hover": {
                      borderColor:
                        "rgba(124,92,255,0.4)",
                      backgroundColor:
                        "rgba(124,92,255,0.06)",
                      transform:
                        "translateY(-1px)",
                    },
                  }}
                >
                  View All Projects
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={
                    <ArrowForwardRoundedIcon />
                  }
                  onClick={() =>
                    navigate(
                      "/activity"
                    )
                  }
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    textTransform:
                      "none",
                    justifyContent:
                      "space-between",
                    px: 2,
                    fontWeight: 650,
                    color: "#c7ccd6",
                    borderColor:
                      "rgba(255,255,255,0.09)",
                    transition:
                      "all 0.2s ease",
                    "&:hover": {
                      borderColor:
                        "rgba(124,92,255,0.4)",
                      backgroundColor:
                        "rgba(124,92,255,0.06)",
                      transform:
                        "translateY(-1px)",
                    },
                  }}
                >
                  View Activity
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Footer */}

          <Box
            sx={{
              mt: 4,
              py: 2,
              borderTop:
                "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                color: "#555c69",
              }}
            >
              Akash Developer Hub
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: "#555c69",
              }}
            >
              Building • Learning • Creating
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}