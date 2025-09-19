// import { Grid } from "@mui/material";
// import React, { useContext, useState } from "react";
// import { useLocation } from "react-router-dom";
// import DashboardSidebar from "../components/Dashboard/DashboardSideBar";
// import DashboardNavBar from "../components/Dashboard/DashboardNavBar";
// import CreateUser from "../components/Dashboard/CreateUser";
// import DashboardListing from "../components/Dashboard/DashboardListing";
// import CreateListing from "../components/Dashboard/CreateListing";
// import { DashboardContext } from "../context/DashboardContext";
// import DashboardPending from "../components/Dashboard/pending/DashboardPending";

// /* ---------------- Types ---------------- */
// interface DashboardContextType {
//   selectedSection: string;
// }

// const DashBoard: React.FC = () => {
//   const [triggerResetForm, setTriggerResetForm] = useState<boolean>(false);

//   // Use context safely
//   const context = useContext(DashboardContext) as
//     | DashboardContextType
//     | undefined;

//   if (!context) {
//     throw new Error("DashBoard must be used within a DashboardProvider");
//   }

//   const { selectedSection } = context;

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const id: string | null = queryParams.get("id");

//   const renderSection = (): React.ReactNode => {
//     switch (selectedSection) {
//       case "/dashboard/createuser":
//         return <CreateUser />;

//       case "/dashboard/createlisting":
//         return (
//           <CreateListing
//             triggerResetForm={triggerResetForm}
//             setTriggerResetForm={setTriggerResetForm}
//           />
//         );

//       case `/dashboard/createlisting/update?id=${id}`:
//         return (
//           <CreateListing
//             triggerResetForm={triggerResetForm}
//             setTriggerResetForm={setTriggerResetForm}
//           />
//         );

//       case "/dashboard/listings":
//         return <DashboardListing />;

//       case "/dashboard/pendings":
//         return <DashboardPending />;

//       default:
//         return (
//           <CreateListing
//             triggerResetForm={triggerResetForm}
//             setTriggerResetForm={setTriggerResetForm}
//           />
//         );
//     }
//   };

//   return (
//     <Grid sx={{ display: "flex", height: "100vh" }}>
//       <DashboardSidebar setTriggerResetForm={setTriggerResetForm} />
//       <Grid sx={{ display: "block", width: "100%", overflowY: "hidden" }}>
//         <DashboardNavBar />
//         {renderSection()}
//       </Grid>
//     </Grid>
//   );
// };

// export default DashBoard;







import React, { useState, useRef } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  ClickAwayListener,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardNavBar from "../components/Dashboard/DashboardNavBar";
import ProfileModal from "../components/Dashboard/ProfileModal";
import { Link } from "react-router-dom";
import logo from "../assets/images/navbar/WhiteLogo.png";
import collapsedLogo from "../assets/images/navbar/collapsedLogo.png";
import Listings from "../pages/Listings"

const drawerWidth = 310;
const collapsedWidth = 80;
const role = localStorage.getItem("userRole");

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Listings");
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileModalRef = useRef<any>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "Listings":
        return <Listings/>;
      case "Pending Listings":
        return (
          <Typography variant="h5">{/* Pending Listings Section */}</Typography>
        );
      case "Users":
        return <Typography variant="h5">{/* Users Section */}</Typography>;
      default:
        return <Typography variant="h5">Dashboard</Typography>;
    }
  };

  const getItemStyles = (tabName: string) => ({
    cursor: "pointer",
    justifyContent: collapsed ? "center" : "flex-start",
    color:
      activeTab === tabName
        ? theme.palette.primary.focus
        : theme.palette.common.white,
    transition: "all 0.2s ease-in-out",
    "&:hover .MuiListItemText-root": {
      color: theme.palette.primary.focus,
      transform: collapsed ? "none" : "scale(1.05) translateX(5px)",
    },
    "& .MuiListItemText-root": {
      transition: "all 0.2s ease-in-out",
      color:
        activeTab === tabName
          ? theme.palette.primary.focus
          : theme.palette.common.white,
      transform:
        activeTab === tabName && !collapsed
          ? "scale(1.05) translateX(5px)"
          : "none",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  });

  const drawerContent = (
    <>
      {/* Sidebar Header with collapse icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: 2,
          py: 2,
          width: "100%",
        }}
      >
        {!collapsed ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
              overflow: "hidden",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
              to="/"
            >
              <img src={logo} alt="logo" style={{ width: "200px" }} />
            </Link>
          </Box>
        ) : (
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            to="/"
          >
            <img src={collapsedLogo} alt="logo" style={{ width: "50px" }} />
          </Link>
        )}
      </Box>

      <List
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed ? "center" : "flex-start",
          gap: 2,
        }}
      >
        <ListItem
          component="div"
          onClick={() => setActiveTab("Listings")}
          sx={getItemStyles("Listings")}
        >
          <ListItemIcon
            sx={{ color: "inherit", minWidth: collapsed ? "auto" : 56 }}
          >
            <ListIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Listings" />}
        </ListItem>
        <ListItem
          component="div"
          onClick={() => setActiveTab("Pending Listings")}
          sx={getItemStyles("Pending Listings")}
        >
          <ListItemIcon
            sx={{ color: "inherit", minWidth: collapsed ? "auto" : 56 }}
          >
            <PendingActionsIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Pending Listings" />}
        </ListItem>

        {role === "admin" && (
          <ListItem
            component="div"
            onClick={() => setActiveTab("Users")}
            sx={getItemStyles("Users")}
          >
            <ListItemIcon
              sx={{ color: "inherit", minWidth: collapsed ? "auto" : 56 }}
            >
              <GroupIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Users" />}
          </ListItem>
        )}
      </List>

      {/* Divider above Profile */}
      <Divider sx={{ bgcolor: theme.palette.primary.main, opacity: 0.5, width: "100%" }} />
      <List
        sx={{
          my: 2,
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <ListItem
          component="div"
          onClick={() => {
            setProfileOpen(true)
          }}
          sx={getItemStyles("Profile")}
        >
          <ListItemIcon
            sx={{ color: "inherit", minWidth: collapsed ? "auto" : 56 }}
          >
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Profile" />}
        </ListItem>
      </List>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.common.white,
        height: "100vh",
        p: 2,
      }}
    >
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? collapsedWidth : drawerWidth,
            boxSizing: "border-box",
            background: theme.palette.primary.hero,
            color: theme.palette.common.white,
            transition: "width 0.3s ease",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: collapsed ? "center" : "flex-start",
            m: 2,
            borderRadius: 3,
            height: "calc(100% - 32px)",
            p: 2,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "transparent",
          borderRadius: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "calc(100% - 32px)",
          position: "relative",
        }}
      >
        <DashboardNavBar
          role={role || ""}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: theme.palette.primary.main,
            borderRadius: 2,
            width: "100%",
          }}
        >
          {renderContent()}
        </Box>

        {/* Profile Modal with click-away close */}
        <ClickAwayListener
          onClickAway={() => {
            if (profileModalRef.current) profileModalRef.current.close();
          }}
        >
          <Box>
            <ProfileModal
              open={profileOpen}
              onClose={() => setProfileOpen(false)}
              role={role || undefined}
              collapsed={collapsed}
            />
          </Box>
        </ClickAwayListener>
      </Box>
    </Box>
  );
};

export default Dashboard;





