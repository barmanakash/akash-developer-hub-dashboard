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

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { motion } from "motion/react";

import {
    useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
    drawerWidth,
} from "../components/Sidebar";

const ACTIVITY_KEY =
    "akash_developer_activity";

function getActivities() {
    try {
        const stored =
            localStorage.getItem(
                ACTIVITY_KEY
            );

        if (!stored) {
            return [];
        }

        const parsed =
            JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed
            : [];
    } catch (error) {
        console.error(
            "Unable to read activity:",
            error
        );

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
        const activities =
            getActivities();

        const activity = {
            id: `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

            type,

            title,

            description,

            projectId,

            projectName,

            createdAt:
                new Date().toISOString(),
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
        console.error(
            "Unable to save activity:",
            error
        );

        return null;
    }
}

export function clearActivities() {
    try {
        localStorage.removeItem(
            ACTIVITY_KEY
        );

        window.dispatchEvent(
            new Event("activityUpdated")
        );
    } catch (error) {
        console.error(
            "Unable to clear activities:",
            error
        );
    }
}

const PROJECTS_KEY =
    "akash_developer_projects";

const activityFilters = [
    {
        id: "all",
        label: "All Activity",
    },
    {
        id: "added",
        label: "Added",
    },
    {
        id: "updated",
        label: "Updated",
    },
    {
        id: "deleted",
        label: "Deleted",
    },
];

const defaultActivities = [
    {
        id: "welcome-activity",
        type: "system",
        title: "Developer Hub initialized",
        description:
            "Your developer portfolio activity timeline is ready.",
        projectName: "",
        createdAt:
            new Date().toISOString(),
    },
];

function getStoredActivities() {
    try {
        const stored =
            localStorage.getItem(
                ACTIVITY_KEY
            );

        if (!stored) {
            return [];
        }

        const parsed =
            JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed
            : [];
    } catch (error) {
        console.error(
            "Unable to read activity:",
            error
        );

        return [];
    }
}

function getStoredProjects() {
    try {
        const stored =
            localStorage.getItem(
                PROJECTS_KEY
            );

        if (!stored) {
            return [];
        }

        const parsed =
            JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed
            : [];
    } catch (error) {
        console.error(
            "Unable to read projects:",
            error
        );

        return [];
    }
}

function getActivityIcon(type) {
    if (type === "added") {
        return (
            <AddCircleOutlineRoundedIcon />
        );
    }

    if (type === "updated") {
        return (
            <EditRoundedIcon />
        );
    }

    if (type === "deleted") {
        return (
            <DeleteOutlineRoundedIcon />
        );
    }

    return (
        <HistoryRoundedIcon />
    );
}

function getActivityColor(type) {
    if (type === "added") {
        return "#7ee6b2";
    }

    if (type === "updated") {
        return "#8db8ff";
    }

    if (type === "deleted") {
        return "#ff8e9e";
    }

    return "#a48cff";
}

function getActivityBackground(type) {
    if (type === "added") {
        return "rgba(80,190,140,0.08)";
    }

    if (type === "updated") {
        return "rgba(90,130,255,0.08)";
    }

    if (type === "deleted") {
        return "rgba(255,100,125,0.08)";
    }

    return "rgba(124,92,255,0.08)";
}

function formatActivityDate(
    dateValue
) {
    if (!dateValue) {
        return "Unknown date";
    }

    const date =
        new Date(dateValue);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Unknown date";
    }

    return date.toLocaleDateString(
        undefined,
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

function formatActivityTime(
    dateValue
) {
    if (!dateValue) {
        return "";
    }

    const date =
        new Date(dateValue);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }

    return date.toLocaleTimeString(
        undefined,
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}

function getRelativeTime(
    dateValue
) {
    if (!dateValue) {
        return "";
    }

    const date =
        new Date(dateValue);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }

    const difference =
        Date.now() -
        date.getTime();

    const seconds = Math.floor(
        difference / 1000
    );

    if (seconds < 60) {
        return "Just now";
    }

    const minutes = Math.floor(
        seconds / 60
    );

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

    return formatActivityDate(
        dateValue
    );
}

function createActivitiesFromProjects(
    projects
) {
    return projects
        .map((project) => ({
            id: `project-created-${project.id}`,
            type: "added",
            title: "Project added",
            description:
                `${project.name} was added to your project collection.`,
            projectName:
                project.name,
            projectId:
                project.id,
            createdAt:
                project.createdAt ||
                new Date().toISOString(),
        }))
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );
}

export default function Activity() {
    const navigate =
        useNavigate();

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
        activities,
        setActivities,
    ] = useState(() =>
        getStoredActivities()
    );

    const [
        projects,
        setProjects,
    ] = useState(() =>
        getStoredProjects()
    );

    const refreshActivity =
        () => {
            setActivities(
                getStoredActivities()
            );

            setProjects(
                getStoredProjects()
            );
        };

    useEffect(() => {
        refreshActivity();

        window.addEventListener(
            "storage",
            refreshActivity
        );

        window.addEventListener(
            "activityUpdated",
            refreshActivity
        );

        document.addEventListener(
            "visibilitychange",
            refreshActivity
        );

        return () => {
            window.removeEventListener(
                "storage",
                refreshActivity
            );

            window.removeEventListener(
                "activityUpdated",
                refreshActivity
            );

            document.removeEventListener(
                "visibilitychange",
                refreshActivity
            );
        };
    }, []);

    /*
     * If the activity log is empty,
     * create a basic activity list
     * from existing locally stored
     * projects.
     */

    const displayActivities =
        useMemo(() => {
            if (
                activities.length > 0
            ) {
                return activities;
            }

            if (
                projects.length > 0
            ) {
                return createActivitiesFromProjects(
                    projects
                );
            }

            return defaultActivities;
        }, [
            activities,
            projects,
        ]);

    const filteredActivities =
        useMemo(() => {
            const searchValue =
                search
                    .toLowerCase()
                    .trim();

            return displayActivities.filter(
                (activity) => {
                    const matchesFilter =
                        selectedFilter ===
                        "all" ||
                        activity.type ===
                        selectedFilter;

                    const matchesSearch =
                        !searchValue ||
                        activity.title
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        activity.description
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        activity.projectName
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            );

                    return (
                        matchesFilter &&
                        matchesSearch
                    );
                }
            );
        }, [
            displayActivities,
            selectedFilter,
            search,
        ]);

    const addedCount =
        displayActivities.filter(
            (activity) =>
                activity.type ===
                "added"
        ).length;

    const updatedCount =
        displayActivities.filter(
            (activity) =>
                activity.type ===
                "updated"
        ).length;

    const deletedCount =
        displayActivities.filter(
            (activity) =>
                activity.type ===
                "deleted"
        ).length;

    const totalActivity =
        displayActivities.length;

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
                    title="Activity"
                    subtitle="A timeline of changes across your developer hub"
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
                                    Activity
                                    Timeline
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.8,
                                        fontSize: 13,
                                        color:
                                            "#737b89",
                                    }}
                                >
                                    Keep track of
                                    changes and recent
                                    activity across your
                                    developer portfolio.
                                </Typography>
                            </Box>

                            <Button
                                startIcon={
                                    <FolderRoundedIcon />
                                }
                                endIcon={
                                    <ArrowForwardRoundedIcon />
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

                    {/* STATISTICS */}

                    <Grid
                        container
                        spacing={2.5}
                    >
                        {[
                            {
                                label:
                                    "Total Activity",
                                value:
                                    totalActivity,
                                icon: (
                                    <HistoryRoundedIcon />
                                ),
                                description:
                                    "Recorded portfolio events",
                            },
                            {
                                label: "Projects Added",
                                value:
                                    addedCount,
                                icon: (
                                    <AddCircleOutlineRoundedIcon />
                                ),
                                description:
                                    "Projects added to the hub",
                            },
                            {
                                label:
                                    "Projects Updated",
                                value:
                                    updatedCount,
                                icon: (
                                    <EditRoundedIcon />
                                ),
                                description:
                                    "Project modifications",
                            },
                            {
                                label:
                                    "Projects Deleted",
                                value:
                                    deletedCount,
                                icon: (
                                    <DeleteOutlineRoundedIcon />
                                ),
                                description:
                                    "Removed project records",
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
                                                {
                                                    stat.icon
                                                }
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
                                        md: 300,
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
                                    onChange={(
                                        event
                                    ) =>
                                        setSearch(
                                            event.target
                                                .value
                                        )
                                    }
                                    placeholder="Search activity..."
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
                                {activityFilters.map(
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

                    {/* TIMELINE */}

                    <Box
                        sx={{
                            mt: 4,
                            position:
                                "relative",
                        }}
                    >
                        {/* Timeline line */}

                        <Box
                            sx={{
                                position:
                                    "absolute",
                                left: {
                                    xs: 19,
                                    md: 25,
                                },
                                top: 25,
                                bottom: 25,
                                width: 1,
                                background:
                                    "linear-gradient(to bottom, rgba(124,92,255,0.35), rgba(124,92,255,0.03))",
                            }}
                        />

                        {filteredActivities.length >
                            0 ? (
                            filteredActivities.map(
                                (
                                    activity,
                                    index
                                ) => {
                                    const activityColor =
                                        getActivityColor(
                                            activity.type
                                        );

                                    const activityBackground =
                                        getActivityBackground(
                                            activity.type
                                        );

                                    return (
                                        <motion.div
                                            key={
                                                activity.id ||
                                                index
                                            }
                                            initial={{
                                                opacity: 0,
                                                x: -18,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                duration:
                                                    0.4,
                                                delay:
                                                    index *
                                                    0.06,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position:
                                                        "relative",
                                                    pl: {
                                                        xs: 5.5,
                                                        md: 7,
                                                    },
                                                    pb:
                                                        index ===
                                                            filteredActivities.length -
                                                            1
                                                            ? 0
                                                            : 2.5,
                                                }}
                                            >
                                                {/* Timeline dot */}

                                                <Box
                                                    sx={{
                                                        position:
                                                            "absolute",
                                                        left: {
                                                            xs: 7,
                                                            md: 13,
                                                        },
                                                        top: 18,
                                                        width: {
                                                            xs: 25,
                                                            md: 27,
                                                        },
                                                        height: {
                                                            xs: 25,
                                                            md: 27,
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
                                                            `1px solid ${activityColor}`,
                                                        color:
                                                            activityColor,
                                                        zIndex: 2,
                                                        boxShadow:
                                                            `0 0 0 5px ${activityBackground}`,
                                                    }}
                                                >
                                                    {React.cloneElement(
                                                        getActivityIcon(
                                                            activity.type
                                                        ),
                                                        {
                                                            sx: {
                                                                fontSize: 13,
                                                            },
                                                        }
                                                    )}
                                                </Box>

                                                {/* Activity card */}

                                                <Box
                                                    sx={{
                                                        p: {
                                                            xs: 2,
                                                            md: 2.5,
                                                        },
                                                        borderRadius: 4,
                                                        backgroundColor:
                                                            "rgba(255,255,255,0.025)",
                                                        border:
                                                            "1px solid rgba(255,255,255,0.065)",
                                                        transition:
                                                            "all 0.25s ease",
                                                        "&:hover":
                                                        {
                                                            borderColor:
                                                                "rgba(155,124,255,0.2)",
                                                            transform:
                                                                "translateY(-2px)",
                                                            boxShadow:
                                                                "0 14px 35px rgba(0,0,0,0.18)",
                                                        },
                                                    }}
                                                >
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
                                                        <Box>
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    gap: 1,
                                                                    flexWrap:
                                                                        "wrap",
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: {
                                                                            xs: 14,
                                                                            md: 15,
                                                                        },
                                                                        fontWeight:
                                                                            750,
                                                                    }}
                                                                >
                                                                    {
                                                                        activity.title
                                                                    }
                                                                </Typography>

                                                                <Chip
                                                                    label={
                                                                        activity.type ===
                                                                            "system"
                                                                            ? "System"
                                                                            : activity.type
                                                                    }
                                                                    size="small"
                                                                    sx={{
                                                                        height: 21,
                                                                        color:
                                                                            activityColor,
                                                                        backgroundColor:
                                                                            activityBackground,
                                                                        border:
                                                                            `1px solid ${activityColor}30`,
                                                                        fontSize: 8,
                                                                        fontWeight:
                                                                            700,
                                                                        textTransform:
                                                                            "capitalize",
                                                                    }}
                                                                />
                                                            </Box>

                                                            <Typography
                                                                sx={{
                                                                    mt: 0.7,
                                                                    fontSize: 10.5,
                                                                    lineHeight:
                                                                        1.6,
                                                                    color:
                                                                        "#747c89",
                                                                    maxWidth: 800,
                                                                }}
                                                            >
                                                                {
                                                                    activity.description
                                                                }
                                                            </Typography>

                                                            {activity.projectName ? (
                                                                <Box
                                                                    sx={{
                                                                        mt: 1.4,
                                                                        display:
                                                                            "inline-flex",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: 0.7,
                                                                        px: 1,
                                                                        py: 0.65,
                                                                        borderRadius:
                                                                            1.8,
                                                                        backgroundColor:
                                                                            "rgba(124,92,255,0.05)",
                                                                        border:
                                                                            "1px solid rgba(124,92,255,0.08)",
                                                                    }}
                                                                >
                                                                    <FolderRoundedIcon
                                                                        sx={{
                                                                            fontSize: 13,
                                                                            color:
                                                                                "#8e77df",
                                                                        }}
                                                                    />

                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 9,
                                                                            color:
                                                                                "#9289a9",
                                                                            fontWeight:
                                                                                650,
                                                                        }}
                                                                    >
                                                                        {
                                                                            activity.projectName
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            ) : null}
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                minWidth: {
                                                                    md: 125,
                                                                },
                                                                textAlign: {
                                                                    xs: "left",
                                                                    md: "right",
                                                                },
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                    {
                                                                        xs: "flex-start",
                                                                        md: "flex-end",
                                                                    },
                                                                    gap: 0.6,
                                                                }}
                                                            >
                                                                <AccessTimeRoundedIcon
                                                                    sx={{
                                                                        fontSize: 13,
                                                                        color:
                                                                            "#555d69",
                                                                    }}
                                                                />

                                                                <Typography
                                                                    sx={{
                                                                        fontSize: 9,
                                                                        color:
                                                                            "#626a77",
                                                                    }}
                                                                >
                                                                    {getRelativeTime(
                                                                        activity.createdAt
                                                                    )}
                                                                </Typography>
                                                            </Box>

                                                            <Typography
                                                                sx={{
                                                                    mt: 0.5,
                                                                    fontSize: 8.5,
                                                                    color:
                                                                        "#484f5b",
                                                                }}
                                                            >
                                                                {formatActivityDate(
                                                                    activity.createdAt
                                                                )}{" "}
                                                                ·{" "}
                                                                {formatActivityTime(
                                                                    activity.createdAt
                                                                )}
                                                            </Typography>
                                                        </Box>
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
                                <HistoryRoundedIcon
                                    sx={{
                                        fontSize: 42,
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
                                    No activity found
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
                                    term or activity
                                    filter.
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
                                    Keep building
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.5,
                                        fontSize: 10.5,
                                        color:
                                            "#686f7c",
                                    }}
                                >
                                    Add or update projects
                                    to keep your developer
                                    hub current.
                                </Typography>
                            </Box>

                            <Button
                                startIcon={
                                    <AddCircleOutlineRoundedIcon
                                        sx={{
                                            fontSize: 16,
                                        }}
                                    />
                                }
                                onClick={() =>
                                    navigate(
                                        "/projects/add"
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
                                Add Project
                            </Button>
                        </Box>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
}