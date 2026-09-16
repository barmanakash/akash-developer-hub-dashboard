import React from "react";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  {
    label: "Dashboard",
    icon: <DashboardRoundedIcon />,
    path: "/",
  },
  {
    label: "Projects",
    icon: <FolderRoundedIcon />,
    path: "/projects",
  },
  {
    label: "Skills",
    icon: <CodeRoundedIcon />,
    path: "/skills",
  },
  {
    label: "Experience",
    icon: <WorkRoundedIcon />,
    path: "/experience",
  },
  {
    label: "Activity",
    icon: <TimelineRoundedIcon />,
    path: "/activity",
  },
  {
    label: "Documents",
    icon: <DescriptionRoundedIcon />,
    path: "/documents",
  },
];

function SidebarContent({ onClose }) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0b0d12",
        color: "#ffffff",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 76,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom:
            "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            AKASH
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#8d93a1",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Developer Hub
          </Typography>
        </Box>

        <Box
          onClick={onClose}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            width: 34,
            height: 34,
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#9ca3af",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor:
                "rgba(255,255,255,0.07)",
              color: "#ffffff",
            },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </Box>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          px: 2,
          pt: 3,
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            fontSize: 10,
            fontWeight: 700,
            color: "#666d7a",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Workspace
        </Typography>

        <List disablePadding>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                x: -12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            >
              <NavLink
                to={item.path}
                onClick={onClose}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      mb: 0.5,
                      px: 1.5,
                      borderRadius: 2.5,
                      color: isActive
                        ? "#ffffff"
                        : "#8d93a1",
                      backgroundColor: isActive
                        ? "rgba(124,92,255,0.14)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(124,92,255,0.22)"
                        : "1px solid transparent",
                      transition:
                        "all 0.25s ease",
                      "&:hover": {
                        backgroundColor:
                          isActive
                            ? "rgba(124,92,255,0.18)"
                            : "rgba(255,255,255,0.05)",
                        color: "#ffffff",
                        transform:
                          "translateX(3px)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive
                          ? "#9b7cff"
                          : "#747b89",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: isActive
                          ? 600
                          : 500,
                      }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            </motion.div>
          ))}
        </List>
      </Box>

      {/* Bottom */}
      <Box
        sx={{
          mt: "auto",
          px: 2,
          pb: 2,
        }}
      >
        <Divider
          sx={{
            mb: 2,
            borderColor:
              "rgba(255,255,255,0.07)",
          }}
        />

        <ListItemButton
          sx={{
            minHeight: 48,
            px: 1.5,
            borderRadius: 2.5,
            color: "#8d93a1",
            transition: "all 0.25s ease",
            "&:hover": {
              backgroundColor:
                "rgba(255,255,255,0.05)",
              color: "#ffffff",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "#747b89",
            }}
          >
            <SettingsRoundedIcon />
          </ListItemIcon>

          <ListItemText
            primary="Settings"
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 500,
            }}
          />
        </ListItemButton>

        <Box
          sx={{
            mt: 2,
            px: 1.5,
            py: 1.5,
            borderRadius: 2.5,
            backgroundColor:
              "rgba(255,255,255,0.035)",
            border:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: "#666d7a",
              mb: 0.5,
            }}
          >
            PROJECT COLLECTION
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#d7d9df",
              fontWeight: 600,
            }}
          >
            Your work, organized.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function Sidebar({
  mobileOpen,
  onClose,
}) {
  return (
    <>
      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: "#0b0d12",
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: "#0b0d12",
          },
        }}
      >
        <SidebarContent onClose={onClose} />
      </Drawer>
    </>
  );
}

export { drawerWidth };