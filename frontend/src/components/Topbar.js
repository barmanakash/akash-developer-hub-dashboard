import React from "react";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import { motion } from "motion/react";

export default function Topbar({
  onMenuClick,
  title = "Dashboard",
  subtitle = "Your development journey at a glance",
}) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor:
          "rgba(9, 11, 16, 0.88)",
        backdropFilter: "blur(16px)",
        borderBottom:
          "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "76px !important",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          gap: 2,
        }}
      >
        {/* Mobile Menu */}
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            color: "#ffffff",
            borderRadius: 2,
            "&:hover": {
              backgroundColor:
                "rgba(255,255,255,0.06)",
            },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>

        {/* Page Title */}
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 17,
                sm: 19,
              },
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.4px",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              fontSize: 12,
              color: "#777e8c",
              mt: 0.3,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Search */}
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
            width: {
              sm: 180,
              md: 240,
            },
            height: 40,
            px: 1.5,
            borderRadius: 2.5,
            backgroundColor:
              "rgba(255,255,255,0.04)",
            border:
              "1px solid rgba(255,255,255,0.07)",
            transition: "all 0.25s ease",
            "&:focus-within": {
              borderColor:
                "rgba(155,124,255,0.55)",
              backgroundColor:
                "rgba(255,255,255,0.06)",
            },
          }}
        >
          <SearchRoundedIcon
            sx={{
              fontSize: 19,
              color: "#707786",
              mr: 1,
            }}
          />

          <InputBase
            placeholder="Search projects..."
            sx={{
              flex: 1,
              color: "#ffffff",
              fontSize: 12.5,
              "& input::placeholder": {
                color: "#666d7a",
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Notification */}
        <motion.div
          whileHover={{
            scale: 1.06,
          }}
          whileTap={{
            scale: 0.94,
          }}
        >
          <IconButton
            sx={{
              width: 40,
              height: 40,
              color: "#9ca3af",
              borderRadius: 2.5,
              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.05)",
                color: "#ffffff",
              },
            }}
          >
            <Badge
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#9b7cff",
                  boxShadow:
                    "0 0 0 2px #090b10",
                },
              }}
            >
              <NotificationsNoneRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </motion.div>

        {/* Profile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            pl: {
              xs: 0,
              sm: 1,
            },
            cursor: "pointer",
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              fontSize: 13,
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #7c5cff 0%, #4c35a8 100%)",
              border:
                "2px solid rgba(255,255,255,0.1)",
            }}
          >
            AB
          </Avatar>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              Akash Barman
            </Typography>

            <Typography
              sx={{
                fontSize: 10.5,
                color: "#6f7684",
                mt: 0.3,
              }}
            >
              Developer
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}