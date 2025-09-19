import React, { useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Modal,
  Button,
  useTheme,
  Fade,
  Slide,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/auth-context";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  role?: string;
  onLogout?: () => void;
  collapsed?: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  onClose,
  role = "Admin",
  onLogout,
  collapsed = false,
}: ProfileModalProps) => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        style: { backgroundColor: "transparent" },
      }}
    >
      <Fade in={open}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box
            data-testid="profile-modal"
            sx={{
              position: "absolute",
              bottom: 35,
              left: collapsed ? 120 : 31,
              background: "linear-gradient(to bottom, #378C92,#2D3239)",
              //   bgcolor: theme.palette.primary.main,
              opacity: 0.95,
              borderRadius: 3,
              width: { xs: 240, sm: 260, md: 280 },
              height: { xs: 300, sm: 340, md: 360 },
              //   boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
              textAlign: "center",
              overflow: "visible",
              p: 0,
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.24)",
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                // bgcolor: theme.palette.grey[300],
                color: theme.palette.grey[300],
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            {/* Circular Profile Image floating outside top */}
            <Avatar
              src="https://storyblok-cdn.photoroom.com/f/191576/1176x882/f95162c213/profile_picture_hero_before.webp"
              alt="Profile"
              sx={{
                width: 150,
                height: 150,
                mx: "auto",
                position: "absolute",
                top: -70,
                left: "50%",
                transform: "translateX(-50%)",
                border: "4px solid white",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              }}
            />

            {/* User Info */}
            <Box sx={{ p: 3, mt: 10, color: theme.palette.primary.main }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  fontFamily: "inherit",
                }}
              >
                Jason Williams
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                }}
              >
                admin@demo.com
              </Typography>

              {/* Show role under name only if Admin */}
              {role === "Admin" && (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.focus,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    fontFamily: "inherit",
                    mt: 1,
                  }}
                >
                  Admin
                </Typography>
              )}
            </Box>

            {/* Buttons fixed at bottom */}
            <Box sx={{ p: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: theme.palette.primary.hero,
                  color: theme.palette.primary.main,
                  opacity: 0.85,
                  ":hover": { opacity: 1 },
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  mb: 1,
                }}
                onClick={() => alert("Edit Profile clicked")}
              >
                Edit Profile
              </Button>

              <Button
                data-testid="logout-button"
                variant="contained"
                fullWidth
                sx={{
                  background: theme.palette.primary.focus,
                  color: theme.palette.primary.main,
                  opacity: 0.85,
                  ":hover": { opacity: 1 },
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                }}
                onClick={() => {
                  localStorage.clear();
                  auth.logout();
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Slide>
      </Fade>
    </Modal>
  );
};

export default ProfileModal;
