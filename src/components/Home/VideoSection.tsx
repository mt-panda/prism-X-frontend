import React, { useState } from "react";
import { Box, Typography, Container, CardMedia, Modal, useTheme } from "@mui/material";
import SectionIntro from "./SectionIntro";
import backgroundImage from "../../assets/images/bg-1.png";
import videoImage from "../../assets/images/chicago-city-skyline-usa-2022-01-19-00-13-14-utc-1.jpg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "auto",
    md: 800,
  },
  border: "none",
};

const VideoSection: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <>
      <style>
        {`
          @keyframes pulse-border {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }

          @keyframes pulse-border-2 {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}
      </style>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          pt: "2rem",
          pb: "5rem",
        }}
      >
        <SectionIntro
          title="LET'S FIND OUT"
          subtitle="How It Works"
          subtitleColor="primary.main"
          description="How It Works Making the most of our directory is as simple as one-two-three. Here's how you can uncover all the local treasures in your community"
        />
        <Container maxWidth="lg">
          <Box className="videoConent" sx={{ position: "relative" }}>
            <Box className="cardImage">
              <CardMedia
                component="img"
                height="auto"
                image={videoImage}
                sx={{ cursor: "pointer" }}
              />
            </Box>
            <Box
              className="videoContent"
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                marginTop: "-42px",
                textAlign: "center",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "20px", sm: "38px" },
                  lineHeight: "39px",
                  fontFamily: "Sacramento",
                  color: theme.palette.primary.main,
                  textAlign: "center",
                  fontWeight: "400",
                  margin: "auto 0px",
                }}
              >
                Watch How
              </Typography>
              <Box
                onClick={handleOpen}
                sx={{
                  margin: "0 30px",
                  position: "relative",
                  display: "inline-block",
                  fontSize: "24px",
                  color: theme.palette.primary.focus,
                  background: theme.palette.primary.main,
                  textAlign: "center",
                  transition: "all .35s",
                  width: { xs: "64px", sm: "84px" },
                  height: { xs: "64px", sm: "84px" },
                  borderRadius: "50%",
                  lineHeight: "84px",
                  cursor: "pointer",
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    border: "1px solid #primary.main",
                    opacity: 0,
                    borderRadius: "50%",
                    animation: "pulse-border-2 1.5s linear infinite",
                  },
                  "&::after": {
                    position: "absolute",
                    content: "''",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    border: "1px solid primary.main",
                    opacity: 0,
                    borderRadius: "50%",
                    animation: "pulse-border 1s linear infinite",
                  },
                }}
              >
                <PlayArrowIcon
                  sx={{
                    fontSize: { xs: "30px", sm: "50px" },
                    margin: "auto",
                    display: "flex",
                    marginTop: "19px",
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "20px", sm: "38px" },
                  lineHeight: "39px",
                  fontFamily: "Sacramento",
                  color: theme.palette.primary.main,
                  textAlign: "center",
                  fontWeight: "400",
                  margin: "auto 0px",
                }}
              >
                listing works
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <video width="100%" controls>
            <source
              src="https://axtra.wealcoder.com/wp-content/uploads/2022/12/video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Modal>
    </>
  );
};

export default VideoSection;
