import { useContext, useEffect, useState } from "react";
import LoginForm from "./UI/LoginForm";
import RegisterForm from "./UI/RegisterForm";
import ResetPasswordForm from "./UI/ResetPasswordForm";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  styled, 
  Tab,
  Tabs,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Home, DataObject, Call, Menu } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/Book";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Topbar from "../components/Topbar";
import DrawerItems from "./Drawer";
import header from "../assets/images/home/newLogo.png";
import header_scrolled from "../assets/images/home/newLogo.png";
import { AuthContext } from "../context/auth-context.tsx";
import Modal from "./UI/Modal";

export const drawerWidth = 280;

// ---------------- Types ----------------
interface TabItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

type FormType = "signin" | "register" | "resetPassForm";

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  color: theme.palette.common.white,
  "&:hover": {
    color: theme.palette.primary.focus,
  },
  "&.Mui-selected": {
    color: theme.palette.primary.focus,
  },
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const tab: TabItem[] = [
  { label: "Home", path: "/", icon: <Home /> },
  { label: "About Us", path: "/about-us", icon: <DataObject /> },
  { label: "Listings", path: "/listings", icon: <FormatListNumberedIcon /> },
  { label: "Blog", path: "/blog", icon: <BookIcon /> },
  { label: "Contact", path: "/contact", icon: <Call /> },
];

function Navbar() {
  const theme = useTheme();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState<string | undefined>(() => {
    const currentPath = location.pathname;
    const validPaths = tab.map((item) => item.path);

    // Check if current path is a listing detail page
    if (currentPath.startsWith("/listings/") && currentPath !== "/listings") {
      return "/listings";
    } else if (validPaths.includes(currentPath)) {
      return currentPath;
    } else {
      return undefined;
    }
  });
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [isListingsPage, setIsListingsPage] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>("signin");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserExists(!!user);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const validPaths = tab.map((item) => item.path);

    // Check if current path is a listing detail page
    if (currentPath.startsWith("/listings/") && currentPath !== "/listings") {
      // For listing detail pages, set value to "/listings" to highlight the Listings tab
      setValue("/listings");
    } else if (validPaths.includes(currentPath)) {
      // For exact tab path matches, set the value
      setValue(currentPath);
    } else {
      // For other paths, set to undefined (not false) to avoid MUI warnings
      setValue(undefined);
    }

    setIsListingsPage(
      currentPath === "/404" ||
        currentPath.startsWith("/listings/") ||
        currentPath === "/dashboard" ||
        currentPath.startsWith("/404/")
    );
  }, [location.pathname]);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setScrolled(true);
    }
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else if (window.innerWidth > 900) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleOpenModal = (type: FormType) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSignIn = () => {
    console.log("auth object", auth);
    if (auth.isLoggedIn) {navigate("/dashboard")
    } else {
      handleOpenModal("signin");
    }
  };

  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  if (
    location?.pathname === "/dashboard" ||
    /^\/business\//.test(location?.pathname) ||
    isDashboardRoute
  ) {
    return null;
  }

  return (
    <>
      <Box>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              color: theme.palette.common.white,
              bgcolor: theme.palette.background.default,
            },
          }}
        >
          <DrawerItems tab={tab} handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>

      <AppBar
        sx={{
          background: scrolled
            ? theme.palette.primary.hover
            : isListingsPage
            ? theme.palette.primary.hover
            : "transparent",
          color: scrolled
            ? theme.palette.primary.main
            : theme.palette.primary.main,
          position: "fixed",
          zIndex: 4,
          pb: 0.6,
          transition: "0.32s ease-in-out",
          boxShadow: { md: !scrolled ? "none" : undefined },
        }}
        position="static"
      >
        {/* {!scrolled && <Topbar />} */}

        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{
              mr: 2,
              color: theme.palette.common.white,
              display: { md: "none" },
            }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>

          {/* Mobile Logo */}
          <Stack
            direction="row"
            display={{ xs: "flex", md: "none" }}
            justifyContent="center"
            width="100%"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <IconButton size="large">
                <img
                  src={scrolled ? header_scrolled : header}
                  alt="logo"
                  style={{
                    width: "70px",
                    marginRight: "15px",
                    boxShadow: "0px 0px 50px black",
                  }}
                />
              </IconButton>
            </Link>
          </Stack>

          {/* Desktop Nav */}
          <Stack
            direction="row"
            display={{ xs: "none", sm: "none", md: "flex" }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <IconButton size="large">
                <img
                  src={scrolled ? header_scrolled : header}
                  alt="logo"
                  style={{ width: "70px" }}
                />
              </IconButton>
            </Link>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tabs
                value={(() => {
                  const validPaths = tab.map((item) => item.path);
                  if (value && validPaths.includes(value)) {
                    return value;
                  }
                  if (location.pathname.startsWith("/listings/")) {
                    return "/listings"; // highlight Listings tab for detail pages
                  }
                  return false; // ✅ fallback, no warning
                })()}
                onChange={(_event, newValue) => setValue(newValue)}
                TabIndicatorProps={{ sx: { backgroundColor: "transparent" } }}
                sx={{ paddingTop: 1 }}
              >
                {tab.map(({ label, path }, index) => (
                  <StyledTab
                    key={index}
                    label={
                      <Link
                        to={path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {label}
                      </Link>
                    }
                    value={path}
                    disableRipple
                    sx={{
                      color: scrolled
                        ? theme.palette.common.white
                        : theme.palette.common.white,
                    }}
                  />
                ))}
              </Tabs>

              {/* Sign In / Dashboard Button */}
              <Button
                sx={{
                  background: theme.palette.primary.focus,
                  color: theme.palette.primary.main,
                  height: "42px",
                  minWidth: "150px",
                  px: 6,
                  borderRadius: (theme.shape.borderRadius as any) * 2,
                  "&:hover": {
                    background: theme.palette.primary.focus,
                    color: theme.palette.primary.main,
                    opacity: 0.9,
                  },
                }}
                onClick={handleSignIn}
              >
                {auth.isLoggedIn ? "Dashboard" : "Sign In"}
              </Button>
            </Stack>
          </Stack>
        </StyledToolbar>

        {/* Modal for Auth Forms */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {formType === "signin" ? (
            <LoginForm
              handleOpenModal={handleOpenModal}
              setIsModalOpen={setIsModalOpen}
            />
          ) : formType === "register" ? (
            <RegisterForm
              handleOpenModal={handleOpenModal}
              setIsModalOpen={setIsModalOpen}
            />
          ) : formType === "resetPassForm" ? (
            <ResetPasswordForm handleOpenModal={handleOpenModal} />
          ) : null}
        </Modal>
      </AppBar>
    </>
  );
}

export default Navbar;