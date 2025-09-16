import React, { useState, type KeyboardEvent } from "react";
import {
  Box,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import { useListings } from "../../context/ListingsContext";

interface Match {
  title: string;
  slug: string;
  location: string;
}

const HomeSearch: React.FC = () => {
  const navigate = useNavigate();
  const { listings } = useListings(); // ✅ get listings from context

  const [selectedOption, setSelectedOption] =
    useState<string>("All Categories");
  const [matchingTitles, setMatchingTitles] = useState<Match[]>([]);
  const [selectRegion, setSelectedRegion] = useState<string>("All Regions");

  const handleOptionSelect = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  const handleRegionOptionSelect = (event: SelectChangeEvent<string>) => {
    setSelectedRegion(event.target.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.toLowerCase();
    const matches = listings.filter(
      (item) =>
        item.intro &&
        item.intro.toLowerCase().includes(inputValue) &&
        inputValue.length > 0
    );
    setMatchingTitles(
      matches.map((match) => ({
        title: match.title,
        slug: match.slug,
        location: match.city || match.region || "",
      }))
    );
  };

  const getInputData = () => {
    const categoryData = selectedOption;
    const regionCategory = selectRegion;
    const queryString = `?region=${encodeURIComponent(
      regionCategory
    )}&category=${encodeURIComponent(categoryData)}`;

    navigate("/listings" + queryString, {
      state: { categoryData, regionCategory },
    });
  };

  const options = [
    "All Categories",
    "Automotive Services",
    "Beauty",
    "Fitness",
    "House",
    "Home Decor",
    "Locksmiths",
    "Nightlife",
    "Plumbers",
    "Restaurants",
    "Shopping",
  ];

  const regionOptions = [
    "All Regions",
    "Canada",
    "United Kingdom",
    "United States",
  ];

  return (
    <Box width="100%" sx={{ background: "transparent" }}>
      <Container maxWidth="lg">
        {/* Outer Box */}
        <Box
          sx={{
            borderRadius: "16px",
            maxWidth: "900px",
            width: "100%",
            mt: 5,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Top Row (3 Boxes) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {/* Box 1 - Search Input */}
            <Box flex={2}>
              <input
                className="lookingFor"
                type="text"
                placeholder="What are you looking for?"
                onKeyUp={handleKeyUp}
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "16px",
                  fontSize: "16px",
                  color: theme.palette.text.secondary,
                }}
              />
              {matchingTitles.length > 0 && (
                <div
                  style={{
                    marginTop: "5px",
                    background: "white",
                    borderRadius: "4px",
                    padding: "10px 0px",
                    position: "absolute",
                    zIndex: 999,
                    width: "100%",
                    boxShadow: "0 5px 10px rgba(0,0,0,.1)",
                    border: "1px solid rgba(0,0,0,.1)",
                  }}
                >
                  {matchingTitles.map((match, index) => (
                    <div
                      key={index}
                      style={{
                        borderBottom:
                          index !== matchingTitles.length - 1
                            ? "1px solid rgba(0,0,0,.1)"
                            : "none",
                        padding: "10px 20px",
                      }}
                    >
                      <Link
                        to={`/listings/${match.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: "Barlow",
                            color: theme.palette.primary.hover,
                            fontSize: "17px",
                            fontWeight: 600,
                            lineHeight: "22px",
                          }}
                        >
                          {match.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Barlow",
                            color: theme.palette.text.secondary,
                            fontSize: "15px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          {match.location && `-${match.location}`}
                        </Typography>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </Box>

            {/* Box 2 - Region Select */}
            <Box flex={2}>
              <FormControl fullWidth>
                <Select
                  value={selectRegion || ""}
                  onChange={handleRegionOptionSelect}
                  sx={{
                    height: "56px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                    background: "white",
                  }}
                >
                  {regionOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Box 3 - Search Button */}
            <Box flex={1}>
              <Button
                variant="contained"
                onClick={getInputData}
                sx={{
                  background: theme.palette.primary.focus,
                  color: theme.palette.primary.main,
                  height: "56px",
                  width: "100%",
                  letterSpacing: 2,
                  borderRadius: "8px",
                  "&:hover": {
                    background: theme.palette.primary.focus,
                    opacity: 0.9,
                  },
                }}
              >
                <SearchIcon sx={{ mr: 1 }} />
                Search
              </Button>
            </Box>
          </Box>

          {/* Bottom Row (1 Box) */}
          <Box width={"100%"} justifyContent={"center"}>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                value={selectedOption || ""}
                onChange={handleOptionSelect}
                sx={{
                  height: "56px",
                  width: "50%",
                  borderRadius: "8px",
                  fontSize: "16px",
                  color: theme.palette.text.secondary,
                  background: "white",
                }}
              >
                {options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeSearch;
