import React from "react";
import StyledHeader from "../components/Home/StyledHeader";
import mapBg from "../assets/images/bg-map.png";
import { Grid, Paper, Box, Typography, Container, useTheme } from "@mui/material";
import attachedBgColor from "../assets/images/bg-color.png";
import SectionIntro from "../components/Home/SectionIntro";
import CityCard from "../components/Home/CityCard";
import CategorySlider from "../components/Home/CategorySlider";
import FeaturedListing from "../components/Home/FeaturedListing";
import TestimonialSlider from "../components/Home/TestimonialSlider";
import ProcessInfo from "../components/Home/ProcessInfo";
import VideoSection from "../components/Home/VideoSection";
import attachedBgImg from "../assets/images/bg-10.jpg";
import bgMap2 from "../assets/images/bg-map-2.png";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Home: React.FC = () => {
  const theme = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <>
      <StyledHeader />
      <Box
        component="section"
        sx={{
          backgroundImage: `url(${mapBg})`,
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            lg={8.8}
            sx={{ marginLeft: "auto", marginRight: "auto", px: 28 }}
            component="div"
            {...({} as any)}
          >
            <Paper
              elevation={3}
              sx={{
                marginTop: "20px",
                padding: "0 82px",
                boxShadow: "0px 10px 60px 0px rgba(0,0,0,.05)",
                position: "relative",
                top: "-50px",
              }}
            >
              <CategorySlider />
            </Paper>
          </Grid>
        </Grid>

        <SectionIntro
          title="AROUND THE WORLD"
          subtitle="Worldwide Favorites"
          description="Experience the best of what your local offers."
        />

        <CityCard />

        {/* Free Listing Section */}
        <Box component="section" pt={9} pb={20}>
          <Box
            component="section"
            sx={{
              backgroundImage: `url(${attachedBgImg})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              padding: { xs: "3rem 0px 0rem 0", sm: "7rem 0px 0rem 0" },
              position: "relative",
              backgroundAttachment: "fixed",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${attachedBgColor})`,
                backgroundPosition: "50% -115px",
                backgroundRepeat: "no-repeat",
                opacity: 1,
                transition: "background .3s, border-radius .3s, opacity .3s",
                height: "100%",
                width: " 100%",
                top: 0,
                left: 0,
                position: "absolute",
              }}
            ></Box>
            <Container maxWidth="md">
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Sacramento",
                  color: theme.palette.primary.main,
                  fontSize: "70px",
                  position: "relative",
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                Totally Free{" "}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Barlow",
                  color: theme.palette.primary.main,
                  fontSize: { xs: "40px", sm: "60px", lg: "70px" },
                  position: "relative",
                  fontWeight: 800,
                  textAlign: "center",
                  lineHeight: { xs: "40px", sm: "70px", lg: "74px" },
                  marginTop: { xs: "0px", sm: "-16px" },
                }}
              >
                Zero Cost Business Listing with Techietribe
              </Typography>
            </Container>
            <Box
              component="section"
              sx={{ position: "relative", zIndex: 1, top: "7rem" }}
            >
              <Box
                component="section"
                sx={{
                  background: "white",
                  borderTop: "10px solid #1c9ac0",
                  borderTopRightRadius: "5px",
                  width: { md: "100%", lg: "87%" },
                }}
              >
                <Grid
                  container
                  spacing={0}
                  ref={ref}
                  justifyContent={"flex-end"}
                >
                  <Grid
                    item
                    xs={0}
                    lg={1.5}
                    component="div"
                    {...({} as any)}
                  ></Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2.9}
                    lg={2.6}
                    sx={{
                      borderRight: {
                        xs: "0px solid #dee2e8",
                        sm: "1px solid #dee2e8",
                      },
                      borderBottom: {
                        xs: "1px solid #dee2e8",
                        sm: "0px solid #dee2e8",
                      },
                      width: "22%",
                      marginTop: "10px",
                      paddingBottom: { xs: "3rem", sm: "0px" },
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
                        position: "relative",
                        fontWeight: 500,
                        textAlign: "center",
                        lineHeight: "72px",
                        paddingTop: { xs: "2rem", sm: "3rem", md: "5rem" },
                      }}
                    >
                      {inView && <CountUp end={8705} duration={2} />}
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{
                        fontFamily: "Barlow",
                        color: theme.palette.primary.hover,
                        fontSize: "16px",
                        position: "relative",
                        fontWeight: 400,
                        textAlign: "center",
                        lineHeight: "29px",
                      }}
                    >
                      Total Listings
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2.9}
                    lg={2.6}
                    sx={{
                      borderRight: {
                        xs: "0px solid #dee2e8",
                        sm: "1px solid #dee2e8",
                      },
                      borderBottom: {
                        xs: "1px solid #dee2e8",
                        sm: "0px solid #dee2e8",
                      },
                      width: "22%",
                      marginTop: "10px",
                      paddingBottom: { xs: "3rem", sm: "0px" },
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
                        position: "relative",
                        fontWeight: 500,
                        textAlign: "center",
                        lineHeight: "72px",
                        paddingTop: { xs: "2rem", sm: "3rem", md: "5rem" },
                      }}
                    >
                      {inView && <CountUp end={480} duration={2} />}
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{
                        fontFamily: "Barlow",
                        color: theme.palette.primary.hover,
                        fontSize: "16px",
                        position: "relative",
                        fontWeight: 400,
                        textAlign: "center",
                        lineHeight: "29px",
                      }}
                    >
                      Company Staff
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2.9}
                    lg={2.6}
                    sx={{
                      borderRight: {
                        xs: "0px solid #dee2e8",
                        sm: "1px solid #dee2e8",
                      },
                      borderBottom: {
                        xs: "1px solid #dee2e8",
                        sm: "0px solid #dee2e8",
                      },
                      width: "22%",
                      marginTop: "10px",
                      paddingBottom: { xs: "3rem", sm: "0px" },
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
                        position: "relative",
                        fontWeight: 500,
                        textAlign: "center",
                        lineHeight: "72px",
                        paddingTop: { xs: "2rem", sm: "3rem", md: "5rem" },
                      }}
                    >
                      {inView && <CountUp end={6260} duration={2} />}
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{
                        fontFamily: "Barlow",
                        color: theme.palette.primary.hover,
                        fontSize: "16px",
                        position: "relative",
                        fontWeight: 400,
                        textAlign: "center",
                        lineHeight: "29px",
                      }}
                    >
                      Places in the World
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2.9}
                    lg={2.6}
                    sx={{
                      marginTop: "10px",
                      width: "22%",
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
                        position: "relative",
                        fontWeight: 500,
                        textAlign: "center",
                        lineHeight: "72px",
                        paddingTop: { xs: "2rem", sm: "3rem", md: "5rem" },
                      }}
                    >
                      {inView && <CountUp end={9774} duration={2} />}
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{
                        fontFamily: "Barlow",
                        color: theme.palette.primary.hover,
                        fontSize: "16px",
                        position: "relative",
                        fontWeight: 400,
                        textAlign: "center",
                        lineHeight: "29px",
                      }}
                    >
                      Happy People
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <FeaturedListing />
      <Box
        component="section"
        sx={{
          backgroundColor: theme.palette.primary.main,
          backgroundImage: `url(${bgMap2})`,
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box py={5}>
          <SectionIntro
            title="OUR TESTIMONIALS"
            subtitle="What They Say"
            description="Techietribe Experts transformed your online presence, boosting traffic and conversions beyond your expectations with local business listings and directory."
          />
          <TestimonialSlider />
        </Box>
      </Box>
      <VideoSection />
      <ProcessInfo />
    </>
  );
};

export default Home;
