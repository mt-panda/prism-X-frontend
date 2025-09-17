import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  CircularProgress,
  useTheme,
} from "@mui/material";
import bgShape from "../../assets/images/bg-shape.png";
import DefaultImg from "../../assets/images/placeholder.png";
import SectionIntro from "../Home/SectionIntro";
import { Link } from "react-router-dom";
import { useListings } from "../../context/ListingsContext";
import axios from "axios";

interface Listing {
  id: string | number;
  title: string;
  desc: string;
  image?: string;
  featured?: boolean;
}

function truncateTitle(title: string): string {
  return title.length > 30 ? title.substring(0, 30) + "..." : title;
}

function truncateDesc(desc: string): string {
  return desc.length > 70 ? desc.substring(0, 70) + "..." : desc;
}

const FeaturedListing: React.FC = () => {
  const theme = useTheme();
  const { listings, loading, error, fetchListings } = useListings();

  useEffect(() => {
    fetchListings(1, 20); 
  }, []);

  console.log("Latest Places: ", listings);

  const featuredListings = listings
    .filter((l) => Boolean(l.featured))
    .slice(0, 3);
  console.log("featuredListings", featuredListings);

  return (
    <Box
      component="section"
      sx={{
        backgroundImage: `url(${bgShape})`,
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
        marginTop: "7rem",
        marginBottom: "7rem",
        px: { md: 0, sm: 0, xs: 3 },
      }}
    >
      <Box pt={5}>
        <SectionIntro
          title="EXCLUSIVE RECOMMENDATIONS"
          subtitle="Featured Listings"
          description={
            loading
              ? ""
              : error
              ? ""
              : "Browse through our featured business listings, a selection of businesses that are loved by locals and recommended by experts."
          }
        />
      </Box>
      <Container maxWidth="lg">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
          >
            <Typography fontSize={"16px"} color="error" gutterBottom>
              Error loading featured listings.
            </Typography>
          </Box>
        ) : featuredListings.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
          >
            <Typography fontSize={"25px"} color="primary.hover" gutterBottom>
              No featured listings found.
            </Typography>
          </Box>
        ) : (
          <Grid spacing={2} container>
            {featuredListings.map((item) => (
              <Grid
                key={item.id}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ padding: { xs: "5px", sm: "9px", md: "0px" } }}
                component="div"
                {...({} as any)}
              >
                <Link
                  to={`/listings/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      maxWidth: 400,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "center",
                      height: { md: "450px", sm: "550px", xs: "420px" },
                      pb: 0,
                      cursor: "pointer",
                      position: "relative",
                      transition: "transform 0.3s",
                      borderRadius: "2.5em",
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                      "&:hover": {
                        "& .MuiCardMedia-root": {
                          transform: "scale(1.1)",
                        },
                        "& h6": {
                          opacity: "1",
                          top: "-45px",
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        width: "100%",
                        position: "relative",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* ✅ Image wrapper with fixed height */}
                      <Box
                        sx={{
                          borderRadius: "2.5em",
                          overflow: "hidden",
                          m: "15px",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item.images?.[0] || DefaultImg}
                          sx={{
                            height: { md: "240px", sm: "220px", xs: "180px" },
                            objectFit: "cover",
                            transition: "all 0.3s linear 0s",
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = DefaultImg;
                          }}
                        />
                      </Box>

                      {/* ✅ Title with fixed height */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "700",
                          letterSpacing: "1px",
                          lineHeight: "26px",
                          textAlign: "center",
                          fontFamily: "poppins",
                          fontSize: "18px",
                          px: "10px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {truncateTitle(item.title)}
                      </Typography>

                      {/* ✅ Description with fixed height */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "500",
                          letterSpacing: "1px",
                          lineHeight: "23px",
                          textAlign: "center",
                          fontFamily: "poppins",
                          fontSize: "15px",
                          color: theme.palette.primary.hero,
                          px: "10px",
                          height: "70px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: truncateDesc(item.desc || ""),
                        }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedListing;
