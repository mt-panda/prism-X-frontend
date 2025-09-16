import React from "react";
import Box from "@mui/material/Box";
import { Typography, Container, useTheme } from "@mui/material";

interface SectionIntroProps {
  title: string;
  subtitle: string;
  description?: string;
  subtitleColor?: string;
}

const SectionIntro: React.FC<SectionIntroProps> = ({
  title,
  subtitle,
  description,
  subtitleColor,
}) => {
  const theme = useTheme();
  return (
    <Container maxWidth="md">
      <Box component="section" pt="1rem" pb="2.5rem">
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            lineHeight: "32px",
            fontFamily: "Barlow",
            color: theme.palette.primary.focus,
            textAlign: "center",
            fontWeight: 600,
            letterSpacing: "3px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "43px",
            lineHeight: "32px",
            fontFamily: "Barlow",
            color: subtitleColor ?? theme.palette.primary.hover,
            textAlign: "center",
            fontWeight: 800,
            marginTop: "10px",
          }}
        >
          {subtitle}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              lineHeight: "27px",
              fontFamily: "sans-serif",
              color: theme.palette.text.secondary,
              textAlign: "center",
              fontWeight: 400,
              marginTop: "18px",
              padding: "0px 20px",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default SectionIntro;
