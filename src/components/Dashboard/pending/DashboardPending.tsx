import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../../../context/auth-context.tsx";
import { PendingCounterContext } from "./../../../context/pending-counter";

import ReplayIcon from "@mui/icons-material/Replay";
import DummyListing from "../../Data/DummyListing";
import DashboardPendingSearch from "./DashboardPendingSearch";
import PendingCard from "./PendingCard";

/* ---------------- Types ---------------- */
interface Place {
  id: string;
  [key: string]: any; // Extendable if backend returns extra fields
}

interface FetchResponse {
  places: Place[];
  totalPages: number;
  message?: string;
}

const DashboardPending: React.FC = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string; // vite-style env
  const auth = useContext(AuthContext);
  const pendingCounterContext = useContext(PendingCounterContext);
  const counter = pendingCounterContext?.counter ?? 0;
  const setCounter = pendingCounterContext?.setCounter ?? (() => {});

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Place[]>([]);
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [accNTaxService, setAccNTaxService] = useState<string[]>([]);
  const [area, setArea] = useState<string>("");
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

  /* ---------------- Handlers ---------------- */
  const handleDeleteItem = (id: string) => {
    fetch(`${backendUrl}/api/pendings/${id}`, {
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
        setCounter(counter - 1);
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
        url = `${backendUrl}/api/pendings/?page=${page}&limit=${itemsPerPage}`;
      } else {
        url = `${backendUrl}/api/pendings/users/${auth.userId}?page=1&limit=${itemsPerPage}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        const errorData = (await response.json()) as FetchResponse;
        setResMsg(errorData.message || "Something went wrong");
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = (await response.json()) as FetchResponse;
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

  /* ---------------- Lifecycle ---------------- */
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, setCounter]);

  return (
    <Grid
      container
      spacing={3}
      sx={{ overflow: "scroll", height: "100vh", pb: 5 }}
    >
      <DashboardPendingSearch
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
        items={items}
        setItems={setItems}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        accNTaxService={accNTaxService}
        setAccNTaxService={setAccNTaxService}
        area={area}
        setArea={setArea}
        setRegion={setRegion}
        region={region}
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
            aria-label="reload"
            size="medium"
            onClick={() => fetchData(currentPage)}
          >
            <ReplayIcon fontSize="inherit" />
          </IconButton>
        </Box>
      ) : (
        <PendingCard
          items={items}
          handleDeleteItem={handleDeleteItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItems={setItems}
          totalPages={totalPages}
          isAPIRunning={isAPIRunning}
          authRole={auth.userRole || 0}
          fetchData={fetchData}
        />
      )}
    </Grid>
  );
};

export default DashboardPending;
