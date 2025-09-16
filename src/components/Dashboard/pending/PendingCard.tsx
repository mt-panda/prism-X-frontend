import React from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import PendingCardItemA from "./PendingCardItemA";

/* ---------------- Types ---------------- */
interface Place {
  id: string;
  [key: string]: any; // Extendable for other fields returned by backend
}

interface PendingCardProps {
  handleDeleteItem: (id: string) => void;
  setItems: React.Dispatch<React.SetStateAction<Place[]>>;
  items: Place[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  isAPIRunning: boolean;
  authRole: number;
  fetchData: (page: number) => Promise<void>;
}

const PendingCard: React.FC<PendingCardProps> = ({
  handleDeleteItem,
  setItems,
  items,
  setCurrentPage,
  currentPage,
  totalPages,
  isAPIRunning,
  authRole,
  fetchData,
}) => {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
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
          ml: { lg: "35px", md: "-35px", sm: "-55px", xs: "-45px" },
          mr: { sm: "45px", xs: "32px", md: "0px" },
          justifyContent: items.length === 0 ? "center" : "flex-start",
          gap: { xs: "20px", lg: "10px", sm: "30px", md: "10px" },
        }}
        pt={{ xs: 4, md: 0 }}
        pb={{ xs: 8, md: 4 }}
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
            <PendingCardItemA
              key={item.id ?? index}
              item={item}
              currentPage={currentPage}
            //   totalPages={totalPages}
              isAPIRunning={isAPIRunning}
              authRole={authRole}
              fetchData={fetchData}
            />
          ))
        )}
      </Grid>

      {items.length > 0 && (
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            marginBottom: "60px !important",
            top: "0px",
            position: "relative",
            justifyContent: "center",
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

export default PendingCard;
