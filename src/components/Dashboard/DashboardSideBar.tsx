import React, { useState, useEffect, useContext } from "react";
import PFP from "../../assets/images/userImg.png";
import { AuthContext } from "../../context/auth-context.tsx";
import { DashboardContext } from "../../context/DashboardContext";
import { PendingCounterContext } from "../../context/pending-counter";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import BookIcon from "@mui/icons-material/Book";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, IconButton, Box, Grid, Typography } from "@mui/material";
import {
  Home,
  DataObject,
  Call,
  Menu,
  Person,
  Inbox,
} from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

/* ---------------- Types ---------------- */
interface SideBarItem {
  icon: React.ReactNode;
  label: string;
  section: string;
  path: string;
}

interface DashboardSideBarProps {
  setTriggerResetForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  token: string;
  userId: string;
  userRole: number;
}

interface DashboardContextType {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

interface PendingCounterContextType {
  counter: number;
  setCounter: (c: number) => void;
}

/* ---------------- Data ---------------- */
const sideBarDataRole1: SideBarItem[] = [
  {
    icon: <Person />,
    label: "Create User",
    section: "createUser",
    path: "/dashboard/createuser",
  },
  {
    icon: <AddCircleIcon />,
    label: "Create/Update Listings",
    section: "createListings",
    path: "/dashboard/createlisting",
  },
  {
    icon: <Inbox />,
    label: "Listings",
    section: "listings",
    path: "/dashboard/listings",
  },
  {
    icon: <AccessTimeIcon />,
    label: "Pending Listings",
    section: "pendings",
    path: "/dashboard/pendings",
  },
];

const sideBarDataRole0: SideBarItem[] = [
  {
    icon: <AddCircleIcon />,
    label: "Create/Update Listings",
    section: "createListings",
    path: "/dashboard/createlisting",
  },
  {
    icon: <Inbox />,
    label: "Listings",
    section: "listings",
    path: "/dashboard/listings",
  },
  {
    icon: <AccessTimeIcon />,
    label: "Pending Listings",
    section: "pendings",
    path: "/dashboard/pendings",
  },
];

const tab = [
  { label: "Home", path: "/", icon: <Home /> },
  { label: "About Us", path: "/about-us", icon: <DataObject /> },
  { label: "Listings", path: "/listings", icon: <FormatListNumberedIcon /> },
  { label: "Blog", path: "/blog", icon: <BookIcon /> },
  { label: "Contact", path: "/contact", icon: <Call /> },
];

/* ---------------- Component ---------------- */
export default function DashboardSideBar({
  setTriggerResetForm,
}: DashboardSideBarProps) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);

  const authContext = useContext(AuthContext) as AuthContextType;
  const { selectedSection, setSelectedSection, user, setUser } = useContext(
    DashboardContext
  ) as DashboardContextType;
  const { counter, setCounter } = useContext(
      PendingCounterContext
  ) as unknown as PendingCounterContextType;

  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedSection(location.pathname);
  }, [location.pathname, setSelectedSection]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const responseData = await response.json();

        const currentUser = responseData.users.find(
          (u: User) => u.id === authContext.userId
        );
        setUser(currentUser);
        if (currentUser) {
          localStorage.setItem("userName", currentUser.username);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (authContext.userId) {
      fetchUserInfo();
    }
  }, [authContext.userId, backendUrl, authContext.token, setUser]);

  const handleItemClick = (path: string) => {
    setSelectedSection(path);
    navigate(path);
    if (window.innerWidth < 1200) {
      setMobileOpen(false);
    }
    setTriggerResetForm(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const filteredSideBarData: SideBarItem[] =
    authContext.userRole === 1 ? sideBarDataRole1 : sideBarDataRole0;

  const fetchData = async () => {
    try {
      let url: string;

      if (authContext.userRole === 1) {
        url = `${backendUrl}/api/pendings`;
      } else if (authContext.userRole === 0) {
        url = `${backendUrl}/api/pendings/users/${authContext.userId}`;
      } else {
        throw new Error("Unauthorized user role");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      setCounter(data.totalPlaces);
    } catch (err: any) {
      console.error("Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    authContext.userRole,
    authContext.userId,
    authContext.token,
    backendUrl,
    setCounter,
  ]);

  return (
    <>
      {user && (
        <Box>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mt: 4, ml: 2, color: "black", display: { lg: "none" } }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "220px",
                color: "textPrimary",
              },
            }}
          >
            <Box
              sx={{
                width: "220px",
                bgcolor: "#11161f",
                height: { md: "100vh", sm: "100vh", xs: "140vh" },
                position: "sticky",
                top: 0,
              }}
              role="presentation"
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ mb: "20px", pt: "30px" }}
              >
                <img
                  src={!imgError ? `${backendUrl}` : PFP}
                  alt="User Image"
                  height="70px"
                  width="70px"
                  style={{ borderRadius: "50%" }}
                  onError={handleImageError}
                />
                <Typography
                  sx={{
                    textAlign: "center",
                    mt: 1,
                    color: "white",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {user?.username}
                </Typography>
              </Grid>
              {filteredSideBarData.map((item, index) => (
                <Grid
                  key={index}
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => handleItemClick(item.path)}
                  sx={{
                    color: selectedSection === item.path ? "white" : "black",
                    bgcolor:
                      selectedSection === item.path ? "#1c9ac0" : "white",
                    pb: "10px",
                    mt: "10px",
                    px: "20px",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#1c9ac0", color: "white" },
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: "5px",
                      mt: "10px",
                    }}
                    component="div"
                    {...({} as any)}
                  >
                    <Typography sx={{ mt: "3px" }}>{item.icon}</Typography>
                    <Typography sx={{ ml: "20px" }}>{item.label}</Typography>
                    {item.label === "Pending Listings" && (
                      <Typography
                        sx={{
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          ml: "30px",
                          fontSize: "12px",
                        }}
                      >
                        {counter}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Drawer>
        </Box>
      )}

      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "none", lg: "block" },
          width: 350,
          bgcolor: "#11161f",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
        role="presentation"
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: "20px", pt: "30px" }}
        >
          <img
            src={!imgError ? `${backendUrl}` : PFP}
            alt="User Image"
            height="70px"
            width="70px"
            style={{ borderRadius: "50%" }}
            onError={handleImageError}
          />
          <Typography
            sx={{
              textAlign: "center",
              mt: 1,
              color: "white",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {user?.username}
          </Typography>
        </Grid>
        {filteredSideBarData.map((item, index) => (
          <Grid
            key={index}
            container
            direction="row"
            alignItems="center"
            onClick={() => handleItemClick(item.path)}
            sx={{
              color: selectedSection === item.path ? "white" : "black",
              bgcolor: selectedSection === item.path ? "#1c9ac0" : "white",
              pb: "10px",
              mt: "10px",
              px: "20px",
              cursor: "pointer",
              "&:hover": { bgcolor: "#1c9ac0", color: "white" },
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                ml: "10px",
                mt: "10px",
              }}
              component="div"
              {...({} as any)}
            >
              <Typography sx={{ mt: "6px" }}>{item.icon}</Typography>
              <Typography sx={{ ml: "15px" }}>{item.label}</Typography>
              {item.label === "Pending Listings" && (
                <Typography
                  sx={{
                    color: "white",
                    backgroundColor: "#707070",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: "55px",
                    fontSize: "12px",
                  }}
                >
                  {counter}
                </Typography>
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
}
