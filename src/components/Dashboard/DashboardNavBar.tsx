import {
  Box,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState, type MouseEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import PfP from "../../assets/images/userImg.png";
import { AuthContext } from "../../context/auth-context.tsx";

/* ---------------- Types ---------------- */
interface AuthContextType {
  logout: () => void;
}

const DashboardNavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const auth = useContext(AuthContext) as AuthContextType;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    auth.logout();
    handleClose();
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "flex-end",
        bgcolor: "transparent",
        paddingRight: { md: "80px", sm: "20px", xs: "20px" },
        paddingTop: "25px",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <Grid
        sx={{
          display: "flex",
          bgcolor: "#11161f",
          width: "auto",
          height: "60px",
          borderRadius: "40px",
          alignItems: "center",
          px: { md: "40px", sm: "40px", xs: "0px" },
          py: { md: "33px", sm: "33px", xs: "10px" },
        }}
      >
        <Link style={{ textDecoration: "none" }} to={"/"}>
          <Typography
            sx={{
              fontSize: { xs: "8px", sm: "16px", md: "16px" },
              color: "#fff",
              my: "10px",
              mr: { md: "10px", sm: "10px", xs: "5px" },
              ml: { md: "10px", sm: "10px", xs: "10px" },
              cursor: "pointer",
              "&:hover": { color: "#1c9ac0" },
            }}
          >
            Home
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/about-us"}>
          <Typography
            sx={{
              fontSize: { xs: "8px", sm: "16px", md: "16px" },
              color: "#fff",
              my: "10px",
              mx: { md: "10px", sm: "10px", xs: "5px" },
              cursor: "pointer",
              "&:hover": { color: "#1c9ac0" },
            }}
          >
            About Us
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/listings"}>
          <Typography
            sx={{
              fontSize: { xs: "8px", sm: "16px", md: "16px" },
              color: "#fff",
              my: "10px",
              mx: { md: "10px", sm: "10px", xs: "5px" },
              cursor: "pointer",
              "&:hover": { color: "#1c9ac0" },
            }}
          >
            Listings
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/blog"}>
          <Typography
            sx={{
              fontSize: { xs: "8px", sm: "16px", md: "16px" },
              color: "#fff",
              my: "10px",
              mx: { md: "10px", sm: "10px", xs: "5px" },
              cursor: "pointer",
              "&:hover": { color: "#1c9ac0" },
            }}
          >
            Blog
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/contact"}>
          <Typography
            sx={{
              fontSize: { xs: "8px", sm: "16px", md: "16px" },
              color: "#fff",
              my: "10px",
              mx: { md: "10px", sm: "10px", xs: "5px" },
              cursor: "pointer",
              "&:hover": { color: "#1c9ac0" },
            }}
          >
            Contact
          </Typography>
        </Link>
        <Box sx={{ py: "20px", px: { sm: "20px", xs: "10px" } }}>
          <IconButton onClick={handleClick}>
            <img
              src={PfP}
              height="30px"
              width="30px"
              style={{ borderRadius: "50%" }}
              alt="User"
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ mt: "10px", p: "10px" }}
            PaperProps={{
              sx: { bgcolor: "#ffffff" },
            }}
          >
            <MenuItem
              sx={{
                fontSize: { xs: "8px", sm: "16px", md: "16px" },
                color: "black",
                cursor: "pointer",
                bgcolor: "#ffffff",
                px: "16px",
                py: "2px",
                "&:hover": { color: "#1c9ac0", bgcolor: "#ffffff" },
              }}
              onClick={handleLogout}
            >
              <Typography component="span" sx={{ marginRight: "10px" }}>
                Logout
              </Typography>
              <Logout />
            </MenuItem>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardNavBar;
