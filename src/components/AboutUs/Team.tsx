import React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import bgMap2 from "../../assets/images/bg-map-2.png";
import SectionIntro from "../Home/SectionIntro";
import TestimonialSlider from "../Home/TestimonialSlider";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Team: React.FC = () => {
    const theme = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.palette.common.white,
        backgroundImage: `url(${bgMap2})`,
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
        mt: { sm: "100px", xs: "80px" },
        pt: "150px",
        position: "relative",
      }}
    >
      <Grid
        container
        ref={ref}
        sx={{
          bgcolor: theme.palette.common.white,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mx: { md: 20, sm: 5, xs: 0 },
          width: { lg: "80%", md: "70%", sm: "90%", xs: "auto" },
          borderTop: `10px solid ${theme.palette.primary.focus}`,
          borderRadius: "5px",
          py: 8,
          height: "auto",
          position: { md: "absolute", xs: "relative" },
          top: "-80px",
        }}
      >
        {/* Total Listings */}
        <Grid
          item
          xs={12}
          sm={3}
          lg={3}
          sx={{
            borderRight: {
              xs: `0px solid ${theme.palette.common.white}`,
              sm: `1px solid ${theme.palette.common.white}`,
            },
            borderBottom: {
              xs: `1px solid ${theme.palette.common.white}`,
              sm: `0px solid ${theme.palette.common.white}`,
            },
            mt: "10px",
            pb: { xs: "3rem", sm: "0px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "22.5%",
          }}
          component="div"
          {...({} as any)}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.primary.hover,
              fontSize: { xs: "30px", sm: "40px", md: "60px" },
              fontWeight: 500,
              lineHeight: "72px",
            }}
          >
            {inView && <CountUp end={8705} duration={2} />}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.primary.hover,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "29px",
            }}
          >
            Total Listings
          </Typography>
        </Grid>

        {/* Company Staff */}
        <Grid
          item
          xs={12}
          sm={3}
          lg={3}
          sx={{
            width: "22.5%",
            borderRight: {
              xs: `0px solid ${theme.palette.common.white}`,
              sm: `1px solid ${theme.palette.common.white}`,
            },
            borderBottom: {
              xs: `1px solid ${theme.palette.common.white}`,
              sm: `0px solid ${theme.palette.common.white}`,
            },
            mt: "10px",
            pb: { xs: "3rem", sm: "0px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
          component="div"
          {...({} as any)}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.primary.hover,
              fontSize: { xs: "30px", sm: "40px", md: "60px" },
              fontWeight: 500,
              lineHeight: "72px",
            }}
          >
            {inView && <CountUp end={480} duration={2} />}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.text.secondary,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "29px",
            }}
          >
            Company Staff
          </Typography>
        </Grid>

        {/* Places in the World */}
        <Grid
          item
          xs={12}
          sm={3}
          lg={3}
          sx={{
            width: "22.5%",
            borderRight: {
              xs: `0px solid ${theme.palette.common.white}`,
              sm: `1px solid ${theme.palette.common.white}`,
            },
            borderBottom: {
              xs: `1px solid ${theme.palette.common.white}`,
              sm: `0px solid ${theme.palette.common.white}`,
            },
            mt: "10px",
            pb: { xs: "3rem", sm: "0px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
          component="div"
          {...({} as any)}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.primary.hover,
              fontSize: { xs: "30px", sm: "40px", md: "60px" },
              fontWeight: 500,
              lineHeight: "72px",
            }}
          >
            {inView && <CountUp end={6260} duration={2} />}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.text.secondary,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "29px",
            }}
          >
            Places in the World
          </Typography>
        </Grid>

        {/* Happy People */}
        <Grid
          item
          xs={12}
          sm={3}
          lg={3}
          sx={{
            width: "22.5%",
            mt: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
          component="div"
          {...({} as any)}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.primary.hover,
              fontSize: { xs: "30px", sm: "40px", md: "60px" },
              fontWeight: 500,
              lineHeight: "72px",
            }}
          >
            {inView && <CountUp end={9774} duration={2} />}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Barlow",
              color: theme.palette.text.secondary,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "29px",
            }}
          >
            Happy People
          </Typography>
        </Grid>
      </Grid>

      {/* Section Intro + Slider */}
      <Box py={5}>
        <SectionIntro
          title="PROFESSIONAL PEOPLE"
          subtitle="Meet the team"
          description="At Techietribe LLC, our team excels in digital marketing, propelling your success in the online world."
        />
        <TestimonialSlider />
      </Box>
    </Box>
  );
};

export default Team;
