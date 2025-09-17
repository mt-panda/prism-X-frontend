import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FooterHeading from "./FooterHeading.tsx";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import CompanyContactData from "./Data/CompanyContactInfo";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import bgImage from "../assets/images/bg-footer-1.png";
import header from "../assets/images/home/newLogo.png";
import ButtonPrimary from "./UI/ButtonPrimary";
import { SnackbarProvider, useSnackbar } from "notistack";

const { email, phone, OfficeLocation } = CompanyContactData[0];

const Footer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const [formemail, setFormEmail] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  if (
    location?.pathname === "/dashboard" ||
    /^\/business\//.test(location?.pathname) ||
    isDashboardRoute
  ) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formemail) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(formemail)) {
      setError("Please enter a valid email address");
      return;
    }

    enqueueSnackbar("Subscribed successfully!", {
      variant: "success",
      autoHideDuration: 3000,
      action: (key) => (
        <Button color="inherit" size="small" onClick={() => closeSnackbar(key)}>
          Close
        </Button>
      ),
    });

    setFormEmail("");
    setError("");
  };

  return (
    <>
      {/* Main Footer */}
      <Box
        component="footer"
        sx={{
          width: "100vw",
          backgroundColor: theme.palette.primary.hover,
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "top left",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          py: { xs: 3, md: 8 },
          px: { xs: 2, sm: 4, md: 0 },
          color: theme.palette.text.secondary,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} justifyContent={"space-between"}>
            {/* Logo + intro */}
            <Grid component="div" {...({} as any)}>
              <Box mb={2} mt={-2}>
                <Link to="/">
                  <IconButton component="div" aria-label="Cruip">
                    <img src={header} alt="logo" style={{ width: "100px" }} />
                  </IconButton>
                </Link>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "15px",
                  lineHeight: "30px",
                  pb: "15px",
                  pt: "8px",
                  fontFamily: "'Roboto', sans-serif",
                  maxWidth: "280px",
                  color: theme.palette.primary.main,
                }}
              >
                Get Started to Unearth the finest local business listings
                available in your city. The journey toward incredible
                experiences begins now.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid component="div" {...({} as any)}>
              <FooterHeading
                Text="Quick Links"
                linebg={theme.palette.primary.focus}
              />
              <Box pt={2}>
                <ul style={{ padding: 0, margin: 0 }}>
                  {[
                    { label: "Home", to: "/" },
                    { label: "About us", to: "/about-us" },
                    { label: "Listing", to: "/listings" },
                    { label: "Blog", to: "/blog" },
                    { label: "Contact us", to: "/contact" },
                  ].map((item) => (
                    <li
                      key={item.to}
                      style={{
                        marginBottom: "21px",
                        marginLeft: "15px",
                        transition: "transform 0.3s",
                        fontSize: "15px",
                        fontWeight: 600,
                        fontFamily: "'Roboto', sans-serif",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateX(5px)";
                        e.currentTarget.style.color =
                          theme.palette.primary.focus ?? "";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateX(0px)";
                        e.currentTarget.style.color =
                          theme.palette.primary.main ?? "";
                      }}
                    >
                      <Link
                        to={item.to}
                        style={{
                          color: theme.palette.primary.main,
                          textDecoration: "none",
                          fontWeight: 500,
                          display: "inline-block",
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>

            {/* Newsletter */}
            <Grid
              sx={{ maxWidth: "260px" }}
              component="div"
              {...({} as any)}
            >
              <FooterHeading
                Text="Newsletter"
                linebg={theme.palette.primary.focus}
              />
              <Box
                component="form"
                noValidate
                sx={{ mt: 4 }}
                onSubmit={handleSubmit}
              >
                <input
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 10px",
                    fontSize: "15px",
                    borderRadius: "3px",
                    border: `1px solid ${theme.palette.primary.focus}`,
                    marginBottom: "9px",
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.hover,
                  }}
                  type="email"
                  required
                  placeholder="Enter E-mail Address"
                  value={formemail}
                  onChange={handleChange}
                />
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mb: 1, fontSize: "12px" }}
                  >
                    {error}
                  </Typography>
                )}
                <ButtonPrimary
                  type="submit"
                  sx={{
                    background: theme.palette.primary.focus,
                    color: theme.palette.primary.main,
                    height: "44px", 
                    width: "50%",
                    borderRadius: "3px",
                    mt: 1,
                    "&:hover": {
                      background: theme.palette.primary.focus,
                      opacity: 0.9,
                    },
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  SUBSCRIBE
                </ButtonPrimary>
              </Box>
            </Grid>

            {/* Contact */}
            <Grid
              sx={{ maxWidth: "280px", mt: { xs: 3, sm: 0 } }}
              component="div"
              {...({} as any)}
            >
              <FooterHeading
                Text="Contact"
                linebg="theme.palette.primary.focus"
              />
              <Box pt={2}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOnIcon
                    sx={{ color: theme.palette.primary.main, mr: 1 }}
                  />
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "15px",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {OfficeLocation}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <MailIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <a
                    href={`mailto:${email}`}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {email}
                  </a>
                </Box>
                <a
                  href={`tel:${phone}`}
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CallIcon
                      sx={{ color: theme.palette.primary.main, mr: 1 }}
                    />
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontFamily: "'Roboto', sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      {phone}
                    </Typography>
                  </Box>
                </a>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box sx={{ color: "grey.300" }}>
        <Container maxWidth={false} sx={{ px: { xs: 0 } }}>
          <Grid
            container
            py={1}
            sx={{
              background: theme.palette.darkcard.contrastText,
              color: theme.palette.primary.main,
              justifyContent: "center"
            }}
          >
            <Grid
              sx={{
                textAlign: "right",
                fontSize: "12px",
                fontFamily: "'Roboto', sans-serif",
              }}
              component="div"
              {...({} as any)}
            >
              <small>Copyright 2023 Techietribe. All Rights Reserved.</small>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const EnhancedNewsletterForm = () => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    autoHideDuration={3000}
  >
    <Footer />
  </SnackbarProvider>
);

export default EnhancedNewsletterForm;













// import React, { useState } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Button,
//   Stack,
//   InputBase,
//   useTheme,
//   alpha,
// } from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import CallIcon from "@mui/icons-material/Call";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { Link } from "react-router-dom";
// import { SnackbarProvider, useSnackbar } from "notistack";
// import image from "../assets/images/navbar/listifyLogoContrast.png";
// // import footerBg from "../assets/images/footerbg.png";

// const FooterContent: React.FC = () => {
//   const theme = useTheme();
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//   const [formEmail, setFormEmail] = useState("");
//   const [error, setError] = useState("");

//   const validateEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formEmail) {
//       setError("Email is required");
//       return;
//     }
//     if (!validateEmail(formEmail)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     enqueueSnackbar("Subscribed successfully!", {
//       variant: "success",
//       autoHideDuration: 3000,
//       action: (key) => (
//         <Button color="inherit" size="small" onClick={() => closeSnackbar(key)}>
//           Close
//         </Button>
//       ),
//     });

//     setFormEmail("");
//     setError("");
//   };

//   return (
//     <Box
//       component="footer"
//       sx={{
//         width: "100%",
//         overflowX: "hidden",
//         position: "relative",
//         bgcolor: theme.palette.darkcard.main,
//         // backgroundImage: `url(${footerBg})`,
//         backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/052/614/554/small/abstract-blue-header-footer-transparent-curve-business-background-design-illustration-template-vector.jpg')",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Newsletter Section */}
//       <Box
//         sx={{
//           display: "flex",
//           width: "100%",
//           height: 140,
//           borderBottom: `2px solid ${theme.palette.primary.hero}`,
//         }}
//       >
//         {/* Left Box */}
//         <Box
//           sx={{
//             flex: 1,
//             bgcolor: alpha(theme.palette.darkcard.contrastText, 0.9),
//             color: "secondary.contrastText",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "flex-end",
//             pr: 6,
//           }}
//         >
//           <Typography
//             variant="overline"
//             sx={{
//               letterSpacing: 3,
//               opacity: 0.9,
//               mr: 9,
//               color: "primary.focus",
//             }}
//           >
//             Subscribe to our
//           </Typography>
//           <Typography
//             variant="h4"
//             fontWeight={600}
//             letterSpacing={2}
//             pr={2}
//             fontFamily={"'Google Sans Code', monospace"}
//           >
//             NEWSLETTER
//           </Typography>
//         </Box>

//         {/* Right Box */}
//         <Box
//           sx={{
//             flex: 2,
//             bgcolor: alpha(theme.palette.cardshadow.main, 0.9),
//             display: "flex",
//             alignItems: "center",
//             pl: 6,
//           }}
//         >
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               maxWidth: "700px",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 width: "100%",
//                 bgcolor: "background.paper",
//                 borderRadius: 50,
//                 overflow: "hidden",
//                 height: 62,
//               }}
//             >
//               <InputBase
//                 placeholder="Enter email address"
//                 value={formEmail}
//                 onChange={(e) => setFormEmail(e.target.value)}
//                 sx={{
//                   flex: 1,
//                   px: 4,
//                   fontSize: "1.75rem",
//                   color: "text.primary",
//                   fontFamily: "'Google Sans Code', monospace",
//                   "&::placeholder": {
//                     color: "text.secondary",
//                     fontWeight: 500,
//                   },
//                 }}
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   borderRadius: 50,
//                   px: 5,
//                   height: "100%",
//                   bgcolor: "primary.focus",
//                   color: "secondary.contrastText",
//                   fontWeight: 600,
//                   letterSpacing: 2,
//                   border: `2px solid white`,
//                   "&:hover": {
//                     bgcolor: "primary.hero",
//                   },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Box>
//             {error && (
//               <Typography
//                 color="error"
//                 variant="body2"
//                 sx={{ mt: 1, fontSize: "12px" }}
//               >
//                 {error}
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </Box>

//       {/* Main Footer */}
//       <Box
//         sx={{
//           width: "100%",
//           color: "secondary.contrastText",
//           pt: 6,
//           pb: 10,
//           px: { xs: 4, md: 32 },
//           bgcolor: alpha(theme.palette.darkcard.main, 0.9),
//         }}
//       >
//         <Container maxWidth="lg">
//           <Grid container spacing={0} justifyContent={"space-between"}>
//             {/* Left Column */}
//             <Grid
//               item
//               xs={12}
//               md={6}
//               minWidth={"50%"}
//               component="div"
//               {...({} as any)}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: { xs: "center", md: "flex-start" },
//                   textAlign: { xs: "center", md: "left" },
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={image}
//                   alt="Logo"
//                   sx={{ width: 250, mb: 2 }}
//                 />
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     opacity: 0.9,
//                     maxWidth: 380,
//                     lineHeight: 1.6,
//                     letterSpacing: 1,
//                   }}
//                 >
//                   Get Started to Unearth the finest local business listings
//                   available in your city. The journey toward incredible
//                   experiences begins now.
//                 </Typography>
//               </Box>
//             </Grid>

//             {/* Right Column */}
//             <Grid
//               item
//               xs={12}
//               md={6}
//               minWidth={"50%"}
//               component="div"
//               {...({} as any)}
//             >
//               <Grid container>
//                 {/* Quick Links */}
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   minWidth={"50%"}
//                   component="div"
//                   {...({} as any)}
//                 >
//                   <Typography
//                     variant="h5"
//                     fontWeight={500}
//                     mb={2}
//                     letterSpacing={2}
//                     gutterBottom
//                     sx={{
//                       position: "relative",
//                       display: "inline-block",
//                       "&::after": {
//                         content: '""',
//                         position: "absolute",
//                         left: 0,
//                         bottom: -4,
//                         height: 3,
//                         width: "15%",
//                         bgcolor: "primary.focus",
//                         transition: "width 0.3s ease",
//                       },
//                       "&:hover::after": {
//                         width: "100%",
//                       },
//                     }}
//                   >
//                     Quick Links
//                   </Typography>
//                   <Box component="ul" sx={{ listStyle: "disc", pl: 3, m: 0 }}>
//                     {[
//                       { label: "Home", path: "/" },
//                       { label: "About", path: "/about" },
//                       { label: "Blog", path: "/blog" },
//                       { label: "Listings", path: "/listings" },
//                       { label: "Contact", path: "/contact" },
//                     ].map((link) => (
//                       <Box
//                         key={link.label}
//                         component="li"
//                         sx={{
//                           mb: 0.5,
//                           transition: "all 0.3s ease",
//                           "&::marker": { fontSize: "1.5rem" },
//                           "&:hover": {
//                             "&::marker": { color: "primary.focus" },
//                             opacity: 1,
//                             color: "primary.focus",
//                             transform: "translateX(4px)",
//                           },
//                         }}
//                       >
//                         <Typography
//                           component={Link}
//                           to={link.path}
//                           variant="body1"
//                           sx={{
//                             textDecoration: "none",
//                             color: "inherit",
//                             opacity: 0.7,
//                             letterSpacing: 1.5,
//                           }}
//                         >
//                           {link.label}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Grid>

//                 {/* Contact Us */}
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   minWidth={"50%"}
//                   component="div"
//                   {...({} as any)}
//                 >
//                   <Typography
//                     variant="h5"
//                     fontWeight={500}
//                     mb={3}
//                     letterSpacing={2}
//                     gutterBottom
//                     sx={{
//                       position: "relative",
//                       display: "inline-block",
//                       "&::after": {
//                         content: '""',
//                         position: "absolute",
//                         left: 0,
//                         bottom: -4,
//                         height: 3,
//                         width: "15%",
//                         bgcolor: "primary.focus",
//                         transition: "width 0.3s ease",
//                       },
//                       "&:hover::after": {
//                         width: "100%",
//                       },
//                     }}
//                   >
//                     Contact Us
//                   </Typography>
//                   <Stack spacing={2}>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <CallIcon fontSize="medium" />
//                       <Typography variant="body1" letterSpacing={1}>
//                         +1 (234) 567-890
//                       </Typography>
//                     </Stack>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <MailOutlineIcon fontSize="medium" />
//                       <Typography variant="body1" letterSpacing={1}>
//                         support@example.com
//                       </Typography>
//                     </Stack>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <LocationOnIcon fontSize="medium" />
//                       <Typography variant="body1" letterSpacing={1}>
//                         123 Business St, City
//                       </Typography>
//                     </Stack>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Bottom Bar */}
//       <Box
//         sx={{
//           py: 1,
//           borderTop: `2px solid ${theme.palette.primary.hero}`,
//           textAlign: "center",
//           bgcolor: alpha(theme.palette.darkcard.contrastText, 0.9),
//         }}
//       >
//         <Typography
//           variant="caption"
//           sx={{ color: "secondary.contrastText", opacity: 0.6 }}
//         >
//           © {new Date().getFullYear()} Your Company Name. All rights reserved.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// const Footer: React.FC = () => (
//   <SnackbarProvider
//     maxSnack={3}
//     anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//     autoHideDuration={3000}
//   >
//     <FooterContent />
//   </SnackbarProvider>
// );

// export default Footer;
