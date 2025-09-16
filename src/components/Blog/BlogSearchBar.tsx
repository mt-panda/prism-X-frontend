import { Grid, InputAdornment, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

// --------------- Types ----------------
interface BlogSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const BlogSearchBar: React.FC<BlogSearchBarProps> = ({
  searchQuery: initialSearchQuery,
  onSearchChange,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const theme = useTheme();
  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      onSearchChange("");
    } else {
      onSearchChange(searchQuery.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchQuery.trim() === "") {
        onSearchChange("");
      } else {
        onSearchChange(searchQuery.trim());
      }
    }
  };

  return (
    <Grid
      container
      component="form"
      sx={{
        "& > :not(style)": {
          mt: 1,
          pr: { lg: 3, xs: 0, md: 0, sm: 0 },
          mx: { xs: 1.4, sm: 3, md: 1.4 },
          width: { xs: "100%", md: "100%" },
        },
        justifyContent: { xs: "center", md: "left" },
        alignItems: "center",
        mt: "30px",
        ml: { md: "auto", sm: "5px", xs: "5px" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        placeholder="Search Blogs"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                bgcolor: theme.palette.primary.focus,
                borderRadius: "10px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: "-13px",
                py: "25px",
                px: "12px",
                "&:hover": { cursor: "pointer" },
              }}
              onClick={handleSearchClick}
            >
              <SearchIcon sx={{ color: theme.palette.common.white }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: theme.palette.common.white,
            borderRadius: "10px",
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
          },
          "& .MuiInputLabel-root": {
            color: "inherit",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            display: "none",
          },
        }}
      />
    </Grid>
  );
};

export default BlogSearchBar;
