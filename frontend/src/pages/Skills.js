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

import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { motion } from "motion/react";

import {
  useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  drawerWidth,
} from "../components/Sidebar";

const skillCategories = [
  {
    id: "all",
    label: "All Skills",
  },
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "backend",
    label: "Backend",
  },
  {
    id: "ai",
    label: "AI / ML",
  },
  {
    id: "tools",
    label: "Tools",
  },
];

const skills = [
  {
    name: "React.js",
    category: "frontend",
    level: "Advanced",
    percentage: 88,
    description:
      "Building reusable, responsive and production-ready user interfaces.",
    icon: "⚛",
    projects: 0,
    tags: [
      "Components",
      "Hooks",
      "State",
      "Routing",
    ],
  },

  {
    name: "JavaScript",
    category: "frontend",
    level: "Advanced",
    percentage: 90,
    description:
      "Modern JavaScript for interactive applications and application logic.",
    icon: "JS",
    projects: 0,
    tags: [
      "ES6+",
      "Async",
      "APIs",
      "DOM",
    ],
  },

  {
    name: "TypeScript",
    category: "frontend",
    level: "Intermediate",
    percentage: 76,
    description:
      "Type-safe application development with scalable frontend architecture.",
    icon: "TS",
    projects: 0,
    tags: [
      "Types",
      "Interfaces",
      "Generics",
      "React",
    ],
  },

  {
    name: "Material UI",
    category: "frontend",
    level: "Advanced",
    percentage: 86,
    description:
      "Designing consistent interfaces using reusable MUI components.",
    icon: "MUI",
    projects: 0,
    tags: [
      "Components",
      "Theme",
      "Responsive",
      "UX",
    ],
  },

  {
    name: "Redux Toolkit",
    category: "frontend",
    level: "Intermediate",
    percentage: 78,
    description:
      "Managing predictable application state with Redux Toolkit.",
    icon: "RTK",
    projects: 0,
    tags: [
      "State",
      "Slices",
      "Async",
      "Store",
    ],
  },

  {
    name: "HTML & CSS",
    category: "frontend",
    level: "Advanced",
    percentage: 92,
    description:
      "Creating responsive layouts and pixel-accurate interfaces.",
    icon: "</>",
    projects: 0,
    tags: [
      "Responsive",
      "Flexbox",
      "Grid",
      "Animation",
    ],
  },

  {
    name: "Python",
    category: "backend",
    level: "Intermediate",
    percentage: 72,
    description:
      "Using Python for backend development and AI-related applications.",
    icon: "PY",
    projects: 0,
    tags: [
      "APIs",
      "Automation",
      "AI",
      "Scripting",
    ],
  },

  {
    name: "FastAPI",
    category: "backend",
    level: "Intermediate",
    percentage: 70,
    description:
      "Building lightweight and scalable Python APIs.",
    icon: "API",
    projects: 0,
    tags: [
      "REST",
      "Validation",
      "Async",
      "Backend",
    ],
  },

  {
    name: "Node.js",
    category: "backend",
    level: "Intermediate",
    percentage: 74,
    description:
      "Developing backend services and APIs using JavaScript.",
    icon: "JS",
    projects: 0,
    tags: [
      "Express",
      "REST",
      "APIs",
      "Server",
    ],
  },

  {
    name: "MongoDB",
    category: "backend",
    level: "Intermediate",
    percentage: 72,
    description:
      "Working with document-based data models for web applications.",
    icon: "DB",
    projects: 0,
    tags: [
      "Database",
      "Queries",
      "Schema",
      "CRUD",
    ],
  },

  {
    name: "AI Agents",
    category: "ai",
    level: "Learning",
    percentage: 62,
    description:
      "Learning and building AI agents that can reason through tasks and use tools.",
    icon: "AI",
    projects: 0,
    tags: [
      "Agents",
      "Tools",
      "LLMs",
      "Automation",
    ],
  },

  {
    name: "RAG",
    category: "ai",
    level: "Learning",
    percentage: 60,
    description:
      "Building retrieval-augmented systems that ground LLM responses in external data.",
    icon: "RAG",
    projects: 0,
    tags: [
      "Retrieval",
      "Embeddings",
      "Vector DB",
      "LLM",
    ],
  },

  {
    name: "LangChain",
    category: "ai",
    level: "Learning",
    percentage: 58,
    description:
      "Exploring frameworks for building LLM applications and AI workflows.",
    icon: "LC",
    projects: 0,
    tags: [
      "LLM",
      "Chains",
      "Agents",
      "RAG",
    ],
  },

  {
    name: "Git & GitHub",
    category: "tools",
    level: "Advanced",
    percentage: 84,
    description:
      "Version control, collaboration and project source management.",
    icon: "GIT",
    projects: 0,
    tags: [
      "Git",
      "GitHub",
      "Branches",
      "CI/CD",
    ],
  },

  {
    name: "REST APIs",
    category: "tools",
    level: "Advanced",
    percentage: 85,
    description:
      "Integrating and developing APIs for frontend and backend systems.",
    icon: "API",
    projects: 0,
    tags: [
      "HTTP",
      "JSON",
      "REST",
      "Integration",
    ],
  },
];

const categoryIcons = {
  frontend: (
    <CodeRoundedIcon />
  ),
  backend: (
    <StorageRoundedIcon />
  ),
  ai: (
    <PsychologyRoundedIcon />
  ),
  tools: (
    <BuildRoundedIcon />
  ),
};

const categoryNames = {
  frontend: "Frontend Development",
  backend: "Backend Development",
  ai: "AI / Machine Learning",
  tools: "Development Tools",
};

const levelStyles = {
  Advanced: {
    color: "#7ee6b2",
    background:
      "rgba(80,190,140,0.08)",
    border:
      "rgba(80,190,140,0.14)",
  },

  Intermediate: {
    color: "#8db8ff",
    background:
      "rgba(90,130,255,0.08)",
    border:
      "rgba(90,130,255,0.14)",
  },

  Learning: {
    color: "#c09cff",
    background:
      "rgba(124,92,255,0.08)",
    border:
      "rgba(124,92,255,0.14)",
  },
};

function getStoredProjects() {
  try {
    const storedProjects =
      localStorage.getItem(
        "akash_developer_projects"
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

function getSkillProjectCount(
  skillName,
  projectList
) {
  const normalizedSkill =
    skillName
      .toLowerCase()
      .trim();

  return projectList.filter(
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
          String(technology)
            .toLowerCase()
            .trim() ===
          normalizedSkill
      );
    }
  ).length;
}

export default function Skills() {
  const navigate = useNavigate();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [search, setSearch] =
    useState("");

  const [
    projectList,
    setProjectList,
  ] = useState(() =>
    getStoredProjects()
  );

  const refreshProjects = () => {
    setProjectList(
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

  const skillsWithProjectCount =
    useMemo(() => {
      return skills.map(
        (skill) => ({
          ...skill,
          projects:
            getSkillProjectCount(
              skill.name,
              projectList
            ),
        })
      );
    }, [projectList]);

  const filteredSkills =
    useMemo(() => {
      const searchValue =
        search
          .toLowerCase()
          .trim();

      return skillsWithProjectCount.filter(
        (skill) => {
          const matchesCategory =
            selectedCategory ===
              "all" ||
            skill.category ===
              selectedCategory;

          const matchesSearch =
            !searchValue ||
            skill.name
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            skill.description
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            skill.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(
                    searchValue
                  )
            );

          return (
            matchesCategory &&
            matchesSearch
          );
        }
      );
    }, [
      selectedCategory,
      search,
      skillsWithProjectCount,
    ]);

  const groupedSkills =
    useMemo(() => {
      const groups = {};

      filteredSkills.forEach(
        (skill) => {
          if (!groups[skill.category]) {
            groups[skill.category] =
              [];
          }

          groups[
            skill.category
          ].push(skill);
        }
      );

      return groups;
    }, [filteredSkills]);

  const totalSkills =
    skills.length;

  const advancedSkills =
    skills.filter(
      (skill) =>
        skill.level ===
        "Advanced"
    ).length;

  const learningSkills =
    skills.filter(
      (skill) =>
        skill.level ===
        "Learning"
    ).length;

  const averageSkillLevel =
    Math.round(
      skills.reduce(
        (total, skill) =>
          total +
          skill.percentage,
        0
      ) / skills.length
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
          title="Skills"
          subtitle="Technologies and tools I work with"
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1600,
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
                  Skills &
                  Technologies
                </Typography>

                <Typography
                  sx={{
                    mt: 0.8,
                    fontSize: 13,
                    color:
                      "#737b89",
                  }}
                >
                  A snapshot of the
                  technologies I use
                  and the areas I am
                  currently developing.
                </Typography>
              </Box>

              <Button
                startIcon={
                  <AutoAwesomeRoundedIcon />
                }
                onClick={() =>
                  navigate(
                    "/projects"
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
                View Projects
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
                label: "Total Skills",
                value:
                  totalSkills,
                icon: (
                  <CodeRoundedIcon />
                ),
                description:
                  "Technologies in my stack",
              },
              {
                label: "Advanced",
                value:
                  advancedSkills,
                icon: (
                  <AutoAwesomeRoundedIcon />
                ),
                description:
                  "Strong working experience",
              },
              {
                label: "Currently Learning",
                value:
                  learningSkills,
                icon: (
                  <PsychologyRoundedIcon />
                ),
                description:
                  "Skills being developed",
              },
              {
                label: "Average Level",
                value: `${averageSkillLevel}%`,
                icon: (
                  <TrendingUpIcon />
                ),
                description:
                  "Overall skill progress",
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
                        {React.cloneElement(
                          stat.icon,
                          {
                            sx: {
                              fontSize: 20,
                            },
                          }
                        )}
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
                  placeholder="Search skills..."
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
                {skillCategories.map(
                  (
                    category
                  ) => {
                    const active =
                      selectedCategory ===
                      category.id;

                    return (
                      <Button
                        key={
                          category.id
                        }
                        onClick={() =>
                          setSelectedCategory(
                            category.id
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
                          category.label
                        }
                      </Button>
                    );
                  }
                )}
              </Box>
            </Box>
          </motion.div>

          {/* SKILLS */}

          {Object.keys(
            groupedSkills
          ).length > 0 ? (
            Object.entries(
              groupedSkills
            ).map(
              (
                [
                  category,
                  categorySkills,
                ],
                categoryIndex
              ) => (
                <motion.div
                  key={category}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration:
                      0.45,
                    delay:
                      0.3 +
                      categoryIndex *
                        0.08,
                  }}
                >
                  <Box
                    sx={{
                      mt: 4,
                    }}
                  >
                    {/* CATEGORY HEADER */}

                    <Box
                      sx={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 1.2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
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
                            "rgba(124,92,255,0.08)",
                          border:
                            "1px solid rgba(124,92,255,0.12)",
                        }}
                      >
                        {
                          categoryIcons[
                            category
                          ]
                        }
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: 17,
                            fontWeight:
                              800,
                          }}
                        >
                          {
                            categoryNames[
                              category
                            ]
                          }
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            fontSize: 10.5,
                            color:
                              "#606875",
                          }}
                        >
                          {
                            categorySkills.length
                          }{" "}
                          skills
                        </Typography>
                      </Box>
                    </Box>

                    {/* SKILL CARDS */}

                    <Grid
                      container
                      spacing={2}
                    >
                      {categorySkills.map(
                        (
                          skill,
                          index
                        ) => {
                          const levelStyle =
                            levelStyles[
                              skill.level
                            ];

                          return (
                            <Grid
                              key={
                                skill.name
                              }
                              size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                              }}
                            >
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
                                  duration:
                                    0.4,
                                  delay:
                                    index *
                                    0.05,
                                }}
                                whileHover={{
                                  y: -5,
                                }}
                              >
                                <Box
                                  sx={{
                                    height:
                                      "100%",
                                    p: 2.5,
                                    borderRadius: 4,
                                    backgroundColor:
                                      "rgba(255,255,255,0.025)",
                                    border:
                                      "1px solid rgba(255,255,255,0.07)",
                                    transition:
                                      "all 0.25s ease",
                                    "&:hover":
                                      {
                                        borderColor:
                                          "rgba(155,124,255,0.25)",
                                        boxShadow:
                                          "0 15px 35px rgba(0,0,0,0.2)",
                                      },
                                  }}
                                >
                                  {/* TOP */}

                                  <Box
                                    sx={{
                                      display:
                                        "flex",
                                      alignItems:
                                        "flex-start",
                                      justifyContent:
                                        "space-between",
                                      gap: 1,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display:
                                          "flex",
                                        alignItems:
                                          "center",
                                        gap: 1.2,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 45,
                                          height: 45,
                                          flexShrink:
                                            0,
                                          borderRadius:
                                            2.5,
                                          display:
                                            "flex",
                                          alignItems:
                                            "center",
                                          justifyContent:
                                            "center",
                                          color:
                                            "#c4b6ff",
                                          background:
                                            "linear-gradient(135deg, rgba(124,92,255,0.15), rgba(124,92,255,0.04))",
                                          border:
                                            "1px solid rgba(124,92,255,0.12)",
                                          fontSize:
                                            skill.icon.length >
                                            3
                                              ? 8
                                              : 13,
                                          fontWeight:
                                            850,
                                          letterSpacing:
                                            "-0.3px",
                                        }}
                                      >
                                        {
                                          skill.icon
                                        }
                                      </Box>

                                      <Box>
                                        <Typography
                                          sx={{
                                            fontSize: 14,
                                            fontWeight:
                                              750,
                                          }}
                                        >
                                          {
                                            skill.name
                                          }
                                        </Typography>

                                        <Chip
                                          label={
                                            skill.level
                                          }
                                          size="small"
                                          sx={{
                                            mt: 0.6,
                                            height: 20,
                                            color:
                                              levelStyle.color,
                                            backgroundColor:
                                              levelStyle.background,
                                            border:
                                              `1px solid ${levelStyle.border}`,
                                            fontSize: 8.5,
                                            fontWeight:
                                              700,
                                          }}
                                        />
                                      </Box>
                                    </Box>

                                    <Typography
                                      sx={{
                                        fontSize: 11,
                                        fontWeight:
                                          800,
                                        color:
                                          "#a48cff",
                                      }}
                                    >
                                      {
                                        skill.percentage
                                      }
                                      %
                                    </Typography>
                                  </Box>

                                  {/* DESCRIPTION */}

                                  <Typography
                                    sx={{
                                      mt: 2,
                                      minHeight: 45,
                                      fontSize: 10.5,
                                      lineHeight:
                                        1.6,
                                      color:
                                        "#777f8d",
                                    }}
                                  >
                                    {
                                      skill.description
                                    }
                                  </Typography>

                                  {/* PROGRESS */}

                                  <Box
                                    sx={{
                                      mt: 2,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        height: 5,
                                        borderRadius:
                                          10,
                                        overflow:
                                          "hidden",
                                        backgroundColor:
                                          "rgba(255,255,255,0.06)",
                                      }}
                                    >
                                      <motion.div
                                        initial={{
                                          width: 0,
                                        }}
                                        animate={{
                                          width: `${skill.percentage}%`,
                                        }}
                                        transition={{
                                          duration:
                                            0.8,
                                          delay:
                                            index *
                                            0.05,
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

                                  {/* TAGS */}

                                  <Box
                                    sx={{
                                      mt: 2,
                                      display:
                                        "flex",
                                      flexWrap:
                                        "wrap",
                                      gap: 0.7,
                                    }}
                                  >
                                    {skill.tags.map(
                                      (
                                        tag
                                      ) => (
                                        <Chip
                                          key={
                                            tag
                                          }
                                          label={
                                            tag
                                          }
                                          size="small"
                                          sx={{
                                            height: 24,
                                            color:
                                              "#777f8d",
                                            backgroundColor:
                                              "rgba(255,255,255,0.025)",
                                            border:
                                              "1px solid rgba(255,255,255,0.05)",
                                            fontSize: 8.5,
                                          }}
                                        />
                                      )
                                    )}
                                  </Box>

                                  {/* PROJECT COUNT */}

                                  <Box
                                    sx={{
                                      mt: 2,
                                      pt: 1.8,
                                      borderTop:
                                        "1px solid rgba(255,255,255,0.05)",
                                      display:
                                        "flex",
                                      alignItems:
                                        "center",
                                      justifyContent:
                                        "space-between",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: 9.5,
                                        color:
                                          "#565e6b",
                                      }}
                                    >
                                      Used in
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
                                        skill.projects
                                      }{" "}
                                      {skill.projects ===
                                      1
                                        ? "project"
                                        : "projects"}
                                    </Typography>
                                  </Box>
                                </Box>
                              </motion.div>
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </Box>
                </motion.div>
              )
            )
          ) : (
            /* EMPTY STATE */

            <Box
              sx={{
                mt: 5,
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
                No skills found
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
                term or category.
              </Typography>

              <Button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(
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
              delay: 0.55,
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
                  Want to see these skills
                  in action?
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 10.5,
                    color:
                      "#686f7c",
                  }}
                >
                  Explore the projects
                  where these technologies
                  are being used.
                </Typography>
              </Box>

              <Button
                endIcon={
                  <LanguageRoundedIcon
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

function TrendingUpIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 17L9 11L13 15L21 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M15 7H21V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}