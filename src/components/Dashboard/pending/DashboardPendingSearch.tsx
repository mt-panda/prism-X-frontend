import React, { useState, useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ButtonPrimary from "../../../components/UI/ButtonPrimary";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { AuthContext } from "../../../context/auth-context.tsx";

/* ---------------- Types ---------------- */
interface Option {
  value: string;
  label: string;
}

interface Place {
  id: string;
  title?: string;
  category?: string;
  priceRange?: string;
  area?: string[];
  region?: string;
  city?: string;
  accountingAndTaxService?: string[];
  [key: string]: any;
}

interface DashboardPendingSearchProps {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchKeyword: string;
  propertyType: string;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;
  setFilteredData: React.Dispatch<React.SetStateAction<Place[]>>;
  filteredData: Place[];
  data: Place[];
  category: string;
  items: Place[];
  setItems: React.Dispatch<React.SetStateAction<Place[]>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  priceRange: string;
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;
  accNTaxService: string[];
  setAccNTaxService: React.Dispatch<React.SetStateAction<string[]>>;
  setArea: React.Dispatch<React.SetStateAction<string>>;
  area: string;
}

const DashboardPendingSearch: React.FC<DashboardPendingSearchProps> = ({
  setSearchKeyword,
  searchKeyword,
  propertyType,
  setPropertyType,
  setFilteredData,
  filteredData,
  data,
  category,
  items,
  setItems,
  setCategory,
  region,
  setRegion,
  city,
  setCity,
  priceRange,
  setPriceRange,
  accNTaxService,
  setAccNTaxService,
  setArea,
  area,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string; // vite-style env
  const auth = useContext(AuthContext);

  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [priceRangeOptions, setPriceRangeOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [areaOptions, setAreaOptions] = useState<Option[]>([]);
  const [serviceOptions, setServiceOptions] = useState<Option[]>([]);
  const [service, setService] = useState("");
  const [accountingAndTaxService, setAccountingAndTaxService] = useState("");
  const [cityOptions, setCityOptions] = useState<Option[]>([]);
  const [regionOptions, setRegionOptions] = useState<Option[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  /* ---------------- Options Setup ---------------- */
  useEffect(() => {
    const categories = [
      ...new Set(data.map((item) => item.category).filter(Boolean)),
    ];
    setCategoryOptions(
      categories.map((category) => ({ value: category!, label: category! }))
    );

    const priceRanges = [
      ...new Set(data.map((item) => item.priceRange).filter(Boolean)),
    ];
    setPriceRangeOptions(
      priceRanges.map((range) => ({ value: range!, label: range! }))
    );

    const areas = [...new Set(data.flatMap((item) => item.area || []))];
    setAreaOptions(areas.map((area) => ({ value: area, label: area })));

    const services = [
      ...new Set(data.flatMap((item) => item.accountingAndTaxService || [])),
    ];
    setServiceOptions(services.map((s) => ({ value: s, label: s })));

    if (!categories.includes(category)) setCategory("");
    if (!priceRanges.includes(priceRange)) setPriceRange("");
    if (!areas.includes(area)) setArea("");

    const regions = [
      ...new Set(data.map((item) => item.region).filter(Boolean)),
    ];
    setRegionOptions(
      regions.map((region) => ({ value: region!, label: region! }))
    );
    if (!regions.includes(region)) setRegion("");

    if (region) {
      const filteredCities = data
        .filter((item) => item.region === region)
        .flatMap((item) => item.city || []);
      const uniqueCities = [...new Set(filteredCities)];
      setCityOptions(
        uniqueCities.map((city) => ({ value: city, label: city }))
      );
    }
  }, [data, category, priceRange, area, accountingAndTaxService, region]);

  /* ---------------- Handlers ---------------- */
  const toggleAdvancedSearch = () =>
    setIsAdvancedSearchVisible((prev) => !prev);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      setError(false);

      const searchParams: Record<string, string> = {};
      if (category) searchParams.category = category;
      if (searchKeyword) searchParams.title = searchKeyword;
      if (priceRange) searchParams.priceRange = priceRange;
      if (city) searchParams.city = city;
      if (area) searchParams.area = area;
      if (region) searchParams.region = region;

      let url: string;
      if (auth.userRole === 1) {
        url = `${backendUrl}/api/pendings/?`;
      } else {
        url = `${backendUrl}/api/places/user/${auth.userId}`;
      }

      const response = await axios.get(url, {
        params: { search: JSON.stringify(searchParams) },
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setItems(response.data.places);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPriceRange(event.target.value as string);
    checkIfFilterApplied(
      searchKeyword,
      category,
      event.target.value as string,
      area,
      region,
      city,
      accountingAndTaxService
    );
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
    checkIfFilterApplied(
      searchKeyword,
      event.target.value as string,
      priceRange,
      area,
      region,
      city,
      accountingAndTaxService
    );
  };

  const handleRegionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRegion(event.target.value as string);
    setCity("");
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      area,
      event.target.value as string,
      city,
      accountingAndTaxService
    );
  };

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCity(event.target.value as string);
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      area,
      region,
      event.target.value as string,
      accountingAndTaxService
    );
  };

  const handleAreaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setArea(event.target.value as string);
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      event.target.value as string,
      region,
      city,
      accountingAndTaxService
    );
  };

  const handleServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAccountingAndTaxService(event.target.value as string);
    checkIfFilterApplied(
      searchKeyword,
      category,
      priceRange,
      area,
      region,
      city,
      event.target.value as string
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

  /* ---------------- JSX ---------------- */
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
      {/* ... full JSX same as your original, unchanged ... */}
    </Container>
  );
};

export default DashboardPendingSearch;
