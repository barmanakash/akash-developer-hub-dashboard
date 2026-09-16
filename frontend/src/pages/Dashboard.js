import React, { useState } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";

import { drawerWidth } from "../components/Sidebar";

import { motion } from "motion/react";

const projects = [
  {
    id: 1,
    name: "AI Customer Support",
    category: "AI / Automation",
    status: "In Progress",
    progress: 72,
    description:
      "AI-powered customer support platform designed to automate common support workflows.",
    technologies: ["React", "FastAPI", "AI"],
    gradient:
      "linear-gradient(135deg, #31246b 0%, #5b3da8 50%, #1d163d 100%)",
  },
  {
    id: 2,
    name: "Coaching Management",
    category: "Full-Stack",
    status: "In Progress",
    progress: 58,
    description:
      "A complete platform for coaching institutes with teachers, students, resources and communication.",
    technologies: ["React", "FastAPI", "MongoDB"],
    gradient:
      "linear-gradient(135deg, #124b54 0%, #197278 50%, #0b292e 100%)",
  },
  {
    id: 3,
    name: "JPG to PNG Converter",
    category: "Frontend",
    status: "Completed",
    progress: 100,
    description:
      "A responsive image conversion tool with a clean interface and animated interactions.",
    technologies: ["React", "MUI", "Motion"],
    gradient:
      "linear-gradient(135deg, #663c1f 0%, #a86b36 50%, #332011 100%)",
  },
];

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileOpen(true);
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

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
                Keep track of everything you've built,
                the technologies you've used, and the
                projects you're currently working on.
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
                value="24"
                subtitle="Projects in your collection"
                icon={<FolderRoundedIcon />}
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
                value="06"
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
                value="08"
                subtitle="Projects available online"
                icon={<LanguageRoundedIcon />}
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
                value="18"
                subtitle="Technologies used across projects"
                icon={<CodeRoundedIcon />}
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
                A quick look at your latest work.
              </Typography>
            </Box>

            <Typography
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                fontSize: 12,
                color: "#9b7cff",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#c1b4ff",
                  transform: "translateX(2px)",
                },
              }}
            >
              View all projects →
            </Typography>
          </Box>

          {/* Projects */}
          <Grid
            container
            spacing={2.5}
          >
            {projects.map((project, index) => (
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
                  delay={0.15 + index * 0.1}
                />
              </Grid>
            ))}
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
              justifyContent: "space-between",
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