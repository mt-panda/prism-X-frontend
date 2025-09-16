import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import DashboardListingSearch from "./DashboardListngSearch";
import DashboardListingCard from "./DashboardListingCard";
import { AuthContext } from "../../context/auth-context.tsx";
import { PendingCounterContext } from "../../context/pending-counter";

import ReplayIcon from "@mui/icons-material/Replay";
import DummyListing from "../Data/DummyListing";

/* ---------------- Types ---------------- */
interface Place {
  id: string;
  title?: string;
  desc?: string;
  [key: string]: any;
}

interface AuthContextType {
  userRole: number;
  token: string;
  userId: string;
}

interface PendingCounterContextType {
  counter: number;
  setCounter: (count: number) => void;
}

const DashboardListing: React.FC = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "";
  const auth = useContext(AuthContext) as AuthContextType;
  const { counter, setCounter } = useContext(
    PendingCounterContext
  ) as PendingCounterContextType;

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Place[]>([]);
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [accNTaxService, setAccNTaxService] = useState<string[]>([]);
  const [area, setArea] = useState<string[]>([]);
  const [region, setRegion] = useState<string>("");
  const [isAPIRunning, setIsAPIRunning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [resMsg, setResMsg] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [items, setItems] = useState<Place[]>([]);
  const [filteredItems, setFilteredItems] = useState<Place[]>([]);
  const itemsPerPage = 12;

  const handleDeleteItem = (id: string) => {
    const url =
      auth.userRole === 1
        ? `${backendUrl}/api/places/${id}`
        : `${backendUrl}/api/places/pendingDelete/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        const updatedData = items.filter((item) => item.id !== id);
        setItems(updatedData);
        setFilteredItems(updatedData);

        if (url.includes("pendingDelete")) {
          setCounter(counter + 1);
          console.log("true");
        } else {
          console.log("false");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setItems(DummyListing as Place[]);
      });
  };

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError(false);
      setIsAPIRunning(true);

      let url: string;
      if (auth.userRole === 1) {
        url = `${backendUrl}/api/places/?page=${page}&limit=${itemsPerPage}`;
      } else {
        url = `${backendUrl}/api/places/user/${auth.userId}?page=${page}&limit=${itemsPerPage}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setResMsg(errorData.message);
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      setItems(data.places);
      setFilteredItems(data.places);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setItems(DummyListing as Place[]);
      setIsAPIRunning(false);
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <Grid container spacing={3} sx={{ overflow: "scroll", height: "100vh" }}>
      <DashboardListingSearch
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        data={filteredItems}
        category={category}
        setCategory={setCategory}
        setCity={setCity}
        city={city}
        item={items}
        setItems={setItems}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        accNTaxService={accNTaxService}
        setAccNTaxService={setAccNTaxService}
        area={area}
        setArea={setArea}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        setRegion={setRegion}
        region={region}
        setTotalPages={setTotalPages}
      />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
            ml: "700px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
            ml: "550px",
          }}
        >
          <Typography fontSize={"16px"} color="error" gutterBottom>
            Error fetching Listings, Please try again.
          </Typography>
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={() => fetchData(currentPage)}
          >
            <ReplayIcon fontSize="inherit" />
          </IconButton>
        </Box>
      ) : (
        <DashboardListingCard
          items={items}
          handleDeleteItem={handleDeleteItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItems={setItems}
          totalPages={totalPages}
          resMsg={resMsg}
          isAPIRunning={isAPIRunning}
        />
      )}
    </Grid>
  );
};

export default DashboardListing;
