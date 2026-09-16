import React, { useMemo, useState } from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { drawerWidth } from "../components/Sidebar";

import projects from "../data/projects";

const categories = [
  "All",
  "Frontend",
  "Full-Stack",
  "AI / Automation",
];

export default function Projects() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        project.name.toLowerCase().includes(searchValue) ||
        project.description
          .toLowerCase()
          .includes(searchValue) ||
        project.technologies.some((technology) =>
          technology.toLowerCase().includes(searchValue)
        );

      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

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
        onClose={() => setMobileOpen(false)}
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
          title="Projects"
          subtitle="Explore everything you've built"
          onMenuClick={() => setMobileOpen(true)}
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
          {/* Header */}
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
                mb: 3,
                display: "flex",
                alignItems: {
                  xs: "flex-start",
                  md: "center",
                },
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 25,
                      md: 30,
                    },
                    fontWeight: 800,
                    letterSpacing: "-0.8px",
                  }}
                >
                  My Projects
                </Typography>

                <Typography
                  sx={{
                    mt: 0.8,
                    fontSize: 13,
                    color: "#777f8d",
                  }}
                >
                  A collection of projects, experiments and
                  applications I've built.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2.5,
                  backgroundColor:
                    "rgba(155,124,255,0.08)",
                  border:
                    "1px solid rgba(155,124,255,0.14)",
                }}
              >
                <FolderRoundedIcon
                  sx={{
                    fontSize: 19,
                    color: "#9b7cff",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#b6adff",
                  }}
                >
                  {projects.length} Projects
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Search + Filters */}
          <Box
            sx={{
              mb: 4,
              p: 1.5,
              borderRadius: 3.5,
              backgroundColor:
                "rgba(255,255,255,0.025)",
              border:
                "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Search */}
            <Box
              sx={{
                height: 46,
                display: "flex",
                alignItems: "center",
                px: 1.5,
                borderRadius: 2.5,
                backgroundColor:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.25s ease",
                "&:focus-within": {
                  borderColor:
                    "rgba(155,124,255,0.5)",
                  backgroundColor:
                    "rgba(255,255,255,0.05)",
                },
              }}
            >
              <SearchRoundedIcon
                sx={{
                  fontSize: 20,
                  color: "#6f7684",
                  mr: 1,
                }}
              />

              <InputBase
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by project, technology..."
                fullWidth
                sx={{
                  color: "#ffffff",
                  fontSize: 13,
                  "& input::placeholder": {
                    color: "#626a78",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Category Filters */}
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                overflowX: "auto",
                pb: 0.5,
                "&::-webkit-scrollbar": {
                  height: 3,
                },
              }}
            >
              {categories.map((category) => {
                const active =
                  selectedCategory === category;

                return (
                  <Button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    sx={{
                      flexShrink: 0,
                      minWidth: "auto",
                      px: 2,
                      py: 0.8,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: 11.5,
                      fontWeight: active ? 700 : 500,
                      color: active
                        ? "#ffffff"
                        : "#7d8492",
                      backgroundColor: active
                        ? "rgba(124,92,255,0.18)"
                        : "transparent",
                      border: active
                        ? "1px solid rgba(155,124,255,0.28)"
                        : "1px solid transparent",
                      transition:
                        "all 0.2s ease",
                      "&:hover": {
                        backgroundColor:
                          "rgba(124,92,255,0.12)",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {category}
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* Result Information */}
          <Box
            sx={{
              mb: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#707786",
              }}
            >
              Showing{" "}
              <Box
                component="span"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                }}
              >
                {filteredProjects.length}
              </Box>{" "}
              projects
            </Typography>

            {search && (
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#9b7cff",
                }}
              >
                Searching for "{search}"
              </Typography>
            )}
          </Box>

          {/* Project Cards */}
          {filteredProjects.length > 0 ? (
            <Grid
              container
              spacing={2.5}
            >
              {filteredProjects.map(
                (project, index) => (
                  <Grid
                    key={project.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      xl: 4,
                    }}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        y: -6,
                      }}
                      style={{
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          overflow: "hidden",
                          borderRadius: 4,
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
                          border:
                            "1px solid rgba(255,255,255,0.07)",
                          transition:
                            "all 0.3s ease",
                          "&:hover": {
                            borderColor:
                              "rgba(155,124,255,0.35)",
                            boxShadow:
                              "0 20px 50px rgba(0,0,0,0.25)",
                          },
                        }}
                      >
                        {/* Screenshot / Preview */}
                        <Box
                          sx={{
                            height: {
                              xs: 190,
                              md: 210,
                            },
                            position: "relative",
                            overflow: "hidden",
                            background:
                              project.gradient,
                          }}
                        >
                          {/* Preview Grid */}
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              opacity: 0.12,
                              backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                              backgroundSize:
                                "35px 35px",
                            }}
                          />

                          {/* Preview Text */}
                          <Box
                            sx={{
                              position:
                                "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                            }}
                          >
                            <Typography
                              sx={{
                                px: 3,
                                textAlign:
                                  "center",
                                fontSize: 24,
                                fontWeight: 800,
                                color:
                                  "rgba(255,255,255,0.85)",
                                letterSpacing:
                                  "-0.6px",
                              }}
                            >
                              {project.name}
                            </Typography>
                          </Box>

                          {/* Overlay */}
                          <Box
                            sx={{
                              position:
                                "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(to bottom, transparent 35%, rgba(7,9,13,0.78) 100%)",
                            }}
                          />

                          {/* Category */}
                          <Box
                            sx={{
                              position:
                                "absolute",
                              top: 15,
                              left: 15,
                            }}
                          >
                            <Chip
                              label={
                                project.category
                              }
                              size="small"
                              sx={{
                                height: 28,
                                color: "#ffffff",
                                backgroundColor:
                                  "rgba(0,0,0,0.35)",
                                backdropFilter:
                                  "blur(8px)",
                                border:
                                  "1px solid rgba(255,255,255,0.12)",
                                fontSize: 10.5,
                                fontWeight: 600,
                              }}
                            />
                          </Box>

                          {/* Status */}
                          <Box
                            sx={{
                              position:
                                "absolute",
                              left: 17,
                              right: 17,
                              bottom: 15,
                              display: "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 11,
                                color:
                                  "#ffffff",
                                fontWeight: 600,
                              }}
                            >
                              {project.status}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 11,
                                color:
                                  "rgba(255,255,255,0.7)",
                              }}
                            >
                              {project.year}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Card Content */}
                        <Box
                          sx={{
                            p: 2.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: 750,
                              color: "#ffffff",
                              letterSpacing:
                                "-0.4px",
                            }}
                          >
                            {project.name}
                          </Typography>

                          <Typography
                            sx={{
                              mt: 1,
                              fontSize: 12.5,
                              lineHeight: 1.7,
                              color: "#7d8492",
                              display:
                                "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient:
                                "vertical",
                              overflow: "hidden",
                              minHeight: 64,
                            }}
                          >
                            {
                              project.description
                            }
                          </Typography>

                          {/* Technologies */}
                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              flexWrap:
                                "wrap",
                              gap: 0.8,
                            }}
                          >
                            {project.technologies
                              .slice(0, 4)
                              .map(
                                (technology) => (
                                  <Chip
                                    key={
                                      technology
                                    }
                                    label={
                                      technology
                                    }
                                    size="small"
                                    sx={{
                                      height: 26,
                                      color:
                                        "#aeb4c0",
                                      backgroundColor:
                                        "rgba(255,255,255,0.04)",
                                      border:
                                        "1px solid rgba(255,255,255,0.06)",
                                      fontSize: 10.5,
                                      transition:
                                        "all 0.2s ease",
                                      "&:hover":
                                        {
                                          backgroundColor:
                                            "rgba(155,124,255,0.1)",
                                          color:
                                            "#ffffff",
                                          borderColor:
                                            "rgba(155,124,255,0.2)",
                                        },
                                    }}
                                  />
                                )
                              )}
                          </Box>

                          {/* Progress */}
                          <Box
                            sx={{
                              mt: 2.5,
                            }}
                          >
                            <Box
                              sx={{
                                display:
                                  "flex",
                                justifyContent:
                                  "space-between",
                                mb: 0.8,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 10.5,
                                  color:
                                    "#656d7b",
                                }}
                              >
                                Progress
                              </Typography>

                              <Typography
                                sx={{
                                  fontSize: 10.5,
                                  color:
                                    "#9b7cff",
                                  fontWeight: 700,
                                }}
                              >
                                {
                                  project.progress
                                }
                                %
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                height: 4,
                                borderRadius: 10,
                                backgroundColor:
                                  "rgba(255,255,255,0.06)",
                                overflow:
                                  "hidden",
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
                                  duration: 0.8,
                                  delay:
                                    0.2 +
                                    index *
                                      0.08,
                                }}
                                style={{
                                  height:
                                    "100%",
                                  borderRadius:
                                    10,
                                  background:
                                    "linear-gradient(90deg, #7c5cff, #a78bfa)",
                                }}
                              />
                            </Box>
                          </Box>

                          {/* Button */}
                          <Button
                            fullWidth
                            endIcon={
                              <ArrowForwardRoundedIcon
                                sx={{
                                  fontSize: 16,
                                }}
                              />
                            }
                            onClick={() =>
                              navigate(
                                `/projects/${project.id}`
                              )
                            }
                            sx={{
                              mt: 2.5,
                              py: 1.1,
                              borderRadius: 2.5,
                              textTransform:
                                "none",
                              color: "#ffffff",
                              backgroundColor:
                                "rgba(124,92,255,0.1)",
                              border:
                                "1px solid rgba(124,92,255,0.16)",
                              fontSize: 12,
                              fontWeight: 700,
                              transition:
                                "all 0.25s ease",
                              "&:hover": {
                                backgroundColor:
                                  "rgba(124,92,255,0.2)",
                                borderColor:
                                  "rgba(155,124,255,0.35)",
                                "& .MuiButton-endIcon":
                                  {
                                    transform:
                                      "translateX(4px)",
                                  },
                              },
                              "& .MuiButton-endIcon":
                                {
                                  transition:
                                    "transform 0.2s ease",
                                },
                            }}
                          >
                            View Project
                          </Button>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                )
              )}
            </Grid>
          ) : (
            /* Empty State */
            <Box
              sx={{
                py: 10,
                textAlign: "center",
                borderRadius: 4,
                border:
                  "1px dashed rgba(255,255,255,0.1)",
                backgroundColor:
                  "rgba(255,255,255,0.02)",
              }}
            >
              <SearchRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#454c59",
                  mb: 1,
                }}
              />

              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                No projects found
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  fontSize: 12,
                  color: "#686f7c",
                }}
              >
                Try a different search term or
                category.
              </Typography>

              <Button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                sx={{
                  mt: 2,
                  textTransform: "none",
                  color: "#a48cff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Clear filters
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}