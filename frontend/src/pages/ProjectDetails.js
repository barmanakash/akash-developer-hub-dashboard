import React, { useState } from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { motion } from "motion/react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import projects from "../data/projects";

const STORAGE_KEY =
  "akash_developer_projects";

const DELETED_KEY =
  "akash_deleted_projects";

function getStoredProjects() {
  try {
    const storedProjects =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!storedProjects) {
      return [];
    }

    const parsedProjects =
      JSON.parse(storedProjects);

    return Array.isArray(
      parsedProjects
    )
      ? parsedProjects
      : [];
  } catch (error) {
    console.error(
      "Unable to read saved projects:",
      error
    );

    return [];
  }
}

function getDeletedProjectIds() {
  try {
    const deletedProjects =
      localStorage.getItem(
        DELETED_KEY
      );

    if (!deletedProjects) {
      return [];
    }

    const parsedProjects =
      JSON.parse(
        deletedProjects
      );

    return Array.isArray(
      parsedProjects
    )
      ? parsedProjects.map(
          (id) => String(id)
        )
      : [];
  } catch (error) {
    console.error(
      "Unable to read deleted projects:",
      error
    );

    return [];
  }
}

function getAllProjects() {
  const storedProjects =
    getStoredProjects();

  const deletedIds =
    new Set(
      getDeletedProjectIds()
    );

  const storedIds =
    new Set(
      storedProjects.map(
        (project) =>
          String(project.id)
      )
    );

  return [
    ...storedProjects.filter(
      (project) =>
        !deletedIds.has(
          String(project.id)
        )
    ),

    ...projects.filter(
      (project) =>
        !storedIds.has(
          String(project.id)
        ) &&
        !deletedIds.has(
          String(project.id)
        )
    ),
  ];
}

export default function ProjectDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [
    deleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

  const project =
    getAllProjects().find(
      (item) =>
        String(item.id) ===
        String(id)
    );

  const handleDeleteProject = () => {
    try {
      const storedProjects =
        getStoredProjects();

      const updatedProjects =
        storedProjects.filter(
          (item) =>
            String(item.id) !==
            String(project.id)
        );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          updatedProjects
        )
      );

      const deletedIds =
        getDeletedProjectIds();

      const alreadyDeleted =
        deletedIds.some(
          (deletedId) =>
            String(deletedId) ===
            String(project.id)
        );

      if (!alreadyDeleted) {
        deletedIds.push(
          String(project.id)
        );
      }

      localStorage.setItem(
        DELETED_KEY,
        JSON.stringify(
          deletedIds
        )
      );

      setDeleteDialogOpen(false);

      navigate("/projects");
    } catch (error) {
      console.error(
        "Unable to delete project:",
        error
      );

      setDeleteDialogOpen(false);
    }
  };

  if (!project) {
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
          onClose={() =>
            setMobileOpen(false)
          }
        />

        <Box
          sx={{
            ml: {
              xs: 0,
              md: "260px",
            },
          }}
        >
          <Topbar
            title="Project Not Found"
            subtitle="The requested project could not be found"
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <Container
            maxWidth={false}
            sx={{
              maxWidth: 1200,
              mx: "auto",
              px: 3,
              py: 10,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              Project Not Found
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#747b89",
                fontSize: 13,
              }}
            >
              This project doesn't
              exist in your collection.
            </Typography>

            <Button
              startIcon={
                <ArrowBackRoundedIcon />
              }
              onClick={() =>
                navigate("/projects")
              }
              sx={{
                mt: 3,
                textTransform: "none",
                color: "#ffffff",
                backgroundColor:
                  "rgba(124,92,255,0.15)",
                border:
                  "1px solid rgba(124,92,255,0.25)",
                px: 2.5,
                py: 1,
                borderRadius: 2.5,
                "&:hover": {
                  backgroundColor:
                    "rgba(124,92,255,0.25)",
                },
              }}
            >
              Back to Projects
            </Button>
          </Container>
        </Box>
      </Box>
    );
  }

  const screenshots =
    Array.isArray(
      project.screenshots
    )
      ? project.screenshots
      : [];

  const technologies =
    Array.isArray(
      project.technologies
    )
      ? project.technologies
      : [];

  const features =
    Array.isArray(project.features)
      ? project.features
      : [];

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
        onClose={() =>
          setMobileOpen(false)
        }
      />

      <Box
        sx={{
          ml: {
            xs: 0,
            md: "260px",
          },
          minHeight: "100vh",
        }}
      >
        <Topbar
          title="Project Details"
          subtitle="Project information and development details"
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1500,
            mx: "auto",
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
          }}
        >
          {/* Back Button */}

          <motion.div
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <Button
              startIcon={
                <ArrowBackRoundedIcon
                  sx={{ fontSize: 18 }}
                />
              }
              onClick={() =>
                navigate("/projects")
              }
              sx={{
                mb: 3,
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                textTransform: "none",
                color: "#858c99",
                fontSize: 12,
                fontWeight: 600,
                transition:
                  "all 0.2s ease",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor:
                    "rgba(255,255,255,0.05)",
                },
              }}
            >
              Back to Projects
            </Button>
          </motion.div>

          {/* Hero */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Box
              sx={{
                position: "relative",
                minHeight: {
                  xs: 330,
                  md: 390,
                },
                borderRadius: 5,
                overflow: "hidden",
                background:
                  project.gradient,
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Grid Background */}

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.13,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                  backgroundSize:
                    "45px 45px",
                }}
              />

              {/* Glow */}

              <Box
                sx={{
                  position: "absolute",
                  width: 400,
                  height: 400,
                  right: -120,
                  top: -150,
                  borderRadius: "50%",
                  background:
                    "rgba(255,255,255,0.08)",
                  filter: "blur(70px)",
                }}
              />

              {/* Overlay */}

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(7,9,13,0.82) 0%, rgba(7,9,13,0.3) 100%)",
                }}
              />

              {/* Top Right Actions */}

              <Box
                sx={{
                  position: "absolute",
                  top: {
                    xs: 16,
                    md: 22,
                  },
                  right: {
                    xs: 16,
                    md: 22,
                  },
                  zIndex: 5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {/* Edit */}

                <Button
                  startIcon={
                    <EditRoundedIcon
                      sx={{
                        fontSize: 17,
                      }}
                    />
                  }
                  onClick={() =>
                    navigate(
                      `/projects/add?edit=${encodeURIComponent(
                        project.id
                      )}`
                    )
                  }
                  sx={{
                    px: 1.8,
                    py: 0.9,
                    minHeight: 38,
                    borderRadius: 2.2,
                    textTransform:
                      "none",
                    color: "#ffffff",
                    backgroundColor:
                      "rgba(7,9,13,0.65)",
                    border:
                      "1px solid rgba(255,255,255,0.14)",
                    backdropFilter:
                      "blur(12px)",
                    fontSize: 11.5,
                    fontWeight: 700,
                    transition:
                      "all 0.25s ease",
                    "&:hover": {
                      backgroundColor:
                        "rgba(124,92,255,0.28)",
                      borderColor:
                        "rgba(155,124,255,0.5)",
                      transform:
                        "translateY(-2px)",
                    },
                  }}
                >
                  Edit Project
                </Button>

                {/* Delete */}

                <Button
                  startIcon={
                    <DeleteOutlineRoundedIcon
                      sx={{
                        fontSize: 18,
                      }}
                    />
                  }
                  onClick={() =>
                    setDeleteDialogOpen(
                      true
                    )
                  }
                  sx={{
                    px: 1.7,
                    py: 0.9,
                    minHeight: 38,
                    borderRadius: 2.2,
                    textTransform:
                      "none",
                    color: "#ffb4b4",
                    backgroundColor:
                      "rgba(7,9,13,0.65)",
                    border:
                      "1px solid rgba(255,255,255,0.14)",
                    backdropFilter:
                      "blur(12px)",
                    fontSize: 11.5,
                    fontWeight: 700,
                    transition:
                      "all 0.25s ease",
                    "&:hover": {
                      color: "#ffffff",
                      backgroundColor:
                        "rgba(220,60,60,0.2)",
                      borderColor:
                        "rgba(255,100,100,0.4)",
                      transform:
                        "translateY(-2px)",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>

              {/* Hero Content */}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  minHeight: "100%",
                  p: {
                    xs: 3,
                    md: 5,
                  },
                  pt: {
                    xs: 8,
                    md: 8,
                  },
                  display: "flex",
                  flexDirection:
                    "column",
                  justifyContent:
                    "flex-end",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={
                      project.category
                    }
                    size="small"
                    sx={{
                      height: 30,
                      color: "#ffffff",
                      backgroundColor:
                        "rgba(0,0,0,0.35)",
                      backdropFilter:
                        "blur(10px)",
                      border:
                        "1px solid rgba(255,255,255,0.12)",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 32,
                      sm: 40,
                      md: 52,
                    },
                    lineHeight: 1.05,
                    fontWeight: 850,
                    letterSpacing:
                      "-1.5px",
                    maxWidth: 850,
                  }}
                >
                  {project.name}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    maxWidth: 800,
                    fontSize: {
                      xs: 13,
                      md: 15,
                    },
                    lineHeight: 1.7,
                    color:
                      "rgba(255,255,255,0.72)",
                  }}
                >
                  {project.description}
                </Typography>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 0.7,
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        fontSize: 17,
                        color: "#8ee6bd",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 11,
                        color:
                          "rgba(255,255,255,0.75)",
                      }}
                    >
                      {project.status}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 0.7,
                    }}
                  >
                    <CalendarMonthRoundedIcon
                      sx={{
                        fontSize: 17,
                        color: "#b4a2ff",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 11,
                        color:
                          "rgba(255,255,255,0.75)",
                      }}
                    >
                      {project.year}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Content */}

          <Grid
            container
            spacing={3}
          >
            {/* Left */}

            <Grid
              size={{
                xs: 12,
                lg: 8,
              }}
            >
              {/* About */}

              <Box
                sx={{
                  mt: 3,
                  p: {
                    xs: 2.5,
                    md: 3,
                  },
                  borderRadius: 4,
                  backgroundColor:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 750,
                  }}
                >
                  About this project
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: 13,
                    lineHeight: 1.9,
                    color: "#858c99",
                  }}
                >
                  {project.description}
                </Typography>
              </Box>

              {/* Features */}

              <Box
                sx={{
                  mt: 3,
                  p: {
                    xs: 2.5,
                    md: 3,
                  },
                  borderRadius: 4,
                  backgroundColor:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      color: "#9b7cff",
                      fontSize: 20,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 750,
                    }}
                  >
                    Key Features
                  </Typography>
                </Box>

                <Grid
                  container
                  spacing={1.5}
                  sx={{ mt: 1 }}
                >
                  {features.map(
                    (
                      feature,
                      index
                    ) => (
                      <Grid
                        key={`${feature}-${index}`}
                        size={{
                          xs: 12,
                          sm: 6,
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2.5,
                            backgroundColor:
                              "rgba(255,255,255,0.025)",
                            border:
                              "1px solid rgba(255,255,255,0.05)",
                            transition:
                              "all 0.2s ease",
                            "&:hover": {
                              transform:
                                "translateX(4px)",
                              backgroundColor:
                                "rgba(155,124,255,0.07)",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 12,
                              color:
                                "#b8bdc8",
                              lineHeight:
                                1.5,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>

              {/* Screenshots */}

              <Box
                sx={{
                  mt: 3,
                  p: {
                    xs: 2.5,
                    md: 3,
                  },
                  borderRadius: 4,
                  backgroundColor:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <ImageRoundedIcon
                      sx={{
                        color: "#9b7cff",
                        fontSize: 21,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 750,
                      }}
                    >
                      Project Screenshots
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#666d7a",
                    }}
                  >
                    {
                      screenshots.length
                    }{" "}
                    images
                  </Typography>
                </Box>

                {screenshots.length >
                0 ? (
                  <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                  >
                    {screenshots.map(
                      (
                        screenshot,
                        index
                      ) => (
                        <Grid
                          key={index}
                          size={{
                            xs: 12,
                            sm: 6,
                          }}
                        >
                          <Box
                            component="img"
                            src={
                              screenshot
                            }
                            alt={`${project.name} screenshot ${
                              index + 1
                            }`}
                            sx={{
                              width:
                                "100%",
                              display:
                                "block",
                              borderRadius: 3,
                              border:
                                "1px solid rgba(255,255,255,0.08)",
                              transition:
                                "all 0.3s ease",
                              "&:hover": {
                                transform:
                                  "scale(1.015)",
                              },
                            }}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                ) : (
                  <Box
                    sx={{
                      mt: 2,
                      minHeight: 220,
                      borderRadius: 3,
                      display: "flex",
                      flexDirection:
                        "column",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      background:
                        "linear-gradient(135deg, rgba(124,92,255,0.08), rgba(255,255,255,0.02))",
                      border:
                        "1px dashed rgba(255,255,255,0.1)",
                    }}
                  >
                    <ImageRoundedIcon
                      sx={{
                        fontSize: 40,
                        color: "#454c59",
                        mb: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 650,
                        color:
                          "#8b929f",
                      }}
                    >
                      Screenshots
                      coming soon
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right */}

            <Grid
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              {/* Technologies */}

              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 4,
                  backgroundColor:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CodeRoundedIcon
                    sx={{
                      color: "#9b7cff",
                      fontSize: 21,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 750,
                    }}
                  >
                    Technologies
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    my: 2,
                    borderColor:
                      "rgba(255,255,255,0.07)",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {technologies.map(
                    (technology) => (
                      <Chip
                        key={technology}
                        label={
                          technology
                        }
                        sx={{
                          height: 32,
                          color:
                            "#c3c7d0",
                          backgroundColor:
                            "rgba(124,92,255,0.08)",
                          border:
                            "1px solid rgba(124,92,255,0.15)",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      />
                    )
                  )}
                </Box>
              </Box>

              {/* Progress */}

              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 4,
                  backgroundColor:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#777e8c",
                    }}
                  >
                    Project Progress
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#a48cff",
                    }}
                  >
                    {project.progress}%
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    height: 7,
                    borderRadius: 10,
                    overflow: "hidden",
                    backgroundColor:
                      "rgba(255,255,255,0.06)",
                  }}
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${project.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    style={{
                      height: "100%",
                      borderRadius: 10,
                      background:
                        "linear-gradient(90deg, #7c5cff, #a78bfa)",
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: 11,
                    color: "#646b78",
                  }}
                >
                  Current development
                  progress
                </Typography>
              </Box>

              {/* Links */}

              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 4,
                  backgroundColor:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 750,
                  }}
                >
                  Project Links
                </Typography>

                <Divider
                  sx={{
                    my: 2,
                    borderColor:
                      "rgba(255,255,255,0.07)",
                  }}
                />

                <Button
                  fullWidth
                  disabled={
                    !project.liveUrl
                  }
                  startIcon={
                    <LanguageRoundedIcon />
                  }
                  endIcon={
                    project.liveUrl ? (
                      <ArrowForwardRoundedIcon />
                    ) : null
                  }
                  onClick={() => {
                    if (
                      project.liveUrl
                    ) {
                      window.open(
                        project.liveUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  sx={{
                    mb: 1.2,
                    py: 1.2,
                    borderRadius: 2.5,
                    justifyContent:
                      "flex-start",
                    textTransform:
                      "none",
                    color:
                      project.liveUrl
                        ? "#ffffff"
                        : "#555c68",
                    backgroundColor:
                      "rgba(255,255,255,0.035)",
                    border:
                      "1px solid rgba(255,255,255,0.07)",
                    fontSize: 12,
                    "&:hover": {
                      backgroundColor:
                        "rgba(124,92,255,0.12)",
                    },
                  }}
                >
                  {project.liveUrl
                    ? "View Live Project"
                    : "Live Project Not Added"}
                </Button>

                <Button
                  fullWidth
                  disabled={
                    !project.githubUrl
                  }
                  startIcon={
                    <GitHubIcon />
                  }
                  endIcon={
                    project.githubUrl ? (
                      <ArrowForwardRoundedIcon />
                    ) : null
                  }
                  onClick={() => {
                    if (
                      project.githubUrl
                    ) {
                      window.open(
                        project.githubUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  sx={{
                    py: 1.2,
                    borderRadius: 2.5,
                    justifyContent:
                      "flex-start",
                    textTransform:
                      "none",
                    color:
                      project.githubUrl
                        ? "#ffffff"
                        : "#555c68",
                    backgroundColor:
                      "rgba(255,255,255,0.035)",
                    border:
                      "1px solid rgba(255,255,255,0.07)",
                    fontSize: 12,
                    "&:hover": {
                      backgroundColor:
                        "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {project.githubUrl
                    ? "View GitHub Repository"
                    : "GitHub Repository Not Added"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* DELETE CONFIRMATION */}

      <Dialog
        open={deleteDialogOpen}
        onClose={() =>
          setDeleteDialogOpen(false)
        }
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 430,
            borderRadius: 4,
            backgroundColor:
              "#11141a",
            color: "#ffffff",
            border:
              "1px solid rgba(255,255,255,0.08)",
            backgroundImage: "none",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: 19,
            fontWeight: 800,
            pb: 1,
          }}
        >
          Delete Project?
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#858c99",
            }}
          >
            Are you sure you want to
            delete{" "}
            <Box
              component="span"
              sx={{
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              {project.name}
            </Box>
            ? This project will be
            removed from your project
            collection.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2.5,
            gap: 1,
          }}
        >
          <Button
            onClick={() =>
              setDeleteDialogOpen(false)
            }
            sx={{
              textTransform: "none",
              color: "#858c99",
              borderRadius: 2,
              px: 2,
              "&:hover": {
                color: "#ffffff",
                backgroundColor:
                  "rgba(255,255,255,0.05)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={
              handleDeleteProject
            }
            startIcon={
              <DeleteOutlineRoundedIcon />
            }
            sx={{
              textTransform: "none",
              color: "#ffffff",
              backgroundColor:
                "rgba(220,60,60,0.16)",
              border:
                "1px solid rgba(255,100,100,0.2)",
              borderRadius: 2,
              px: 2,
              fontWeight: 700,
              "&:hover": {
                backgroundColor:
                  "rgba(220,60,60,0.28)",
                borderColor:
                  "rgba(255,100,100,0.35)",
              },
            }}
          >
            Delete Project
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}