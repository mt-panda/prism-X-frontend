import React from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import DashboardCardItem from "./DashboardCardItem";

/* ---------------- Types ---------------- */
interface Place {
  id?: string;
  title?: string;
  desc?: string;
  [key: string]: any;
}

interface CreateListingProps {
  handleDeleteItem: (id: string) => void;
  setItems: React.Dispatch<React.SetStateAction<Place[]>>;
  items: Place[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  isAPIRunning: boolean;
}

const CreateListing: React.FC<CreateListingProps> = ({
  handleDeleteItem,
  setItems,
  items,
  setCurrentPage,
  currentPage,
  totalPages,
  isAPIRunning,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid
        container
        item
        sx={{
          textAlign: "center",
          display: "flex",
          ml: { lg: "15px", md: "-35px", sm: "-55px", xs: "-45px" },
          mr: { sm: "45px", xs: "32px", md: "0px" },
          justifyContent: items.length === 0 ? "center" : "flex-start",
          gap: { xs: "20px", lg: "10px", sm: "30px", md: "10px" },
        }}
        pt={{ xs: 4, md: 0 }}
        pb={{ xs: 8, md: 12 }}
        pr={{ xs: 0, md: "20px", sm: "0px" }}
        pl={{ xs: 0, sm: "0px" }}
        component="div"
        {...({} as any)}
      >
        {items.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ mt: -7, color: "black", fontSize: "25px" }}
          >
            No Listings Found
          </Typography>
        ) : (
          items.map((item, index) => (
            <DashboardCardItem
              key={item.id ?? index}
              item={{ ...item, id: item.id ?? String(index) }}
              handleDeleteItem={handleDeleteItem}
              isAPIRunning={isAPIRunning}
            />
          ))
        )}
      </Grid>
      {totalPages >= 1 && (
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            marginBottom: "60px !important",
            top: "-30px",
            position: "relative",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
};

export default CreateListing;
