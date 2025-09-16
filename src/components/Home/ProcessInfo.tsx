import React from "react";
import { Grid, Typography, Card, CardMedia, Container, Box } from "@mui/material";
import selectIcon from "../../assets/images/select (2).png";
import TargetIcon from "../../assets/images/target.png";
import ChooseIcon from "../../assets/images/choose.png";
import worldIcon from "../../assets/images/earth-asia.png";
import theme from "../../styles/theme";

interface GridItem {
  image: string;
  title: string;
  description: string;
}

const ProcessInfo: React.FC = () => {
  const gridItems: GridItem[] = [
    {
      image: selectIcon,
      title: "Pick A Category",
      description:
        "Start by choosing from an array of categories that cover every possible need you might have.",
    },
    {
      image: TargetIcon,
      title: "Discover What You Need",
      description: "Use our intuitive search to uncover top-rated businesses.",
    },
    {
      image: ChooseIcon,
      title: "Choose Your Favorite",
      description: "Use our intuitive search to uncover top-rated businesses.",
    },
    {
      image: worldIcon,
      title: "Step Out and Experience",
      description:
        "Go out and enjoy all the services and products your chosen business has to offer.",
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: "3rem", pb: "5rem" }}>
        <Grid container spacing={4} justifyContent="center">
          {gridItems.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
              component="div"
              {...({} as any)}
            >
              <Card
                elevation={0}
                sx={{
                  textAlign: "center",
                  p: 3,
                  width: "280px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: "70px",
                      height: "70px",
                      objectFit: "contain",
                      animation: "beat 2s ease infinite",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Barlow",
                    color: theme.palette.primary.hover,
                    mb: 1.5,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    color: theme.palette.primary.hero,
                    lineHeight: "26px",
                  }}
                >
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Keyframes */}
      <style>
        {`
          @keyframes beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.85); }
          }
        `}
      </style>
    </>
  );
};

export default ProcessInfo;
