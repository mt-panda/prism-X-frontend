import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { OpenInNew } from "@mui/icons-material";
import {
  Container,
  Grid,
  Typography,
  Box,
  CardMedia,
  Paper,
  CircularProgress,
  IconButton,
  useTheme,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PublicIcon from "@mui/icons-material/Public";
import CallIcon from "@mui/icons-material/Call";
import DirectionsIcon from "@mui/icons-material/Directions";
import { makeStyles } from "@mui/styles";
import Review from "../components/LisitngDetail/Review";
import RealtedBusinessCard from "../components/LisitngDetail/RealtedBusinessCard";
import ReplayIcon from "@mui/icons-material/Replay";
import { AuthContext } from "../context/auth-context.tsx";
import { useListings } from "../context/ListingsContext";

/* ---------------- Types ---------------- */
export interface Listing {
  id: string;
  creator: string;
  title: string;
  desc: string;
  address: string;
  slug: string;
  phone: string;
  category: string;
  city: string;
  region: string;
  status: "active" | "pending";
  createdAt: string;
  updatedAt: string;

  // Optional fields
  website?: string | null;
  priceRange?: string | null;
  accountingAndTaxService?: string | null;
  area?: string | null;
  businessLogo?: string | null;
  businessBanner?: string | null;
  image?: string | null;
  images?: string[] | null | string; // sometimes array, sometimes JSON string
  intro?: string | null;
  aboutUs?: string | null;
  whyUs?: string | null;
  latestProjectIntro?: string | null;
  ourMission?: string | null;
  contactUsIntro?: string | null;
  mapUrl?: string | null;
  featured?: boolean;

  // Related user
  user?: {
    id: string;
    username: string;
    email: string;
    role: "user" | "admin";
  };
}

const useStyles = makeStyles(() => ({
  cardIcon: {
    position: "relative",
    top: "7px",
  },
}));

const ListingDetails: React.FC = () => {
  const theme = useTheme();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const { pid } = useParams();

  const classes = useStyles();
  const { listings, loading, error } = useListings();

  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    if (pid && listings.length > 0) {
      const found = listings.find(
        (item) => item.id === pid || item.slug === pid
      );
      if (found) {
        setListing(found);
        console.log("Selected Listing: ", found);
      }
    }
  }, [pid, listings]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error or not found state
  if (error || !listing) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography fontSize={"16px"} color="error" gutterBottom>
          No Listing Found
        </Typography>
        <IconButton aria-label="retry" size="medium">
          <ReplayIcon fontSize="inherit" />
        </IconButton>
      </Box>
    );
  }

  const shouldHide = listing.website === "https://www.example.com/";

  // Normalize images (handle stringified JSON or array)
  let galleryImages: string[] = [];
  if (Array.isArray(listing.images)) {
    galleryImages = listing.images;
  } else if (typeof listing.images === "string") {
    try {
      galleryImages = JSON.parse(listing.images);
    } catch {
      galleryImages = [];
    }
  }

  return (
    <Box
      component="main"
      sx={{
        bgcolor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontFamily: "poppins",
        px: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 26, sm: 24, md: 16 },
        pb: { xs: 5, sm: 8, md: 8 },
        minHeight: "100vh",
      }}
    >
      <Container maxWidth={false}>
        <Grid spacing={2} container flex={1}>
          {/* ---------- Top Container: IMAGES ---------- */}
          <Grid
            spacing={5}
            container
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "flex-end",
              maxHeight: "60vh",
              overflow: "hidden",
            }}
          >
            {/* ---------- LEFT COLUMN: MAIN IMAGE ---------- */}
            <Grid flex={2} component="div">
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 350, md: 505 },
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={listing.image || ""}
                  alt={listing.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>

            {/* ---------- RIGHT COLUMN (top area): 4 SMALL IMAGES ---------- */}
            <Grid flex={1} component="div">
              <Grid
                container
                spacing={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {galleryImages.map(
                  (img: string, i: number) =>
                    img && (
                      <Grid key={i} width="45%" component="div">
                        <Box
                          sx={{
                            width: "100%",
                            aspectRatio: "1 / 1",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={img}
                            alt={`${listing.title}-${i}`}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* ---------- MIDDLE COLUMN: DETAILS ---------- */}
          <Grid component="div" flex={3}>
            <Box component="section">
              <Typography
                variant="h5"
                sx={{ marginTop: "20px" }}
                style={{
                  fontSize: "16px",
                  lineHeight: "42px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  marginTop: "10px",
                  color: theme.palette.text.secondary,
                }}
              >
                Category:<span> {listing.category} </span>
              </Typography>

              <Typography
                variant="h5"
                style={{
                  fontSize: "25px",
                  lineHeight: "42px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  marginTop: "10px",
                  color: theme.palette.primary.hover,
                }}
              >
                {listing.title}
                <Link
                  style={{ textDecoration: "none", color: "unset" }}
                  to={`/business/${listing.slug}?type=${type}`}
                >
                  <OpenInNew
                    sx={{
                      marginLeft: "3px",
                      fontSize: "15px",
                      mb: "10px",
                      "&:hover": { color: theme.palette.primary.focus },
                    }}
                  />
                </Link>
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.hover, textAlign: "left" }}
              >
                <RoomIcon
                  sx={{ fontSize: "19px", position: "relative", top: "4px" }}
                />{" "}
                {listing.address}
              </Typography>

              <Typography
                variant="h5"
                sx={{ marginTop: "20px" }}
                style={{
                  fontSize: "16px",
                  lineHeight: "42px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  marginTop: "10px",
                  color: theme.palette.primary.hero,
                }}
                dangerouslySetInnerHTML={{ __html: listing.desc ?? "" }}
              ></Typography>

              <Typography
                variant="body1"
                sx={{ marginTop: "20px", paddingRight: "25px" }}
                style={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  marginTop: "10px",
                  color: theme.palette.primary.hero,
                }}
              >
                {listing.aboutUs}
              </Typography>
            </Box>

            {/* Related businesses */}
            <RealtedBusinessCard
              listingforCategory={{
                ...listing,
                category: listing.category ?? "",
                slug: listing.slug ?? "",
              }}
              listing={{
                ...listing,
                category: listing.category ?? "",
                slug: listing.slug ?? "",
              }}
            />

            {/* Reviews */}
            <Box component="section" sx={{ pr: { md: 3 } }}>
              <Review />
            </Box>
          </Grid>

          {/* ---------- RIGHT SIDEBAR: CONTACT DETAILS + MAP ---------- */}
          <Grid
            style={{
              position: "sticky",
              top: "150px",
              alignSelf: "flex-start",
            }}
            component="div"
            flex={1}
          >
            <Paper
              elevation={3}
              sx={{
                marginTop: "20px",
                padding: "26px 36px",
                boxShadow:
                  " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "11px", md: "13px" },
                  lineHeight: "2.4rem",
                  fontFamily: "poppins",
                  color: theme.palette.primary.hero,
                }}
              >
                <a
                  href={`tel:${listing.phone}`}
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  <CallIcon
                    sx={{ color: theme.palette.primary.focus, mr: 2 }}
                    className={classes.cardIcon}
                  />
                  <span>{listing.phone}</span>
                </a>
              </Typography>

              <Typography
                component="div"
                variant="body1"
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "11px", md: "13px" },
                  lineHeight: "2.4rem",
                  fontFamily: "poppins",
                  color: theme.palette.primary.hero,
                  display: "flex",
                }}
              >
                <RoomIcon
                  sx={{ color: theme.palette.primary.focus, mr: 2 }}
                  className={classes.cardIcon}
                />
                <div>{listing.address}</div>
              </Typography>

              <Typography
                component="div"
                variant="body1"
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "11px", md: "13px" },
                  lineHeight: "2.4rem",
                  fontFamily: "poppins",
                  color: theme.palette.primary.hero,
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={listing.website || "#"}
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  <PublicIcon
                    sx={{ color: theme.palette.primary.focus, mr: 2 }}
                    className={classes.cardIcon}
                  />
                  {!shouldHide ? (
                    <span>{listing.website}</span>
                  ) : (
                    <span style={{ paddingLeft: "10px" }}>-</span>
                  )}
                </a>
              </Typography>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                marginTop: "20px",
                padding: "15px 0px 0px",
                boxShadow:
                  " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "11px", md: "18px" },
                  paddingBottom: "12px",
                  lineHeight: "2.4rem",
                  fontFamily: "poppins",
                  color: theme.palette.primary.hero,
                  textAlign: "center",
                }}
              >
                <a
                  target="blank"
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  <DirectionsIcon
                    sx={{ color: theme.palette.primary.focus, mr: 1 }}
                    className={classes.cardIcon}
                  />
                  <span>Direction</span>
                </a>
              </Typography>

              <iframe
                src={listing.mapUrl || ""}
                width="100%"
                height="250px"
                style={{ border: 0, position: "relative", top: "6px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ListingDetails;
