import React from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const defaultProject = {
  name: "Project",
  category: "Development",
  status: "In Progress",
  progress: 0,
  description: "Project information will appear here.",
  technologies: [],
  gradient:
    "linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)",
};

export default function ProjectCard({
  project = defaultProject,
  delay = 0,
}) {
  const safeProject = {
    ...defaultProject,
    ...project,
  };

  const navigate = useNavigate();

  const handleViewProject = () => {
    if (
      safeProject.id === undefined ||
      safeProject.id === null
    ) {
      return;
    }

    navigate(
      `/projects/${encodeURIComponent(
        safeProject.id
      )}`
    );
  };

  return (
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
        duration: 0.5,
        delay,
      }}
      whileHover={{
        y: -6,
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: 4,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
          border: "1px solid rgba(255,255,255,0.07)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(155,124,255,0.35)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          },
        }}
      >
        {/* Project Preview */}
        <Box
          sx={{
            height: 175,
            position: "relative",
            overflow: "hidden",
            background: safeProject.gradient,
          }}
        >
          {/* Preview Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 30%, rgba(7,9,13,0.65) 100%)",
            }}
          />

          {/* Category */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
            }}
          >
            <Chip
              label={safeProject.category}
              size="small"
              sx={{
                height: 27,
                color: "#ffffff",
                backgroundColor: "rgba(0,0,0,0.32)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 10.5,
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Status */}
          <Box
            sx={{
              position: "absolute",
              bottom: 15,
              left: 18,
              right: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {safeProject.status}
            </Typography>

            <Typography
              sx={{
                color: "#ffffff",
                fontSize: 11,
                opacity: 0.8,
              }}
            >
              {safeProject.progress}% complete
            </Typography>
          </Box>
        </Box>

        {/* Project Information */}
        <Box
          sx={{
            p: 2.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.4px",
            }}
          >
            {safeProject.name}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 12.5,
              lineHeight: 1.7,
              color: "#7d8492",
              minHeight: 42,
            }}
          >
            {safeProject.description}
          </Typography>

          {/* Technologies */}
          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              mt: 2,
              flexWrap: "wrap",
              gap: 0.8,
            }}
          >
            {safeProject.technologies.map((technology) => (
              <Chip
                key={technology}
                label={technology}
                size="small"
                sx={{
                  height: 26,
                  color: "#aeb4c0",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 10.5,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(155,124,255,0.1)",
                    color: "#ffffff",
                    borderColor: "rgba(155,124,255,0.2)",
                  },
                }}
              />
            ))}
          </Stack>

          {/* View Project */}
          <Button
            onClick={handleViewProject}
            endIcon={
              <ArrowForwardRoundedIcon
                sx={{
                  fontSize: 16,
                }}
              />
            }
            sx={{
              mt: 2.5,
              p: 0,
              minWidth: 0,
              textTransform: "none",
              color: "#a48cff",
              fontSize: 12,
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#c1b4ff",
                "& .MuiButton-endIcon": {
                  transform: "translateX(4px)",
                },
              },
              "& .MuiButton-endIcon": {
                transition: "transform 0.2s ease",
              },
            }}
          >
            View Project
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}