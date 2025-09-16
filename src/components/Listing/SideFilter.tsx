import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, useTheme } from "@mui/material";
import CheckboxFilter from "./CheckboxFilter";

/* ---------------- Types ---------------- */
interface SideFilterProps {
  accNTaxService: string[]; // used as categories
  setAccNTaxService: React.Dispatch<React.SetStateAction<string[]>>;
  area: string[];
  setArea: React.Dispatch<React.SetStateAction<string[]>>;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  items?: any[];
}

const SideFilter: React.FC<SideFilterProps> = ({
  accNTaxService: selectedCategories,
  setAccNTaxService: setSelectedCategories,
  setItems,
  items = [],
}) => {
  const [loading, setLoading] = useState(false);

  /* ---------------- Categories ---------------- */
  const categories: string[] = [
    "Accounting and Bookkeeping",
    "Marketing and Advertising",
    "IT and Technical Support",
    "Consulting Services",
    "Legal Services",
    "Human Resources and Recruitment",
    "Financial Planning and Advisory",
    "Cleaning and Maintenance",
    "Others",
  ];

  /* ---------------- Unique Areas from items ---------------- */
  const uniqueAreas: string[] = [
    ...new Set(items.map((item) => item.area).filter(Boolean)),
  ];

  /* ---------------- Filtering Logic ---------------- */
  useEffect(() => {
    setLoading(true);
    let filtered = [...items];

    // filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    setItems(filtered);
    setLoading(false);
  }, [selectedCategories]);

  /* ---------------- Handlers ---------------- */
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updated = checked
      ? [...selectedCategories, name]
      : selectedCategories.filter((c) => c !== name);
    setSelectedCategories(updated);
  };
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ width: "auto" }}>
      {/* Categories */}
      <Grid item xs={12} sm={6} md={12} component="div" {...({} as any)}>
        <Box sx={{ paddingLeft: { xs: 2, sm: 0 } }}>
          <Typography
            variant="h5"
            sx={{
              px: {
                textAlign: "left",
                fontWeight: 600,
                lineHeight: "22px",
                fontSize: "20px",
                color: theme.palette.primary.hover,
                fontFamily: "poppins",
                marginBottom: "10px",
              },
            }}
          >
            Categories
          </Typography>

          {categories.map((cat) => (
            <CheckboxFilter
              key={cat}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onChange={handleCategoryChange}
              name={cat}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SideFilter;
