import React from "react";
import { Grid, Typography, Stack, styled, useTheme } from "@mui/material";
import Image from "../../assets/images/home/heroBanner.jpg";
import { keyframes } from "@emotion/react";
import Arrow from "../../assets/images/line-arrow.png";
import HomeSearch from "../Home/HomeSearch";

const fadeInBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledHeader = styled(Grid)(({ theme }) => ({
    width: "100%",
  backgroundImage: `url(${Image})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  position: "relative",
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
  animation: `${fadeInBottom} 3s ease`,
  "&::after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.primary.hero,
    opacity: "0.4",
  },
  [theme.breakpoints.down("sm")]: {
    backgroundPosition: "center",
    minHeight: "70vh",
  },
}));
export const StyledHeaderItem = styled(Grid)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  zIndex: 1,
  color: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

export const StyledHeading = styled(Typography)(({ theme }) => ({
  fontSize: "46px",
    fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    fontSize: "26px",
  },
}));
export const StyledSubHeading = styled(Typography)(({ theme }) => ({
  fontFamily: "Sacramento",
  fontSize: "70px",
  fontWeight: 400,
  textTransform: "none",
  position: "relative",
  zIndex: 1,
  lineHeight: 1,
  color: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    fontSize: "26px",
  },
}));
export const CategoryHeading = styled(Typography)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  marginLeft: "auto",
  marginRight: "auto",
  fontFamily: "Sacramento",
  fontSize: "20px",
  fontWeight: 400,
  textTransform: "none",
  lineHeight: 1,
  color: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    fontSize: "26px",
  },
  "&&::before": {
    content: '""',
    width: "64px",
    height: "110px",
    position: "absolute",
    bottom: "90%",
    left: "-85px",
    background: `url(${Arrow}) no-repeat center center transparent`,
    backgroundSize: "contain",
    zIndex: -1,
  },
}));

const StyledHader: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container component="div" {...({} as any)}>
        <StyledHeader mt={{ xs: 0, md: 0 }}>
          <StyledHeaderItem
            px={{ xs: 4, md: 12 }}
            pt={{ xs: 22 }}
            pb={{ xs: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StyledSubHeading
              sx={{
                fontSize: { xs: "30px", sm: "68px" },
                lineHeight: { xs: "3rem", sm: "5rem" },
                textAlign: { xs: "center" },
                color: theme.palette.primary.focus,
              }}
            >
              Explore the
            </StyledSubHeading>
            <StyledHeading
              sx={{
                fontSize: { xs: "30px", sm: "80px" },
                lineHeight: { xs: "3rem", sm: "5rem" },
                textAlign: { xs: "center" },
                fontWeight: 800,
                fontFamily: "Barlow",
              }}
            >
              {" "}
              Best in Your City
            </StyledHeading>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "12px", sm: "16px" },
                textAlign: { xs: "center" },
                fontWeight: 400,
                marginY: "8px",
                wordWrap: "break-word",
                px: { sm: "10rem" },
                pt: { sm: "2rem" },
              }}
            >
              Discover top-rated local businesses, from restaurants and
              nightlife to home services and professionals, right in your
              neighborhood with our business listings.
            </Typography>
            <HomeSearch />

            <Stack alignItems={{ xs: "center", md: "flex-start" }}>
              <CategoryHeading
                sx={{
                  fontSize: { xs: "30px", sm: "40px" },
                  lineHeight: { xs: "3rem", sm: "5rem" },
                  textAlign: { xs: "center" },
                  mt: { xs: "4rem", sm: "10rem" },
                }}
              >
                Dive into Popular Categories{" "}
              </CategoryHeading>
            </Stack>
          </StyledHeaderItem>
        </StyledHeader>
      </Grid>
    </>
  );
};

export default StyledHader;
