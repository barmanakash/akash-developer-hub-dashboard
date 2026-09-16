import React from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import { motion } from "motion/react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const STORAGE_KEY = "akash_developer_projects";

const gradientOptions = [
  {
    label: "Purple",
    value:
      "linear-gradient(135deg, #5429a8 0%, #17112e 100%)",
  },
  {
    label: "Teal",
    value:
      "linear-gradient(135deg, #087f86 0%, #071d20 100%)",
  },
  {
    label: "Orange",
    value:
      "linear-gradient(135deg, #a55c22 0%, #24170d 100%)",
  },
  {
    label: "Blue",
    value:
      "linear-gradient(135deg, #2457a6 0%, #0b1427 100%)",
  },
  {
    label: "Green",
    value:
      "linear-gradient(135deg, #23744c 0%, #0b2117 100%)",
  },
];

const initialForm = {
  name: "",
  category: "Full-Stack",
  status: "Completed",
  year: new Date().getFullYear().toString(),
  description: "",
  technologies: "",
  features: "",
  progress: 100,
  liveUrl: "",
  githubUrl: "",
  gradient: gradientOptions[0].value,
};

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.onload = () => {
        const maxWidth = 1600;
        const maxHeight = 1200;

        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height =
            height * (maxWidth / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width =
            width * (maxHeight / height);
          height = maxHeight;
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context =
          canvas.getContext("2d");

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        const compressedImage =
          canvas.toDataURL("image/jpeg", 0.82);

        resolve(compressedImage);
      };

      image.onerror = reject;
      image.src = event.target.result;
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export default function AddProject() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    React.useState(false);

  const [form, setForm] =
    React.useState(initialForm);

  const [screenshots, setScreenshots] =
    React.useState([]);

  const [errors, setErrors] =
    React.useState({});

  const [saving, setSaving] =
    React.useState(false);

  const [snackbar, setSnackbar] =
    React.useState({
      open: false,
      message: "",
      severity: "success",
    });

  const fileInputRef =
    React.useRef(null);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Project name is required.";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Project description is required.";
    }

    if (!form.technologies.trim()) {
      newErrors.technologies =
        "Add at least one technology.";
    }

    if (!form.features.trim()) {
      newErrors.features =
        "Add at least one feature.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleScreenshotUpload = async (
    event
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) {
      return;
    }

    const remainingSlots =
      6 - screenshots.length;

    if (remainingSlots <= 0) {
      setSnackbar({
        open: true,
        message:
          "You can upload a maximum of 6 screenshots.",
        severity: "warning",
      });

      return;
    }

    const selectedFiles =
      files.slice(0, remainingSlots);

    const validFiles =
      selectedFiles.filter((file) => {
        if (
          !file.type.startsWith("image/")
        ) {
          return false;
        }

        if (file.size > 8 * 1024 * 1024) {
          return false;
        }

        return true;
      });

    if (!validFiles.length) {
      setSnackbar({
        open: true,
        message:
          "Please select valid image files under 8MB each.",
        severity: "error",
      });

      return;
    }

    try {
      const convertedImages =
        await Promise.all(
          validFiles.map(async (file) => {
            return resizeImage(file);
          })
        );

      setScreenshots((previous) => [
        ...previous,
        ...convertedImages,
      ]);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          "Something went wrong while processing the images.",
        severity: "error",
      });
    }

    event.target.value = "";
  };

  const removeScreenshot = (index) => {
    setScreenshots((previous) =>
      previous.filter(
        (_, screenshotIndex) =>
          screenshotIndex !== index
      )
    );
  };

  const handleSave = () => {
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message:
          "Please complete the required fields.",
        severity: "error",
      });

      return;
    }

    setSaving(true);

    try {
      const existingProjects =
        JSON.parse(
          localStorage.getItem(
            STORAGE_KEY
          ) || "[]"
        );

      const newProject = {
        id: `${Date.now()}`,
        name: form.name.trim(),
        category: form.category,
        status: form.status,
        year: Number(form.year),
        description:
          form.description.trim(),
        technologies:
          form.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        features:
          form.features
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        progress: Number(form.progress),
        liveUrl: form.liveUrl.trim(),
        githubUrl: form.githubUrl.trim(),
        screenshots,
        gradient: form.gradient,
        createdAt:
          new Date().toISOString(),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([
          newProject,
          ...existingProjects,
        ])
      );

      setSnackbar({
        open: true,
        message:
          "Project added successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/projects");
      }, 900);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          "Unable to save the project. Your browser storage may be full.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
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
          title="Add Project"
          subtitle="Add a new project to your developer collection"
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1250,
            mx: "auto",
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            py: 4,
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
              duration: 0.4,
            }}
          >
            <Button
              startIcon={
                <ArrowBackRoundedIcon />
              }
              onClick={() =>
                navigate("/projects")
              }
              sx={{
                mb: 3,
                color: "#858c99",
                textTransform: "none",
                borderRadius: 2,
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

          {/* Form */}
          <Grid
            container
            spacing={3}
          >
            {/* Left Section */}
            <Grid
              size={{
                xs: 12,
                lg: 8,
              }}
            >
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
                  delay: 0.1,
                }}
              >
                <Box
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 3.5,
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
                      fontSize: 21,
                      fontWeight: 800,
                    }}
                  >
                    Project Information
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.7,
                      fontSize: 12,
                      color: "#6f7684",
                    }}
                  >
                    Tell people what you built
                    and what technologies you
                    used.
                  </Typography>

                  <Divider
                    sx={{
                      my: 3,
                      borderColor:
                        "rgba(255,255,255,0.07)",
                    }}
                  />

                  <Grid
                    container
                    spacing={2}
                  >
                    {/* Project Name */}
                    <Grid
                      size={{
                        xs: 12,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Project Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={Boolean(
                          errors.name
                        )}
                        helperText={
                          errors.name
                        }
                        placeholder="e.g. Coaching Management Platform"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>

                    {/* Category */}
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        select
                        fullWidth
                        label="Category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      >
                        <MenuItem value="Full-Stack">
                          Full-Stack
                        </MenuItem>

                        <MenuItem value="Frontend">
                          Frontend
                        </MenuItem>

                        <MenuItem value="Backend">
                          Backend
                        </MenuItem>

                        <MenuItem value="AI / Automation">
                          AI / Automation
                        </MenuItem>

                        <MenuItem value="RAG">
                          RAG
                        </MenuItem>

                        <MenuItem value="Other">
                          Other
                        </MenuItem>
                      </TextField>
                    </Grid>

                    {/* Status */}
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        select
                        fullWidth
                        label="Status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      >
                        <MenuItem value="Completed">
                          Completed
                        </MenuItem>

                        <MenuItem value="In Development">
                          In Development
                        </MenuItem>

                        <MenuItem value="Maintenance">
                          Maintenance
                        </MenuItem>

                        <MenuItem value="Paused">
                          Paused
                        </MenuItem>
                      </TextField>
                    </Grid>

                    {/* Year */}
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        type="number"
                        label="Year"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>

                    {/* Progress */}
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        type="number"
                        label="Progress (%)"
                        name="progress"
                        value={form.progress}
                        onChange={handleChange}
                        inputProps={{
                          min: 0,
                          max: 100,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>

                    {/* Description */}
                    <Grid
                      size={{
                        xs: 12,
                      }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        minRows={5}
                        label="Project Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        error={Boolean(
                          errors.description
                        )}
                        helperText={
                          errors.description ||
                          "Explain the project in a simple and professional way."
                        }
                        placeholder="Describe what this project does, what problem it solves, and your role in building it."
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>

                    {/* Technologies */}
                    <Grid
                      size={{
                        xs: 12,
                      }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="Technologies"
                        name="technologies"
                        value={
                          form.technologies
                        }
                        onChange={handleChange}
                        error={Boolean(
                          errors.technologies
                        )}
                        helperText={
                          errors.technologies ||
                          "Separate technologies using commas. Example: React, MUI, FastAPI, MongoDB"
                        }
                        placeholder="React, MUI, FastAPI, MongoDB"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>

                    {/* Features */}
                    <Grid
                      size={{
                        xs: 12,
                      }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        minRows={5}
                        label="Key Features"
                        name="features"
                        value={form.features}
                        onChange={handleChange}
                        error={Boolean(
                          errors.features
                        )}
                        helperText={
                          errors.features ||
                          "Write one feature per line."
                        }
                        placeholder={
                          "User authentication\nDashboard\nReal-time chat\nFile upload\nAdmin panel"
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>

                    {/* Live URL */}
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Live Project URL"
                        name="liveUrl"
                        value={form.liveUrl}
                        onChange={handleChange}
                        placeholder="https://your-project.com"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>

                    {/* Github */}
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="GitHub URL"
                        name="githubUrl"
                        value={
                          form.githubUrl
                        }
                        onChange={handleChange}
                        placeholder="https://github.com/..."
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={fieldStyles}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Section */}
            <Grid
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              {/* Gradient */}
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
                  delay: 0.18,
                }}
              >
                <Box
                  sx={{
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
                      fontSize: 17,
                      fontWeight: 750,
                    }}
                  >
                    Project Appearance
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.6,
                      fontSize: 11,
                      color: "#6f7684",
                    }}
                  >
                    Select the visual style
                    for your project card.
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, 1fr)",
                      gap: 1.2,
                    }}
                  >
                    {gradientOptions.map(
                      (option) => {
                        const selected =
                          form.gradient ===
                          option.value;

                        return (
                          <Box
                            key={option.label}
                            onClick={() =>
                              setForm(
                                (
                                  previous
                                ) => ({
                                  ...previous,
                                  gradient:
                                    option.value,
                                })
                              )
                            }
                            sx={{
                              height: 80,
                              borderRadius: 2.5,
                              cursor: "pointer",
                              position:
                                "relative",
                              overflow:
                                "hidden",
                              background:
                                option.value,
                              border: selected
                                ? "2px solid #9b7cff"
                                : "1px solid rgba(255,255,255,0.08)",
                              transition:
                                "all 0.25s ease",
                              "&:hover": {
                                transform:
                                  "translateY(-3px)",
                                borderColor:
                                  "#9b7cff",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                position:
                                  "absolute",
                                bottom: 8,
                                left: 10,
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              {
                                option.label
                              }
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                </Box>
              </motion.div>

              {/* Screenshot Upload */}
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
                  delay: 0.25,
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
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 17,
                          fontWeight: 750,
                        }}
                      >
                        Screenshots
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 11,
                          color: "#6f7684",
                        }}
                      >
                        Show people the UI you
                        built.
                      </Typography>
                    </Box>

                    <Chip
                      label={`${screenshots.length}/6`}
                      size="small"
                      sx={{
                        color: "#bdaeff",
                        backgroundColor:
                          "rgba(124,92,255,0.1)",
                        border:
                          "1px solid rgba(124,92,255,0.2)",
                        fontSize: 10,
                      }}
                    />
                  </Box>

                  <Box
                    component="label"
                    sx={{
                      mt: 2,
                      minHeight: 145,
                      borderRadius: 3,
                      border:
                        "1px dashed rgba(155,124,255,0.35)",
                      backgroundColor:
                        "rgba(124,92,255,0.04)",
                      display: "flex",
                      flexDirection:
                        "column",
                      alignItems: "center",
                      justifyContent:
                        "center",
                      cursor:
                        screenshots.length >=
                        6
                          ? "not-allowed"
                          : "pointer",
                      transition:
                        "all 0.25s ease",
                      "&:hover": {
                        backgroundColor:
                          "rgba(124,92,255,0.09)",
                        borderColor:
                          "rgba(155,124,255,0.65)",
                      },
                    }}
                  >
                    <CloudUploadRoundedIcon
                      sx={{
                        fontSize: 38,
                        color: "#8f75ee",
                      }}
                    />

                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      Upload Screenshots
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 10,
                        color: "#666d7a",
                        textAlign:
                          "center",
                      }}
                    >
                      PNG, JPG or WEBP
                      <br />
                      Maximum 6 images
                    </Typography>

                    <input
                      ref={fileInputRef}
                      hidden
                      multiple
                      type="file"
                      accept="image/*"
                      disabled={
                        screenshots.length >=
                        6
                      }
                      onChange={
                        handleScreenshotUpload
                      }
                    />
                  </Box>

                  {/* Preview */}
                  {screenshots.length >
                    0 && (
                    <Grid
                      container
                      spacing={1}
                      sx={{ mt: 1 }}
                    >
                      {screenshots.map(
                        (
                          screenshot,
                          index
                        ) => (
                          <Grid
                            key={index}
                            size={{
                              xs: 6,
                            }}
                          >
                            <Box
                              sx={{
                                position:
                                  "relative",
                                borderRadius: 2,
                                overflow:
                                  "hidden",
                                border:
                                  "1px solid rgba(255,255,255,0.08)",
                                aspectRatio:
                                  "16 / 10",
                                backgroundColor:
                                  "#0d1016",
                              }}
                            >
                              <Box
                                component="img"
                                src={
                                  screenshot
                                }
                                alt={`Screenshot ${
                                  index + 1
                                }`}
                                sx={{
                                  width:
                                    "100%",
                                  height:
                                    "100%",
                                  objectFit:
                                    "cover",
                                  display:
                                    "block",
                                }}
                              />

                              <IconButton
                                size="small"
                                onClick={() =>
                                  removeScreenshot(
                                    index
                                  )
                                }
                                sx={{
                                  position:
                                    "absolute",
                                  top: 5,
                                  right: 5,
                                  width: 27,
                                  height: 27,
                                  color:
                                    "#ffffff",
                                  backgroundColor:
                                    "rgba(0,0,0,0.65)",
                                  "&:hover": {
                                    backgroundColor:
                                      "rgba(220,60,80,0.85)",
                                  },
                                }}
                              >
                                <CloseRoundedIcon
                                  sx={{
                                    fontSize: 16,
                                  }}
                                />
                              </IconButton>
                            </Box>
                          </Grid>
                        )
                      )}
                    </Grid>
                  )}
                </Box>
              </motion.div>

              {/* Save */}
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
                  delay: 0.32,
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    <SaveRoundedIcon />
                  }
                  disabled={saving}
                  onClick={handleSave}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 750,
                    background:
                      "linear-gradient(135deg, #7657e8, #9b7cff)",
                    boxShadow:
                      "0 10px 30px rgba(124,92,255,0.18)",
                    transition:
                      "all 0.25s ease",
                    "&:hover": {
                      transform:
                        "translateY(-2px)",
                      background:
                        "linear-gradient(135deg, #8468ef, #a98cff)",
                      boxShadow:
                        "0 15px 35px rgba(124,92,255,0.28)",
                    },
                  }}
                >
                  {saving
                    ? "Saving Project..."
                    : "Save Project"}
                </Button>
              </motion.div>

              {/* Information */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 3,
                  backgroundColor:
                    "rgba(255,255,255,0.02)",
                  border:
                    "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems:
                      "flex-start",
                  }}
                >
                  <AddPhotoAlternateRoundedIcon
                    sx={{
                      fontSize: 17,
                      color: "#8270d8",
                      mt: 0.2,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 10,
                      lineHeight: 1.6,
                      color: "#626977",
                    }}
                  >
                    Screenshots are resized
                    before being stored locally
                    in your browser. We'll move
                    this to proper backend storage
                    when we build the FastAPI
                    backend.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() =>
          setSnackbar((previous) => ({
            ...previous,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar((previous) => ({
              ...previous,
              open: false,
            }))
          }
          sx={{
            borderRadius: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const fieldStyles = {
  "& .MuiInputBase-root": {
    color: "#ffffff",
    backgroundColor:
      "rgba(255,255,255,0.025)",
    borderRadius: 2.5,
    fontSize: 13,
  },

  "& .MuiInputLabel-root": {
    color: "#777e8c",
    fontSize: 13,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#9b7cff",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor:
      "rgba(255,255,255,0.08)",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor:
      "rgba(155,124,255,0.35)",
  },

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#8c70ee",
      borderWidth: 1,
    },

  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    color: "#626977",
    fontSize: 10,
  },
};