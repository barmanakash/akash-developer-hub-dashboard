import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { motion } from "motion/react";

import {
  useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  drawerWidth,
} from "../components/Sidebar";

const STORAGE_KEY =
  "akash_developer_projects";

const experienceData = [
  {
    id: "svam-international",
    company: "SVAM International",
    role: "Frontend Developer",
    type: "Professional Experience",
    startDate: "2024",
    endDate: "Present",
    duration: "Current",
    location: "India",
    current: true,

    description:
      "Worked on modern web applications with a strong focus on frontend development, reusable UI components and API-driven experiences.",

    responsibilities: [
      "Developed responsive and pixel-accurate interfaces from Figma designs.",
      "Built reusable React.js components for scalable application development.",
      "Integrated REST APIs with frontend applications.",
      "Worked with TypeScript, Redux Toolkit and Material UI.",
      "Collaborated with development teams to deliver application features.",
      "Worked with CI/CD workflows for application delivery.",
    ],

    technologies: [
      "React.js",
      "JavaScript",
      "TypeScript",
      "Redux Toolkit",
      "Material UI",
      "REST APIs",
      "Git",
    ],
  },

  {
    id: "dxc-technology",
    company: "DXC Technology",
    role: "Frontend Developer",
    type: "Professional Experience",
    startDate: "2023",
    endDate: "2024",
    duration: "1+ Year",
    location: "India",
    current: false,

    description:
      "Contributed to enterprise application development with a focus on frontend modules, user interface improvements and Agile delivery.",

    responsibilities: [
      "Revamped existing UI modules using modern frontend practices.",
      "Developed reusable components for enterprise applications.",
      "Worked with cross-functional teams in an Agile environment.",
      "Implemented UI improvements based on functional requirements.",
      "Integrated frontend modules with backend APIs.",
      "Participated in development, testing and issue resolution.",
    ],

    technologies: [
      "React.js",
      "JavaScript",
      "HTML",
      "CSS",
      "REST APIs",
      "Git",
      "Agile",
    ],
  },
];

const experienceFilters = [
  {
    id: "all",
    label: "All Experience",
  },
  {
    id: "current",
    label: "Current",
  },
  {
    id: "previous",
    label: "Previous",
  },
];

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
      JSON.parse(
        storedProjects
      );

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

function getProjectCount(
  technologies,
  projects
) {
  return projects.filter(
    (project) => {
      if (
        !Array.isArray(
          project.technologies
        )
      ) {
        return false;
      }

      return project.technologies.some(
        (technology) =>
          technologies.some(
            (experienceTechnology) =>
              String(
                experienceTechnology
              )
                .toLowerCase()
                .trim() ===
              String(
                technology
              )
                .toLowerCase()
                .trim()
          )
      );
    }
  ).length;
}

export default function Experience() {
  const navigate = useNavigate();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState("all");

  const [search, setSearch] =
    useState("");

  const [
    projects,
    setProjects,
  ] = useState(() =>
    getStoredProjects()
  );

  const refreshProjects = () => {
    setProjects(
      getStoredProjects()
    );
  };

  useEffect(() => {
    refreshProjects();

    window.addEventListener(
      "storage",
      refreshProjects
    );

    document.addEventListener(
      "visibilitychange",
      refreshProjects
    );

    return () => {
      window.removeEventListener(
        "storage",
        refreshProjects
      );

      document.removeEventListener(
        "visibilitychange",
        refreshProjects
      );
    };
  }, []);

  const filteredExperience =
    useMemo(() => {
      const searchValue =
        search
          .toLowerCase()
          .trim();

      return experienceData.filter(
        (experience) => {
          const matchesFilter =
            selectedFilter ===
              "all" ||
            (selectedFilter ===
              "current" &&
              experience.current) ||
            (selectedFilter ===
              "previous" &&
              !experience.current);

          const matchesSearch =
            !searchValue ||
            experience.company
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            experience.role
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            experience.description
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            experience.technologies.some(
              (technology) =>
                technology
                  .toLowerCase()
                  .includes(
                    searchValue
                  )
            );

          return (
            matchesFilter &&
            matchesSearch
          );
        }
      );
    }, [
      search,
      selectedFilter,
    ]);

  const totalExperience =
    experienceData.length;

  const currentExperience =
    experienceData.filter(
      (experience) =>
        experience.current
    ).length;

  const totalTechnologies =
    new Set(
      experienceData.flatMap(
        (experience) =>
          experience.technologies
      )
    ).size;

  const totalResponsibilities =
    experienceData.reduce(
      (total, experience) =>
        total +
        experience
          .responsibilities.length,
      0
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor:
          "#07090d",
        color: "#ffffff",
      }}
    >
      <Sidebar
        mobileOpen={
          mobileOpen
        }
        onClose={() =>
          setMobileOpen(false)
        }
      />

      <Box
        sx={{
          ml: {
            xs: 0,
            md: `${drawerWidth}px`,
          },
          minHeight:
            "100vh",
        }}
      >
        <Topbar
          title="Experience"
          subtitle="My professional journey and development experience"
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
          {/* HEADER */}

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
                display: "flex",
                alignItems: {
                  xs: "flex-start",
                  md: "center",
                },
                justifyContent:
                  "space-between",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 26,
                      md: 32,
                    },
                    fontWeight: 850,
                    letterSpacing:
                      "-1px",
                  }}
                >
                  Professional
                  Experience
                </Typography>

                <Typography
                  sx={{
                    mt: 0.8,
                    fontSize: 13,
                    color:
                      "#737b89",
                  }}
                >
                  My journey through
                  frontend development,
                  enterprise applications
                  and modern web
                  technologies.
                </Typography>
              </Box>

              <Button
                startIcon={
                  <CodeRoundedIcon />
                }
                endIcon={
                  <ArrowForwardRoundedIcon />
                }
                onClick={() =>
                  navigate(
                    "/skills"
                  )
                }
                sx={{
                  px: 2,
                  py: 1.1,
                  borderRadius: 2.5,
                  textTransform:
                    "none",
                  color:
                    "#ffffff",
                  backgroundColor:
                    "rgba(124,92,255,0.1)",
                  border:
                    "1px solid rgba(124,92,255,0.16)",
                  fontSize: 11,
                  fontWeight: 700,
                  transition:
                    "all 0.25s ease",
                  "&:hover": {
                    backgroundColor:
                      "rgba(124,92,255,0.18)",
                    borderColor:
                      "rgba(124,92,255,0.3)",
                    transform:
                      "translateY(-2px)",
                  },
                }}
              >
                View Skills
              </Button>
            </Box>
          </motion.div>

          {/* SUMMARY */}

          <Grid
            container
            spacing={2.5}
          >
            {[
              {
                label:
                  "Companies",
                value:
                  totalExperience,
                icon: (
                  <BusinessRoundedIcon />
                ),
                description:
                  "Professional organizations",
              },
              {
                label:
                  "Current Role",
                value:
                  currentExperience,
                icon: (
                  <WorkOutlineRoundedIcon />
                ),
                description:
                  "Currently active position",
              },
              {
                label:
                  "Technologies",
                value:
                  totalTechnologies,
                icon: (
                  <CodeRoundedIcon />
                ),
                description:
                  "Across professional experience",
              },
              {
                label:
                  "Responsibilities",
                value:
                  totalResponsibilities,
                icon: (
                  <AutoAwesomeRoundedIcon />
                ),
                description:
                  "Areas of professional work",
              },
            ].map(
              (
                stat,
                index
              ) => (
                <Grid
                  key={
                    stat.label
                  }
                  size={{
                    xs: 12,
                    sm: 6,
                    lg: 3,
                  }}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration:
                        0.4,
                      delay:
                        index *
                        0.06,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2.5,
                        minHeight: 145,
                        borderRadius: 4,
                        background:
                          "linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))",
                        border:
                          "1px solid rgba(255,255,255,0.07)",
                        transition:
                          "all 0.25s ease",
                        "&:hover": {
                          borderColor:
                            "rgba(155,124,255,0.28)",
                          boxShadow:
                            "0 15px 35px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius:
                            2.5,
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color:
                            "#a48cff",
                          backgroundColor:
                            "rgba(124,92,255,0.09)",
                        }}
                      >
                        {stat.icon}
                      </Box>

                      <Typography
                        sx={{
                          mt: 1.8,
                          fontSize: 25,
                          fontWeight:
                            850,
                        }}
                      >
                        {
                          stat.value
                        }
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 11,
                          fontWeight:
                            700,
                        }}
                      >
                        {
                          stat.label
                        }
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.4,
                          fontSize: 10,
                          color:
                            "#626a77",
                        }}
                      >
                        {
                          stat.description
                        }
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              )
            )}
          </Grid>

          {/* SEARCH + FILTER */}

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
              delay: 0.25,
            }}
          >
            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems:
                  "center",
                gap: 1.2,
                flexWrap: "wrap",
              }}
            >
              {/* Search */}

              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: 280,
                  },
                  height: 43,
                  display:
                    "flex",
                  alignItems:
                    "center",
                  px: 1.5,
                  gap: 1,
                  borderRadius: 2.5,
                  backgroundColor:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <SearchRoundedIcon
                  sx={{
                    fontSize: 18,
                    color:
                      "#59616f",
                  }}
                />

                <Box
                  component="input"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target
                        .value
                    )
                  }
                  placeholder="Search experience..."
                  sx={{
                    width:
                      "100%",
                    border: "none",
                    outline:
                      "none",
                    background:
                      "transparent",
                    color:
                      "#ffffff",
                    fontSize: 11,
                    fontFamily:
                      "inherit",
                    "&::placeholder":
                      {
                        color:
                          "#59616f",
                        opacity: 1,
                      },
                  }}
                />
              </Box>

              {/* Filters */}

              <Box
                sx={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: 0.8,
                  flexWrap:
                    "wrap",
                }}
              >
                {experienceFilters.map(
                  (
                    filter
                  ) => {
                    const active =
                      selectedFilter ===
                      filter.id;

                    return (
                      <Button
                        key={
                          filter.id
                        }
                        onClick={() =>
                          setSelectedFilter(
                            filter.id
                          )
                        }
                        sx={{
                          minHeight: 40,
                          px: 1.7,
                          borderRadius:
                            2.5,
                          textTransform:
                            "none",
                          color:
                            active
                              ? "#ffffff"
                              : "#747c89",
                          backgroundColor:
                            active
                              ? "rgba(124,92,255,0.14)"
                              : "rgba(255,255,255,0.02)",
                          border:
                            active
                              ? "1px solid rgba(124,92,255,0.22)"
                              : "1px solid rgba(255,255,255,0.06)",
                          fontSize: 10.5,
                          fontWeight:
                            active
                              ? 700
                              : 600,
                          transition:
                            "all 0.2s ease",
                          "&:hover":
                            {
                              color:
                                "#ffffff",
                              backgroundColor:
                                "rgba(124,92,255,0.1)",
                              borderColor:
                                "rgba(124,92,255,0.2)",
                            },
                        }}
                      >
                        {
                          filter.label
                        }
                      </Button>
                    );
                  }
                )}
              </Box>
            </Box>
          </motion.div>

          {/* EXPERIENCE TIMELINE */}

          <Box
            sx={{
              mt: 4,
              position:
                "relative",
            }}
          >
            {/* Vertical timeline */}

            <Box
              sx={{
                position:
                  "absolute",
                left: {
                  xs: 17,
                  md: 23,
                },
                top: 25,
                bottom: 25,
                width: 1,
                background:
                  "linear-gradient(to bottom, rgba(124,92,255,0.4), rgba(124,92,255,0.05))",
                display: {
                  xs: "block",
                  md: "block",
                },
              }}
            />

            {filteredExperience.length >
            0 ? (
              filteredExperience.map(
                (
                  experience,
                  index
                ) => {
                  const projectCount =
                    getProjectCount(
                      experience.technologies,
                      projects
                    );

                  return (
                    <motion.div
                      key={
                        experience.id
                      }
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration:
                          0.45,
                        delay:
                          index *
                          0.1,
                      }}
                    >
                      <Box
                        sx={{
                          position:
                            "relative",
                          pl: {
                            xs: 5,
                            md: 7,
                          },
                          mb:
                            index ===
                            filteredExperience.length -
                              1
                              ? 0
                              : 4,
                        }}
                      >
                        {/* Timeline dot */}

                        <Box
                          sx={{
                            position:
                              "absolute",
                            left: {
                              xs: 8,
                              md: 14,
                            },
                            top: 19,
                            width: {
                              xs: 19,
                              md: 20,
                            },
                            height: {
                              xs: 19,
                              md: 20,
                            },
                            borderRadius:
                              "50%",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            backgroundColor:
                              "#07090d",
                            border:
                              experience.current
                                ? "2px solid #9b7cff"
                                : "2px solid #555c68",
                            boxShadow:
                              experience.current
                                ? "0 0 0 5px rgba(124,92,255,0.08)"
                                : "none",
                            zIndex: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius:
                                "50%",
                              backgroundColor:
                                experience.current
                                  ? "#a78bfa"
                                  : "#59616f",
                            }}
                          />
                        </Box>

                        {/* EXPERIENCE CARD */}

                        <Box
                          sx={{
                            p: {
                              xs: 2.2,
                              md: 3,
                            },
                            borderRadius: 4,
                            background:
                              experience.current
                                ? "linear-gradient(145deg, rgba(124,92,255,0.07), rgba(255,255,255,0.025))"
                                : "rgba(255,255,255,0.025)",
                            border:
                              experience.current
                                ? "1px solid rgba(124,92,255,0.18)"
                                : "1px solid rgba(255,255,255,0.07)",
                            transition:
                              "all 0.3s ease",
                            "&:hover":
                              {
                                borderColor:
                                  experience.current
                                    ? "rgba(124,92,255,0.3)"
                                    : "rgba(255,255,255,0.14)",
                                transform:
                                  "translateY(-3px)",
                                boxShadow:
                                  "0 18px 45px rgba(0,0,0,0.2)",
                              },
                          }}
                        >
                          {/* CARD HEADER */}

                          <Box
                            sx={{
                              display:
                                "flex",
                              justifyContent:
                                "space-between",
                              alignItems:
                                "flex-start",
                              gap: 2,
                              flexDirection:
                                {
                                  xs: "column",
                                  md: "row",
                                },
                            }}
                          >
                            <Box
                              sx={{
                                display:
                                  "flex",
                                alignItems:
                                  "flex-start",
                                gap: 1.5,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  flexShrink: 0,
                                  borderRadius: 3,
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "center",
                                  color:
                                    "#b8a8ff",
                                  background:
                                    "linear-gradient(135deg, rgba(124,92,255,0.16), rgba(124,92,255,0.04))",
                                  border:
                                    "1px solid rgba(124,92,255,0.14)",
                                }}
                              >
                                <BusinessRoundedIcon
                                  sx={{
                                    fontSize: 22,
                                  }}
                                />
                              </Box>

                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: 17,
                                      md: 20,
                                    },
                                    fontWeight:
                                      800,
                                    lineHeight:
                                      1.2,
                                  }}
                                >
                                  {
                                    experience.company
                                  }
                                </Typography>

                                <Typography
                                  sx={{
                                    mt: 0.5,
                                    fontSize: 12,
                                    color:
                                      "#a48cff",
                                    fontWeight:
                                      650,
                                  }}
                                >
                                  {
                                    experience.role
                                  }
                                </Typography>
                              </Box>
                            </Box>

                            <Chip
                              label={
                                experience.current
                                  ? "Current"
                                  : "Previous"
                              }
                              sx={{
                                height: 27,
                                color:
                                  experience.current
                                    ? "#7ee6b2"
                                    : "#8c94a1",
                                backgroundColor:
                                  experience.current
                                    ? "rgba(80,190,140,0.08)"
                                    : "rgba(255,255,255,0.04)",
                                border:
                                  experience.current
                                    ? "1px solid rgba(80,190,140,0.15)"
                                    : "1px solid rgba(255,255,255,0.07)",
                                fontSize: 9,
                                fontWeight:
                                  700,
                              }}
                            />
                          </Box>

                          {/* META */}

                          <Box
                            sx={{
                              mt: 2.2,
                              display:
                                "flex",
                              alignItems:
                                "center",
                              flexWrap:
                                "wrap",
                              gap: 1.8,
                            }}
                          >
                            <Box
                              sx={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 0.7,
                              }}
                            >
                              <CalendarMonthRoundedIcon
                                sx={{
                                  fontSize: 15,
                                  color:
                                    "#737b89",
                                }}
                              />

                              <Typography
                                sx={{
                                  fontSize: 10.5,
                                  color:
                                    "#737b89",
                                }}
                              >
                                {
                                  experience.startDate
                                }{" "}
                                —{" "}
                                {
                                  experience.endDate
                                }
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 0.7,
                              }}
                            >
                              <LocationOnRoundedIcon
                                sx={{
                                  fontSize: 15,
                                  color:
                                    "#737b89",
                                }}
                              />

                              <Typography
                                sx={{
                                  fontSize: 10.5,
                                  color:
                                    "#737b89",
                                }}
                              >
                                {
                                  experience.location
                                }
                              </Typography>
                            </Box>

                            <Chip
                              label={
                                experience.duration
                              }
                              size="small"
                              sx={{
                                height: 23,
                                color:
                                  "#9b7cff",
                                backgroundColor:
                                  "rgba(124,92,255,0.07)",
                                border:
                                  "1px solid rgba(124,92,255,0.12)",
                                fontSize: 8.5,
                                fontWeight:
                                  700,
                              }}
                            />
                          </Box>

                          {/* DESCRIPTION */}

                          <Typography
                            sx={{
                              mt: 2.2,
                              maxWidth: 900,
                              fontSize: 11.5,
                              lineHeight:
                                1.7,
                              color:
                                "#858c99",
                            }}
                          >
                            {
                              experience.description
                            }
                          </Typography>

                          {/* RESPONSIBILITIES */}

                          <Grid
                            container
                            spacing={2}
                            sx={{
                              mt: 0.8,
                            }}
                          >
                            <Grid
                              size={{
                                xs: 12,
                                md: 7,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  fontWeight:
                                    750,
                                  color:
                                    "#d8dbe1",
                                  mb: 1.3,
                                }}
                              >
                                Key
                                Responsibilities
                              </Typography>

                              <Box
                                sx={{
                                  display:
                                    "flex",
                                  flexDirection:
                                    "column",
                                  gap: 1,
                                }}
                              >
                                {experience.responsibilities.map(
                                  (
                                    responsibility
                                  ) => (
                                    <Box
                                      key={
                                        responsibility
                                      }
                                      sx={{
                                        display:
                                          "flex",
                                        alignItems:
                                          "flex-start",
                                        gap: 1,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          mt: 0.7,
                                          width: 5,
                                          height: 5,
                                          flexShrink: 0,
                                          borderRadius:
                                            "50%",
                                          backgroundColor:
                                            "#8f75ee",
                                        }}
                                      />

                                      <Typography
                                        sx={{
                                          fontSize: 10.5,
                                          lineHeight:
                                            1.55,
                                          color:
                                            "#737b89",
                                        }}
                                      >
                                        {
                                          responsibility
                                        }
                                      </Typography>
                                    </Box>
                                  )
                                )}
                              </Box>
                            </Grid>

                            {/* TECHNOLOGIES */}

                            <Grid
                              size={{
                                xs: 12,
                                md: 5,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  fontWeight:
                                    750,
                                  color:
                                    "#d8dbe1",
                                  mb: 1.3,
                                }}
                              >
                                Technologies
                              </Typography>

                              <Box
                                sx={{
                                  display:
                                    "flex",
                                  flexWrap:
                                    "wrap",
                                  gap: 0.8,
                                }}
                              >
                                {experience.technologies.map(
                                  (
                                    technology
                                  ) => (
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
                                          "#8d95a3",
                                        backgroundColor:
                                          "rgba(255,255,255,0.025)",
                                        border:
                                          "1px solid rgba(255,255,255,0.06)",
                                        fontSize: 8.5,
                                        fontWeight:
                                          600,
                                      }}
                                    />
                                  )
                                )}
                              </Box>
                            </Grid>
                          </Grid>

                          {/* FOOTER */}

                          <Box
                            sx={{
                              mt: 2.5,
                              pt: 1.8,
                              borderTop:
                                "1px solid rgba(255,255,255,0.05)",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "space-between",
                              flexWrap:
                                "wrap",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 0.8,
                              }}
                            >
                              <CodeRoundedIcon
                                sx={{
                                  fontSize: 15,
                                  color:
                                    "#7060b4",
                                }}
                              />

                              <Typography
                                sx={{
                                  fontSize: 9.5,
                                  color:
                                    "#565e6b",
                                }}
                              >
                                Connected
                                projects
                              </Typography>

                              <Typography
                                sx={{
                                  fontSize: 10,
                                  color:
                                    "#9b7cff",
                                  fontWeight:
                                    700,
                                }}
                              >
                                {
                                  projectCount
                                }
                              </Typography>
                            </Box>

                            <Typography
                              sx={{
                                fontSize: 9,
                                color:
                                  "#4f5662",
                              }}
                            >
                              {
                                experience.type
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  );
                }
              )
            ) : (
              <Box
                sx={{
                  py: 10,
                  textAlign:
                    "center",
                  borderRadius: 4,
                  border:
                    "1px dashed rgba(255,255,255,0.08)",
                  backgroundColor:
                    "rgba(255,255,255,0.015)",
                }}
              >
                <SearchRoundedIcon
                  sx={{
                    fontSize: 40,
                    color:
                      "#454c59",
                  }}
                />

                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: 15,
                    fontWeight: 750,
                  }}
                >
                  No experience
                  found
                </Typography>

                <Typography
                  sx={{
                    mt: 0.6,
                    fontSize: 11,
                    color:
                      "#626a77",
                  }}
                >
                  Try another search
                  term or filter.
                </Typography>

                <Button
                  onClick={() => {
                    setSearch("");
                    setSelectedFilter(
                      "all"
                    );
                  }}
                  sx={{
                    mt: 2,
                    textTransform:
                      "none",
                    color:
                      "#a48cff",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Clear Filters
                </Button>
              </Box>
            )}
          </Box>

          {/* BOTTOM CTA */}

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
              delay: 0.5,
            }}
          >
            <Box
              sx={{
                mt: 5,
                p: {
                  xs: 2.5,
                  md: 3,
                },
                borderRadius: 4,
                display: "flex",
                alignItems: {
                  xs: "flex-start",
                  md: "center",
                },
                justifyContent:
                  "space-between",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 2,
                background:
                  "linear-gradient(135deg, rgba(124,92,255,0.1), rgba(255,255,255,0.02))",
                border:
                  "1px solid rgba(124,92,255,0.12)",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 750,
                  }}
                >
                  Explore my work
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 10.5,
                    color:
                      "#686f7c",
                  }}
                >
                  See the projects and
                  technologies behind my
                  professional experience.
                </Typography>
              </Box>

              <Button
                endIcon={
                  <ArrowForwardRoundedIcon
                    sx={{
                      fontSize: 15,
                    }}
                  />
                }
                onClick={() =>
                  navigate(
                    "/projects"
                  )
                }
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2.5,
                  textTransform:
                    "none",
                  color:
                    "#ffffff",
                  backgroundColor:
                    "rgba(124,92,255,0.14)",
                  border:
                    "1px solid rgba(124,92,255,0.2)",
                  fontSize: 10.5,
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor:
                      "rgba(124,92,255,0.22)",
                    transform:
                      "translateY(-2px)",
                  },
                }}
              >
                Explore Projects
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}