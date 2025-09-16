import React, { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Box,
  Chip,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
} from "@mui/material";
import Blogdata from "./BlogData";
import SellIcon from "@mui/icons-material/Sell";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Form from "../UI/Form.tsx";

/* ---------------- Types ---------------- */
interface BlogDetailCardProps {
  id: number;
}

interface Heading {
  h1?: string;
  p?: string;
  h2?: string;
  p2?: string;
  lists?: { listH: string; listP: string }[];
}

interface FAQ {
  q: string;
  a: string;
}

interface BlogItem {
  id: number;
  label: string;
  description: string;
  path: string;
  datePublished: string;
  category?: string;
  headings: Heading[];
  faq: FAQ[];
  conclusion: string;
  tags: string[];
}

interface FormData {
  name: string;
  email: string;
  comment: string;
}

const BlogDetailCard: React.FC<BlogDetailCardProps> = ({ id }) => {
  const item = Blogdata.find((blog) => blog.id === id);
    const theme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    comment: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeedbackSubmit = async (formData: FormData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ name: "", email: "", comment: "" });
  };

  if (!item) {
    return <Typography variant="h5">Blog not found</Typography>;
  }

  const renderCategory = (item: BlogItem) => {
    return item.category ? (
      <Typography component="span" sx={{ color: "grey" }}>
        {item.category}
      </Typography>
    ) : (
      <Typography component="span" sx={{ color: "grey" }}>
        Uncategorized
      </Typography>
    );
  };


  return (
    <Grid
      container
      item
      sx={{
        background: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        gap: { xs: 6, md: 3 },
      }}
      rowSpacing={6}
      pt={{ xs: 5, md: 5 }}
      pb={{ xs: 8, md: 12 }}
      //   px={{ xs: 0, md: 1, lg: 6 }}
      px={16}
      component="div"
      {...({} as any)}
    >
      <Grid item xs={10} sx={{ mb: 4 }} component="div" {...({} as any)}>
        <Grid
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          component="div"
          {...({} as any)}
        >
          <img height="450px" width="100%" src={item.path} alt={item.label} />
          <Typography
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              borderRadius: "8px",
              p: 5,
              bgcolor: theme.palette.primary.focus,
              color: theme.palette.common.white,
              width: { md: "45px", sm: "35px", xs: "25px" },
              height: { md: "45px", sm: "35px", xs: "25px" }, // 👈 make it square
              fontWeight: { md: "600", sm: "400", xs: "400" },
              display: "flex", // 👈 center horizontally + vertically
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.datePublished}
          </Typography>
        </Grid>

        <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
          <SellIcon sx={{ color: theme.palette.primary.focus }} />
          {renderCategory(item as any)}
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: "40px",
            fontWeight: "600",
            lineHeight: "auto",
            letterSpacing: "0.2px",
            textAlign: "left",
            mb: "20px",
            height: "auto",
            mr: "10px",
            fontFamily: "Barlow,sans-serif",
          }}
        >
          {item.label}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            textAlign: "left",
            lineHeight: "1.8rem",
            height: "auto",
            mb: "20px",
            fontSize: "20px",
          }}
        >
          {item.description}
        </Typography>

        {item.headings?.map((headingsItem, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "26px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                textAlign: "left",
                mb: "10px",
                lineHeight: "1.8rem",
              }}
            >
              {headingsItem.h1}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: "left",
                lineHeight: "1.8rem",
                fontSize: "16px",
                mb: "20px",
              }}
            >
              {headingsItem.p}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: "24px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                textAlign: "left",
                mb: "10px",
                lineHeight: "1.8rem",
              }}
            >
              {headingsItem.h2}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: "left",
                lineHeight: "1.8rem",
                fontSize: "16px",
                mb: "20px",
              }}
            >
              {headingsItem.p2}
            </Typography>
            <List sx={{ mb: 4 }}>
              {headingsItem.lists?.map((listsItem, index) => (
                <ListItem
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <ListItemIcon sx={{ minWidth: "auto", pr: 1 }}>
                    <FiberManualRecordIcon
                      sx={{ fontSize: "10px", mt: "10px" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: "600",
                          color: theme.palette.text.secondary,
                          fontSize: "16px",
                        }}
                      >
                        {listsItem.listH}
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: "400",
                            color: theme.palette.text.secondary,
                            fontSize: "16px",
                          }}
                        >
                          {` ${listsItem.listP}`}
                        </Typography>
                      </Typography>
                    }
                    primaryTypographyProps={{
                      sx: {
                        textAlign: "left",
                        lineHeight: "1.8rem",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}

        <Typography
          variant="h3"
          sx={{
            fontSize: "40px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            textAlign: "left",
            mb: "20px",
            height: "60px",
            mr: "10px",
          }}
        >
          FAQs
        </Typography>

        {item.faq?.map((faqItem, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "26px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                textAlign: "left",
                mb: "10px",
                lineHeight: "1.8rem",
              }}
            >
              {faqItem.q}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: "left",
                lineHeight: "1.8rem",
                fontSize: "16px",
              }}
            >
              {faqItem.a}
            </Typography>
          </Box>
        ))}

        <Typography
          variant="h3"
          sx={{
            fontSize: "40px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            textAlign: "left",
            mb: "20px",
            height: "60px",
            mr: "10px",
          }}
        >
          Conclusion
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            textAlign: "left",
            lineHeight: "1.8rem",
            height: "auto",
            fontSize: "18px",
            mb: "40px",
          }}
        >
          {item.conclusion}
        </Typography>

        <Grid container spacing={1} sx={{ my: 2 }}>
          {item.tags.map((tag, index) => (
            <Grid item key={index} component="div" {...({} as any)}>
              <Chip
                label={tag}
                sx={{
                  "&:hover": {
                    bgcolor: theme.palette.primary.focus,
                    cursor: "default",
                    color: theme.palette.common.white,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Grid sx={{ my: "20px" }}>
          <Divider />
        </Grid>

        <Grid
          sx={{
            textAlign: "left",
            //   ml: { xs: -2, sm: 0 }
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "26px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textAlign: "left",
              height: "60px",
              ml: "8px",
            }}
          >
            Add a Comment
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              textAlign: "left",
              lineHeight: "1.8rem",
              height: "auto",
              fontSize: "16px",
              mb: "20px",
              ml: "8px",
            }}
          >
            Your email address will not be published.
          </Typography>

          <Form
            fields={[
              {
                type: "text",
                placeholder: "Enter your name",
                name: "user_name",
                required: true,
              },
              {
                type: "email",
                placeholder: "Enter your email",
                name: "user_email",
                required: true,
              },
            ]}
            buttonText="Submit"
            textAreaPlaceholder="Write Your Comment"
            onSubmit={(formData: Record<string, string>) => {
              // Map the formData keys to match what handleFeedbackSubmit expects
              const mappedFormData = {
                name: formData.user_name || "",
                email: formData.user_email || "",
                comment: formData.comment || "",
              };
              return handleFeedbackSubmit(mappedFormData);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogDetailCard;
