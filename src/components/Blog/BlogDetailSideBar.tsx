import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Chip, useTheme } from "@mui/material";
import Blogdata from "./BlogData";
import { Link, useNavigate } from "react-router-dom";

/* ---------------- Types ---------------- */
interface BlogItem {
  id: number;
  label: string;
  category?: string;
  tags: string[];
}

const BlogDetailSideBar: React.FC = () => {
  const recentPosts: BlogItem[] = Blogdata.slice().reverse().slice(0, 5);
    const theme = useTheme();
  const categoryCount: Record<string, number> = {};
  Blogdata.forEach((blog: BlogItem) => {
    const category = blog.category || "Uncategorized";
    if (categoryCount[category]) {
      categoryCount[category]++;
    } else {
      categoryCount[category] = 1;
    }
  });

  const tagSet: Set<string> = new Set();
  Blogdata.forEach((blog: BlogItem) => {
    blog.tags.forEach((tag: string) => tagSet.add(tag));
  });

  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    navigate("/blog", { state: { selectedTag: tag } });
  };

  const handleCategoryClick = (category: string) => {
    navigate("/blog", { state: { selectedCategory: category } });
  };

  return (
    <Grid
      sx={{
        display: "block",
        pr: { md: 0, sm: 0, xs: 2 },
        mr: { md: "140px", sm: "20px", xs: "0px" },
        mt: { xs: -6, sm: "40px" },
        ml: { xs: "6vw", sm: 0 },
        width: "auto",
        justifyContent: "center",
      }}
    >
      {/* Categories */}
      <Card
        sx={{
          minWidth: 290,
          px: { xs: 0, md: "30px" },
          overflow: "hidden",
          mb: "30px",
          bgcolor: theme.palette.common.white,
          position: "relative",
          border: "none",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          width: "auto",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="div"
            sx={{
              mt: "15px",
              mb: "20px",
              fontSize: "2rem",
              fontWeight: "600",
              lineHeight: "1.3",
              color: theme.palette.primary.hover,
            }}
          >
            Category
          </Typography>
          {Object.keys(categoryCount).map((category, index) => (
            <Grid
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => handleCategoryClick(category)}
            >
              <Typography
                variant="body2"
                sx={{
                  my: "10px",
                  lineHeight: "1.5",
                  "&:hover": {
                    color: theme.palette.primary.focus,
                    cursor: "pointer",
                  },
                }}
              >
                {category}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  my: "10px",
                  lineHeight: "1.5",
                  "&:hover": {
                    cursor: "default",
                  },
                }}
              >
                {" "}
                ({categoryCount[category]})
              </Typography>
            </Grid>
          ))}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card
        sx={{
          minWidth: 300,
          px: { xs: 0, md: "30px" },
          overflow: "hidden",
          mb: "30px",
          bgcolor: theme.palette.common.white,
          position: "relative",
          border: "none",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          width: "auto",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="div"
            sx={{
              mt: "15px",
              mb: "20px",
              fontSize: "1.8rem",
              fontWeight: "600",
              lineHeight: "1.3",
              color: theme.palette.primary.hover,
            }}
          >
            Tags
          </Typography>
          {[...tagSet].map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              onClick={() => handleTagClick(tag)}
              sx={{
                m: "5px",
                "&:hover": {
                  bgcolor: theme.palette.primary.focus,
                  color: theme.palette.common.white,
                  cursor: "pointer",
                },
              }}
            />
          ))}
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card
        sx={{
          minWidth: 250,
          px: { xs: 0, md: "30px" },
          overflow: "hidden",
          mb: "30px",
          bgcolor: theme.palette.common.white,
          position: "relative",
          border: "none",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          width: "auto",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="div"
            sx={{
              mt: "15px",
              mb: "20px",
              fontSize: "2rem",
              fontWeight: "600",
              lineHeight: "1.3",
              color: theme.palette.primary.hover,
            }}
          >
            Recent Posts
          </Typography>
          {recentPosts.map((item, index) => (
            <Link
              key={index}
              to={`/blog/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="body2"
                sx={{
                  mt: "20px",
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
    </Grid>
  );
};

export default BlogDetailSideBar;
