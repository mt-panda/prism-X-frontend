import React, { useState, useEffect, useContext, type ChangeEvent } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ButtonPrimary from "../UI/ButtonPrimary";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { AuthContext } from "../../context/auth-context.tsx";

/* ---------------- Types ---------------- */
interface Option {
  value: string;
  label: string;
}

interface Place {
  id?: string;
  title?: string;
  category?: string;
  priceRange?: string;
  area?: string[];
  accountingAndTaxService?: string[];
  region?: string;
  city?: string[];
  [key: string]: any;
}

interface DashboardListingSearchProps {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  data: Place[];
  category: string;
  setItems: React.Dispatch<React.SetStateAction<Place[]>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  priceRange: string;
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;
  setArea: React.Dispatch<React.SetStateAction<string>>;
  area: string;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardListngSearch: React.FC<DashboardListingSearchProps> = ({
  setSearchKeyword,
  searchKeyword,
  data,
  category,
  setItems,
  setCategory,
  region,
  setRegion,
  city,
  setCity,
  priceRange,
  setPriceRange,
  setArea,
  area,
  setTotalPages,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "";
  const auth = useContext(AuthContext);

  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] =
    useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [priceRangeOptions, setPriceRangeOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [areaOptions, setAreaOptions] = useState<Option[]>([]);
  const [serviceOptions, setServiceOptions] = useState<Option[]>([]);
  const [service, setService] = useState<string>("");
  const [accountingAndTaxService, setAccountingAndTaxService] =
    useState<string>("");
  const [cityOptions, setCityOptions] = useState<Option[]>([]);
  const [regionOptions, setRegionOptions] = useState<Option[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  /* ---------------- Effect: Build filter options ---------------- */
  useEffect(() => {
    const categories = [...new Set(data.map((item) => item.category))];
    setCategoryOptions(
      categories.map((category) => ({
        value: category || "",
        label: category || "",
      }))
    );

    const priceRanges = [...new Set(data.map((item) => item.priceRange))];
    setPriceRangeOptions(
      priceRanges.map((range) => ({
        value: range || "",
        label: range || "",
      }))
    );

    const areas = [...new Set(data.flatMap((item) => item.area || []))];
    setAreaOptions(
      areas.map((area) => ({
        value: area || "",
        label: area || "",
      }))
    );

    const services = [
      ...new Set(data.flatMap((item) => item.accountingAndTaxService || [])),
    ];
    setServiceOptions(
      services.map((service) => ({
        value: service || "",
        label: service || "",
      }))
    );

    if (!categories.includes(category)) setCategory("");
    if (!priceRanges.includes(priceRange)) setPriceRange("");
    if (!areas.includes(area)) setArea("");
    if (!accountingAndTaxService.includes(accountingAndTaxService))
      setAccountingAndTaxService("");

    const regions = [...new Set(data.map((item) => item.region))];
    setRegionOptions(
      regions.map((region) => ({
        value: region || "",
        label: region || "",
      }))
    );

    if (!regions.includes(region)) setRegion("");

    if (region) {
      const filteredCities = data
        .filter((item) => item.region === region)
        .flatMap((item) => item.city || []);
      const uniqueCities = [...new Set(filteredCities)];
      setCityOptions(
        uniqueCities.map((city) => ({
          value: city || "",
          label: city || "",
        }))
      );
    }
  }, [data, category, priceRange, area, accountingAndTaxService, region]);

  /* ---------------- Handlers ---------------- */
  const toggleAdvancedSearch = () => {
    setIsAdvancedSearchVisible((prev) => !prev);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    checkIfFilterApplied(
      event.target.value,
      category,
      priceRange,
      area,
      region,
      city,
      accountingAndTaxService
    );
    if (event.target.value === "") {
      handleButtonClick();
    }
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const searchParams: Record<string, string> = {};
      if (category) searchParams.category = category;
      if (searchKeyword) searchParams.title = searchKeyword;
      if (priceRange) searchParams.priceRange = priceRange;
      if (city) searchParams.city = city;
      if (area) searchParams.area = area;
      if (region) searchParams.region = region;

      const response = await axios.get(`${backendUrl}/api/places`, {
        params: { search: JSON.stringify(searchParams) },
      });
      setItems(response.data.places);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (event: any) => {
    setPriceRange(event.target.value);
    checkIfFilterApplied(
      searchKeyword,
      category,
      event.target.value,
      area,
      region,
      city,
      accountingAndTaxService
    );
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
    checkIfFilterApplied(
      searchKeyword,
      event.target.value,
      priceRange,
      area,
      region,
      city,
      accountingAndTaxService
    );
  };

  const handleRegionChange = (event: any) => {
    setRegion(event.target.value);
    setCity("");
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      area,
      event.target.value,
      city,
      accountingAndTaxService
    );
  };

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      area,
      region,
      event.target.value,
      accountingAndTaxService
    );
  };

  const handleAreaChange = (event: any) => {
    setArea(event.target.value);
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      event.target.value,
      region,
      city,
      accountingAndTaxService
    );
  };

  const handleServiceChange = (event: any) => {
    setAccountingAndTaxService(event.target.value);
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      area,
      region,
      city,
      event.target.value
    );
  };

  const checkIfFilterApplied = (
    searchKeyword: string,
    category: string,
    priceRange: string,
    area: string,
    region: string,
    city: string,
    accountingAndTaxService: string
  ) => {
    setIsFilterApplied(
      Boolean(
        searchKeyword ||
          category ||
          priceRange ||
          area ||
          region ||
          city ||
          accountingAndTaxService
      )
    );
  };

  const clearFilter = () => {
    setSearchKeyword("");
    setCategory("");
    setPriceRange("");
    setArea("");
    setAccountingAndTaxService("");
    setRegion("");
    setCity("");
    setItems(data);
    setIsFilterApplied(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: { sm: "0px", md: "0px 0px" },
        mt: "30px",
        ml: "auto",
        mr: "auto",
        width: { sm: "100%", xs: "100%", lg: "100%", md: "95%" },
      }}
    >
      {/* UI Code remains same as JSX version */}
      {/* ... keep your Grid/Paper/Controls code unchanged ... */}
    </Container>
  );
};

export default DashboardListngSearch;
