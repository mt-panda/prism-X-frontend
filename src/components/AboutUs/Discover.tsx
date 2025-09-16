import React from "react";
import { Box, Grid, Typography, Button, useTheme } from "@mui/material";
import backgroundImage from "../../assets/images/About-Us-Header.jpeg";
import { Link } from "react-router-dom";

const Discover: React.FC = () => {
    const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        height: { lg: "550px", md: "500px", sm: "450px", xs: "450px" },
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        p: { lg: 10, md: 8, sm: 5, xs: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: { lg: 20, md: 15, sm: 5, xs: 2 },
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.focus,
            fontSize: { lg: "70px", md: "60px", sm: "50px", xs: "40px" },
            fontWeight: "400",
            lineHeight: "1",
            zIndex: 1,
            position: "relative",
            fontFamily: "cursive",
            mb: { lg: 2, md: 2, sm: 1, xs: 1 },
          }}
        >
          What do you want
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { lg: "70px", md: "60px", sm: "50px", xs: "40px" },
            fontWeight: "800",
            lineHeight: { lg: "75px", md: "65px", sm: "55px", xs: "45px" },
            color: theme.palette.primary.main,
            zIndex: 1,
            position: "relative",
            fontFamily: "Barlow",
            mb: { lg: 4, md: 3, sm: 2, xs: 2 },
          }}
        >
          Discover Great Local Businesses in USA
        </Typography>
        <Button
          sx={{
            position: "relative",
            background: theme.palette.primary.focus,
            color: theme.palette.primary.main,
            height: { lg: "64px", md: "50px", sm: "50px", xs: "40px" },
            px: { lg: 6, md: 5, sm: 4, xs: 3 },
            borderRadius: 1,
            width: "auto",
            marginTop: { lg: 5, md: 4, sm: 3, xs: 2 },
            "&:hover": {
              opacity: 0.9,
            },
            fontFamily: "Barlow",
            letterSpacing: "3px",
          }}
          component={Link}
          to="/listings"
        >
          Search
        </Button>
      </Box>
    </Grid>
  );
};

export default Discover;
