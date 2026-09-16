import React from "react";

import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
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

import { motion } from "motion/react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import projects from "../data/projects";

const STORAGE_KEY = "akash_developer_projects";

function getStoredProjects() {
    try {
        const storedProjects = localStorage.getItem(
            STORAGE_KEY
        );

        if (!storedProjects) {
            return [];
        }

        const parsedProjects =
            JSON.parse(storedProjects);

        return Array.isArray(parsedProjects)
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

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    //   const project = projects.find(
    //     (item) => item.id === id
    //   );

    const storedProjects = getStoredProjects();

    const allProjects = [
        ...storedProjects,
        ...projects,
    ];

    const project = allProjects.find(
        (item) => String(item.id) === String(id)
    );

    const [mobileOpen, setMobileOpen] =
        React.useState(false);

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
                    onClose={() => setMobileOpen(false)}
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
                            This project doesn't exist in your
                            collection.
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

                    {/* Hero Section */}
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

                            {/* Dark Overlay */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(90deg, rgba(7,9,13,0.82) 0%, rgba(7,9,13,0.3) 100%)",
                                }}
                            />

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
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {/* Category */}
                                <Box sx={{ mb: 2 }}>
                                    <Chip
                                        label={project.category}
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

                                {/* Title */}
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

                                {/* Description */}
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

                                {/* Meta */}
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
                                            alignItems: "center",
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
                                            alignItems: "center",
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

                    {/* Main Content */}
                    <Grid
                        container
                        spacing={3}
                        sx={{ mt: 0 }}
                    >
                        {/* Left */}
                        <Grid
                            size={{
                                xs: 12,
                                lg: 8,
                            }}
                        >
                            {/* About Project */}
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
                                    duration: 0.45,
                                    delay: 0.15,
                                }}
                            >
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
                            </motion.div>

                            {/* Features */}
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
                                    duration: 0.45,
                                    delay: 0.22,
                                }}
                            >
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
                                        {project.features.map(
                                            (feature, index) => (
                                                <Grid
                                                    key={feature}
                                                    size={{
                                                        xs: 12,
                                                        sm: 6,
                                                    }}
                                                >
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            x: -10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.25 +
                                                                index * 0.06,
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
                                                                    borderColor:
                                                                        "rgba(155,124,255,0.15)",
                                                                },
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: 12,
                                                                    color:
                                                                        "#b8bdc8",
                                                                    lineHeight: 1.5,
                                                                }}
                                                            >
                                                                {feature}
                                                            </Typography>
                                                        </Box>
                                                    </motion.div>
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Box>
                            </motion.div>

                            {/* Screenshots */}
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
                                    duration: 0.45,
                                    delay: 0.29,
                                }}
                            >
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
                                            {project.screenshots.length}{" "}
                                            images
                                        </Typography>
                                    </Box>

                                    {project.screenshots.length >
                                        0 ? (
                                        <Grid
                                            container
                                            spacing={2}
                                            sx={{ mt: 1 }}
                                        >
                                            {project.screenshots.map(
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
                                                            src={screenshot}
                                                            alt={`${project.name} screenshot ${index + 1
                                                                }`}
                                                            sx={{
                                                                width: "100%",
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
                                                                    borderColor:
                                                                        "rgba(155,124,255,0.3)",
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
                                                    color: "#8b929f",
                                                }}
                                            >
                                                Screenshots coming soon
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.6,
                                                    fontSize: 11,
                                                    color: "#5f6673",
                                                }}
                                            >
                                                Project UI screenshots
                                                will appear here.
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Right Sidebar */}
                        <Grid
                            size={{
                                xs: 12,
                                lg: 4,
                            }}
                        >
                            {/* Technologies */}
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
                                    duration: 0.45,
                                    delay: 0.2,
                                }}
                            >
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
                                        {project.technologies.map(
                                            (technology) => (
                                                <Chip
                                                    key={technology}
                                                    label={technology}
                                                    sx={{
                                                        height: 32,
                                                        color: "#c3c7d0",
                                                        backgroundColor:
                                                            "rgba(124,92,255,0.08)",
                                                        border:
                                                            "1px solid rgba(124,92,255,0.15)",
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        transition:
                                                            "all 0.2s ease",
                                                        "&:hover": {
                                                            color: "#ffffff",
                                                            backgroundColor:
                                                                "rgba(124,92,255,0.18)",
                                                            borderColor:
                                                                "rgba(124,92,255,0.3)",
                                                            transform:
                                                                "translateY(-2px)",
                                                        },
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                </Box>
                            </motion.div>

                            {/* Progress */}
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
                                    duration: 0.45,
                                    delay: 0.27,
                                }}
                            >
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
                                            alignItems: "center",
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
                                                delay: 0.4,
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
                            </motion.div>

                            {/* Links */}
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
                                    duration: 0.45,
                                    delay: 0.34,
                                }}
                            >
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
                                        disabled={!project.liveUrl}
                                        startIcon={
                                            <LanguageRoundedIcon />
                                        }
                                        endIcon={
                                            project.liveUrl ? (
                                                <ArrowForwardRoundedIcon />
                                            ) : null
                                        }
                                        onClick={() => {
                                            if (project.liveUrl) {
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
                                            textTransform: "none",
                                            color: project.liveUrl
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
                                                borderColor:
                                                    "rgba(124,92,255,0.25)",
                                            },
                                        }}
                                    >
                                        {project.liveUrl
                                            ? "View Live Project"
                                            : "Live Project Not Added"}
                                    </Button>

                                    <Button
                                        fullWidth
                                        disabled={!project.githubUrl}
                                        startIcon={
                                            <GitHubIcon />
                                        }
                                        endIcon={
                                            project.githubUrl ? (
                                                <ArrowForwardRoundedIcon />
                                            ) : null
                                        }
                                        onClick={() => {
                                            if (project.githubUrl) {
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
                                            textTransform: "none",
                                            color: project.githubUrl
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
                                                borderColor:
                                                    "rgba(255,255,255,0.15)",
                                            },
                                        }}
                                    >
                                        {project.githubUrl
                                            ? "View GitHub Repository"
                                            : "GitHub Repository Not Added"}
                                    </Button>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}