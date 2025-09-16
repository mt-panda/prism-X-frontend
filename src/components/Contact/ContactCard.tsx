import React from "react";
import { Box, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CompanyContactData from "../Data/CompanyContactInfo";

// ---------------- Types ----------------
interface ContactItem {
  id: number;
  icon: React.ReactNode;
  label: string;
  description: string;
  iconHover: React.ReactNode;
  handleClick?: (() => void) | null;
}

const { email, phone, OfficeLocation } = CompanyContactData[0];

const contactData: ContactItem[] = [
  {
    id: 1,
    icon: <LocationOnOutlinedIcon sx={{ fontSize: "50px" }} />,
    label: "Visit Us Anytime",
    description: OfficeLocation,
    iconHover: <LocationOnOutlinedIcon sx={{ fontSize: "150px" }} />,
    handleClick: null,
  },
  {
    id: 2,
    icon: <MailOutlineIcon sx={{ fontSize: "50px" }} />,
    label: "Send An Email",
    description: email,
    iconHover: <MailOutlineIcon sx={{ fontSize: "150px" }} />,
  },
  {
    id: 3,
    icon: <CallOutlinedIcon sx={{ fontSize: "50px" }} />,
    label: "Call Us",
    description: phone,
    iconHover: <CallOutlinedIcon sx={{ fontSize: "150px" }} />,
    handleClick: null,
  },
];

const ContactCard: React.FC = () => {
    const theme = useTheme();
  const handleClick = (label: string) => {
    if (label === "Send An Email") {
      window.location.href = `mailto:${email}?subject=Webiste Visitor Query`;
    } else if (label === "Call Us") {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{
        background: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        overflow: "visible",
      }}
      mt={{ md: 10, sm: 2, xs: 2 }}
      mb={{ md: 10 }}
      pt={{ xs: 4, md: 10 }}
      pb={{ xs: 8, md: 8 }}
      px={{ md: 20, sm: 10, xs: 2 }}
    >
      {contactData.map((item) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "center",
            overflow: "visible",
            width: "31.5%",
            height: 250
          }}
          component="div"
          {...({} as any)}
        >
          <Card
            sx={{
              position: "relative",
              bgcolor: theme.palette.primary.main,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              pb: 4,
              px: 3,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              overflow: "visible",
              "&:hover": {
                borderBottom: `2px solid ${theme.palette.primary.focus}`,
                "& .hoverIcon": {
                  animation: "zoomInOut 1.8s infinite",
                },
                "& .extraIcon": {
                  animation: "appearFromRight 0.8s forwards",
                },
              },
              "@keyframes zoomInOut": {
                "0%, 100%": {
                  transform: "scale(1)",
                },
                "50%": {
                  transform: "scale(1.2)",
                },
              },
              "@keyframes appearFromRight": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(20px) rotate(-25deg)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0) rotate(-25deg)",
                },
              },
            }}
            onClick={() => handleClick(item.label)}
          >
            <Box
              sx={{
                border: `11px solid ${theme.palette.common.white}`,
                bgcolor: theme.palette.primary.focus,
                borderRadius: "50%",
                p: "20px",
                position: "absolute",
                top: { md: "-50px", sm: "-35px", xs: "-35px" },
                color: theme.palette.common.white,
              }}
            >
              <Box className="hoverIcon">{item.icon}</Box>
            </Box>
            <Box
              className="extraIcon"
              sx={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                opacity: 0,
                transform: "rotate(-35deg)",
                color: `${theme.palette.primary.dark} !important`,
                fontSize: "20px",
                p: "0px",
              }}
            >
              {item.iconHover}
            </Box>
            <CardContent
              sx={{
                flexGrow: 1,
                pb: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  letterSpacing: "0.2px",
                  lineHeight: "1.9rem",
                  cursor: "pointer",
                  "&:hover": { color: theme.palette.primary.focus },
                  textAlign: "center",
                  textOverflow: "ellipsis",
                  wordBreak: "break-all",
                  WebkitHyphens: "auto",
                  color: "inherit",
                  mt: "80px",
                  zIndex: 1,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textAlign: "center",
                  lineHeight: "auto",
                  maxHeight: "auto",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: "vertical",
                  mt: "10px",
                  zIndex: 1,
                  cursor: "default",
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ContactCard;
