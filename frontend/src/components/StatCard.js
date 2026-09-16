import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "motion/react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay,
      }}
      whileHover={{
        y: -5,
      }}
      style={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          minHeight: 150,
          p: 2.5,
          borderRadius: 4,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.16)",
          transition: "all 0.3s ease",
          cursor: "default",
          "&:hover": {
            borderColor: "rgba(155,124,255,0.35)",
            boxShadow: "0 18px 45px rgba(0,0,0,0.25)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#818896",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: iconColor,
              backgroundColor: `${iconColor}14`,
              border: `1px solid ${iconColor}22`,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 2,
            fontSize: 32,
            fontWeight: 800,
            lineHeight: 1,
            color: "#ffffff",
            letterSpacing: "-1px",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 1.2,
            fontSize: 11,
            color: "#666d7a",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </motion.div>
  );
}