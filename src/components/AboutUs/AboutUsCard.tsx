import React from "react";
import { CardMedia, Grid, Typography, useTheme, Box } from "@mui/material";
import image from "../../assets/images/AboutUsCard.jpg";

const AboutUsCard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://redvisionexperts.com/wp-content/uploads/2020/10/bg-map-3.png)",
        backgroundPosition: "100% -10%",
        backgroundRepeat: "no-repeat",
        px: { lg: 10, md: 5, sm: 3, xs: 2 },
        py: { lg: 15, md: 10, sm: 8, xs: 5 },
        position: "relative",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left image */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{ position: "relative" }}
          component="div"
          {...({} as any)}
        >
          <CardMedia
            component="img"
            image={image}
            alt="About Techietribe Community"
            sx={{
              width: "91%",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />

          {/* Overlay Card */}
          <Box
            sx={{
              position: { md: "absolute", xs: "relative" },
              top: { md: "15%", xs: "20px" },
              left: { md: "64%", xs: "0" },
              bgcolor: theme.palette.common.white,
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              p: 12,
              width: { md: "100%", xs: "100%" },
              maxWidth: { md: "820px", xs: "100%" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { md: "48px", sm: "40px", xs: "20px" },
                fontWeight: "800",
                lineHeight: "1.2",
                textAlign: "left",
                color: theme.palette.primary.hero,
                mb: 5,
                fontFamily: "Barlow",
              }}
            >
              About Our Techietribe Community and Our Expertise
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: "left",
                lineHeight: "1.5",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                fontSize: { md: "18px", sm: "16px", xs: "12px" },
              }}
            >
              Techietribe transcends a typical directory, offering a lively
              marketplace in USA enriched with real feedback and advanced,
              user-friendly search features. We foster a thriving community
              where businesses excel through authentic connections and consumers
              make informed choices in USA.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUsCard;
