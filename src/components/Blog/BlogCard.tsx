import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

// ---------------- Types ----------------
interface BlogItem {
  id: string | number;
  label: string;
  description: string;
  path: string;
  [key: string]: any;
}

interface BlogCardProps {
  data: BlogItem[];
  itemsPerPage: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ data, itemsPerPage }) => {
    const theme = useTheme();
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 4, md: 3 }}
      pt={{ xs: 4, md: 5 }}
      pb={{ xs: 8, md: 12 }}
      px={{ xs: 2, sm: 6 }}
      sx={{ background: "white", textAlign: "center" }}
    >
      {data.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          maxWidth={"31.85%"}
          component="div"
          {...({} as any)}
        >
          <Link
            to={`/blog/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                pb: 4,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  "& Button": {
                    background: theme.palette.primary.focus,
                    color: theme.palette.common.white,
                    opacity: 1,
                  },
                  "& h5": {
                    color: theme.palette.primary.hero,
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={item.path}
                alt={item.label}
                sx={{ cursor: "pointer" }}
              />
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    letterSpacing: "0.2px",
                    lineHeight: "1.9rem",
                    cursor: "pointer",
                    "&:hover": { color: theme.palette.primary.focus },
                    textAlign: "left",
                    mb: "20px",
                    height: "56px",
                    textOverflow: "ellipsis",
                    wordBreak: "break-all",
                    WebkitHyphens: "auto",
                    mr: "25px",
                    color: "inherit",
                  }}
                >
                  {`${item.label.substring(0, 46)}${
                    item.label.length > 46 ? "..." : ""
                  }`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    textAlign: "left",
                    lineHeight: "auto",
                    maxHeight: "auto",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {`${item.description.substring(0, 156)}${
                    item.description.length > 156 ? "..." : ""
                  }`}
                </Typography>
              </CardContent>

              <Button
                sx={{
                  background: "black",
                  color: theme.palette.common.white,
                  textTransform: "none",
                  height: "42px",
                  width: "auto",
                  px: 6,
                  borderRadius: 20,
                }}
              >
                View Details
              </Button>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogCard;
