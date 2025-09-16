import React from "react";
import { Grid } from "@mui/material";
import aboutBanner from "../assets/images/aboutBanner.avif";
import PageHeader from "../components/UI/PageHeader";
import Journey from "../components/AboutUs/Journey";
import Discover from "../components/AboutUs/Discover.tsx";
import AboutUsCard from "../components/AboutUs/AboutUsCard";
import Team from "../components/AboutUs/Team";

const About: React.FC = () => {
  return (
    <Grid>
      <PageHeader image={aboutBanner} page="About Us" />
      <Journey />
      <Discover />
      <AboutUsCard />
      <Team />
    </Grid>
  );
};

export default About;
