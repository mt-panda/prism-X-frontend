import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";

const Journey: React.FC = () => {
    const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center left",
        textAlign: "center",
        width: "100%",
        justifyContent: "center",
        py: 10,
        px: { md: 44, sm: 20, xs: 5 },
      }}
    >
      <Typography
        sx={{
          color: theme.palette.primary.focus,
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "3px",
          textAlign: "center",
          fontFamily: "Barlow",
        }}
      >
        GET TO KNOW ABOUT US
      </Typography>
      <Typography
        sx={{
          fontSize: "46px",
          fontWeight: "800",
          lineHeight: "1",
          color: theme.palette.primary.hover,
          mb: "10px",
          textAlign: "center",
          fontFamily: "Barlow",
        }}
      >
        Techietribe&apos;s Inspiring Journey
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "500",
          color: theme.palette.text.secondary,
          textAlign: "center",
          lineHeight: "1.8",
        }}
      >
        Techietribe reignites community bonds by simplifying the discovery of
        authentic local services in the digital age&apos;s maze. Our platform is
        a haven for interaction and advocacy for top-tier local businesses
        across the USA.
      </Typography>
    </Grid>
  );
};

export default Journey;
