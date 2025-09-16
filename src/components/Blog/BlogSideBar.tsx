import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, useTheme } from "@mui/material";
import Blogdata from "./BlogData";
import { Link } from "react-router-dom";

// ---------------- Types ----------------
interface BlogItem {
  id: string | number;
  label: string;
  comment?: string;
  [key: string]: any;
}

const BlogSideBar: React.FC = () => {
  const recentPosts: BlogItem[] = Blogdata.slice().reverse().slice(0, 5);
    const theme = useTheme();
  return (
    <Grid
      item
      sx={{
        display: "block",
        mr: { xs: 0, md: "100px" },
        mt: "30px",
        width: "auto",
        pr: { lg: 3, xs: 0, md: 0, sm: 0 },
        mx: { xs: 1, sm: 2, md: 1 },
      }}
      component="div"
      {...({} as any)}
    >
      {/* Recent Posts */}
      <Card
        sx={{
          minWidth: { xs: 230, sm: 250 },
          px: "30px",
          mx: 0.5,
          overflow: "hidden",
          mb: "30px",
          bgcolor: theme.palette.common.white,
          position: "relative",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="div"
            sx={{
              mt: "15px",
              mb: "15px",
              fontSize: "1.7rem",
              fontWeight: "600",
              lineHeight: "1.3",
              color: theme.palette.primary.hover,
            }}
          >
            Recent Posts
          </Typography>
          {recentPosts.map((item, index) => (
            <Link
              key={`post-${index}`}
              to={`/blog/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="body2"
                sx={{
                  my: "14px",
                  lineHeight: "1.5",
                  "&:hover": {
                    color: theme.palette.primary.focus,
                    cursor: "pointer",
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Recent Comments */}
      <Card
        sx={{
          minWidth: { xs: 230, sm: 250 },
          mx: 0.5,
          px: "30px",
          overflow: "hidden",
          mb: "30px",
          bgcolor: theme.palette.common.white,
          position: "relative",
          border: "none",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="div"
            sx={{
              mt: "15px",
              mb: "15px",
              fontSize: "1.7rem",
              fontWeight: "600",
              lineHeight: "1.3",
              color: theme.palette.primary.hover,
            }}
          >
            Recent Comments
          </Typography>
          {recentPosts.map((item, index) => (
            <Link
              key={`comment-${index}`}
              to={`/blog/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="body2"
                sx={{
                  my: "14px",
                  lineHeight: "1.5",
                  "&:hover": {
                    color: theme.palette.primary.focus,
                    cursor: "pointer",
                  },
                }}
              >
                {item.comment}
              </Typography>
            </Link>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BlogSideBar;
