import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSideBar";
import DashboardNavBar from "../components/Dashboard/DashboardNavBar";
import CreateUser from "../components/Dashboard/CreateUser";
import DashboardListing from "../components/Dashboard/DashboardListing";
import CreateListing from "../components/Dashboard/CreateListing";
import { DashboardContext } from "../context/DashboardContext";
import DashboardPending from "../components/Dashboard/pending/DashboardPending";

/* ---------------- Types ---------------- */
interface DashboardContextType {
  selectedSection: string;
}

const DashBoard: React.FC = () => {
  const [triggerResetForm, setTriggerResetForm] = useState<boolean>(false);

  // Use context safely
  const context = useContext(DashboardContext) as
    | DashboardContextType
    | undefined;

  if (!context) {
    throw new Error("DashBoard must be used within a DashboardProvider");
  }

  const { selectedSection } = context;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id: string | null = queryParams.get("id");

  const renderSection = (): React.ReactNode => {
    switch (selectedSection) {
      case "/dashboard/createuser":
        return <CreateUser />;

      case "/dashboard/createlisting":
        return (
          <CreateListing
            triggerResetForm={triggerResetForm}
            setTriggerResetForm={setTriggerResetForm}
          />
        );

      case `/dashboard/createlisting/update?id=${id}`:
        return (
          <CreateListing
            triggerResetForm={triggerResetForm}
            setTriggerResetForm={setTriggerResetForm}
          />
        );

      case "/dashboard/listings":
        return <DashboardListing />;

      case "/dashboard/pendings":
        return <DashboardPending />;

      default:
        return (
          <CreateListing
            triggerResetForm={triggerResetForm}
            setTriggerResetForm={setTriggerResetForm}
          />
        );
    }
  };

  return (
    <Grid sx={{ display: "flex", height: "100vh" }}>
      <DashboardSidebar setTriggerResetForm={setTriggerResetForm} />
      <Grid sx={{ display: "block", width: "100%", overflowY: "hidden" }}>
        <DashboardNavBar />
        {renderSection()}
      </Grid>
    </Grid>
  );
};

export default DashBoard;
