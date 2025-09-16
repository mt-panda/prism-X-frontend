import React, { useEffect, useState, useContext } from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Login, Input, Logout, Dashboard } from "@mui/icons-material";
import Close from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import header_scrolled from "../assets/images/header_scrolled.png";
import { AuthContext } from "../context/auth-context.tsx";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface DrawerItemsProps {
  tab: NavItem[];
  handleDrawerToggle: () => void;
}

const DrawerItems: React.FC<DrawerItemsProps> = ({
  tab,
  handleDrawerToggle,
}) => {
  const [userExists, setUserExists] = useState(false);
  const auth = useContext(AuthContext);
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserExists(!!user);
  }, []);

  const drawerTab: NavItem[] = [
    {
      label: "Login",
      path: "/login",
      icon: <Login />,
    },
    {
      label: "Register",
      path: "/signup",
      icon: <Input />,
    },
  ];

  const logoutTab: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard />,
    },
    {
      label: "Logout",
      path: "#",
      icon: <Logout />,
      onClick: () => {
        localStorage.clear();
        auth.logout();
        handleDrawerToggle();
      },
    },
  ];

  if (userExists) {
    drawerTab.pop();
  }

  const finalTab: NavItem[] = auth.isLoggedIn
    ? [...tab, ...logoutTab]
    : [...tab, ...drawerTab];

  return (
    <>
      {/* Top logo & close button */}
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row">
            <Link style={{ textDecoration: "none" }} to="/">
              <IconButton size="large">
                <img
                  src={header_scrolled}
                  alt="Logo"
                  style={{ width: "30px", marginTop: "4px" }}
                />
              </IconButton>
            </Link>
          </Stack>
          <Stack mt={0.6} mr={{ xs: -2, sm: -3 }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <Close />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>

      <Divider color="gainsboro" />

      {/* Navigation List */}
      <List sx={{ py: 0, mt: 2 }}>
        {finalTab.map((data, index) => {
          const isActive = location.pathname === data.path;

          return (
            <ListItem
              disablePadding
              key={index}
              component={data.path.startsWith("http") ? "a" : Link}
              to={data.path.startsWith("http") ? undefined : data.path}
              href={data.path.startsWith("http") ? data.path : undefined}
              target={data.path.startsWith("http") ? "_blank" : undefined}
              rel={
                data.path.startsWith("http") ? "noopener noreferrer" : undefined
              }
              sx={{
                color: isActive
                  ? theme.palette.primary.focus
                  : theme.palette.text.primary,
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : "inherit",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: isActive
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
                },
              }}
              onClick={data.onClick ? data.onClick : handleDrawerToggle}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? theme.palette.primary.focus
                      : theme.palette.text.primary,
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{ ml: -2 }}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                  primary={data.label}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default DrawerItems;
