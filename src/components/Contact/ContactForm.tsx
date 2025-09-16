import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import Form from "../UI/Form";
import CompanyContactData from "../Data/CompanyContactInfo";

// ---------------- Types ----------------
interface FormField {
  type: string;
  name: string;
  required: boolean;
  placeholder: string;
}

const ContactForm: React.FC = () => {
    const theme = useTheme();
    const { tiktok, pinterest, instagram, facebook } = CompanyContactData[0] as {
    tiktok?: string;
    pinterest?: string;
    instagram?: string;
    facebook?: string;
  };

  return (
    <Grid
      container
      sx={{
        mb: 10,
        px: { md: 20, sm: 15, xs: 4 },
      }}
    >
      {/* Left side: text */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          width: "42%",
          paddingRight: { xs: 0, md: 15 },
          textAlign: { xs: "center", md: "left" },
          my: { xs: 6, md: 0 },
        }}
        component="div"
        {...({} as any)}
      >
        <Typography
          sx={{
            color: theme.palette.primary.focus,
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "3px",
            textAlign: { xs: "center", md: "left" },
            fontFamily: "Barlow",
          }}
        >
          CONTACT US
        </Typography>
        <Typography
          sx={{
            fontSize: "46px",
            fontWeight: "800",
            lineHeight: "1.2",
            color: theme.palette.primary.hover,
            mb: "40px",
            fontFamily: "Barlow",
          }}
        >
          How Can We Assist You?
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "500",
            color: theme.palette.text.secondary,
            mb: "40px",
          }}
        >
          Reach out for support on listings, navigation, or any inquiries to
          enhance your Techietribe journey.
        </Typography>
      </Grid>

      {/* Right side: form */}
      <Grid item xs={12} md={7} width={"58%"} component="div" {...({} as any)}>
        <Form
          fields={
            [
              {
                type: "text",
                name: "first_name",
                required: true,
                placeholder: "Name",
              },
              {
                type: "email",
                name: "email",
                required: true,
                placeholder: "Email Address",
              },
              {
                type: "text",
                name: "subject",
                required: true,
                placeholder: "Subject",
              },
            ] as FormField[]
          }
          buttonText="Send Message"
          textAreaPlaceholder="Your Message"
        />
      </Grid>
    </Grid>
  );
};

export default ContactForm;
