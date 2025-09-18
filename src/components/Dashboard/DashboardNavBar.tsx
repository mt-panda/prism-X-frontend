// import {
//   Box,
//   Grid,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import React, { useState, type MouseEvent, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Logout } from "@mui/icons-material";
// import PfP from "../../assets/images/userImg.png";
// import { AuthContext } from "../../context/auth-context.tsx";

// /* ---------------- Types ---------------- */
// interface AuthContextType {
//   logout: () => void;
// }

// const DashboardNavBar: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const auth = useContext(AuthContext) as AuthContextType;

//   const handleClick = (event: MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     auth.logout();
//     handleClose();
//   };

//   return (
//     <Grid
//       container
//       sx={{
//         justifyContent: "flex-end",
//         bgcolor: "transparent",
//         paddingRight: { md: "80px", sm: "20px", xs: "20px" },
//         paddingTop: "25px",
//         position: "sticky",
//         top: 0,
//         zIndex: 999,
//       }}
//     >
//       <Grid
//         sx={{
//           display: "flex",
//           bgcolor: "#11161f",
//           width: "auto",
//           height: "60px",
//           borderRadius: "40px",
//           alignItems: "center",
//           px: { md: "40px", sm: "40px", xs: "0px" },
//           py: { md: "33px", sm: "33px", xs: "10px" },
//         }}
//       >
//         <Link style={{ textDecoration: "none" }} to={"/"}>
//           <Typography
//             sx={{
//               fontSize: { xs: "8px", sm: "16px", md: "16px" },
//               color: "#fff",
//               my: "10px",
//               mr: { md: "10px", sm: "10px", xs: "5px" },
//               ml: { md: "10px", sm: "10px", xs: "10px" },
//               cursor: "pointer",
//               "&:hover": { color: "#1c9ac0" },
//             }}
//           >
//             Home
//           </Typography>
//         </Link>
//         <Link style={{ textDecoration: "none" }} to={"/about-us"}>
//           <Typography
//             sx={{
//               fontSize: { xs: "8px", sm: "16px", md: "16px" },
//               color: "#fff",
//               my: "10px",
//               mx: { md: "10px", sm: "10px", xs: "5px" },
//               cursor: "pointer",
//               "&:hover": { color: "#1c9ac0" },
//             }}
//           >
//             About Us
//           </Typography>
//         </Link>
//         <Link style={{ textDecoration: "none" }} to={"/listings"}>
//           <Typography
//             sx={{
//               fontSize: { xs: "8px", sm: "16px", md: "16px" },
//               color: "#fff",
//               my: "10px",
//               mx: { md: "10px", sm: "10px", xs: "5px" },
//               cursor: "pointer",
//               "&:hover": { color: "#1c9ac0" },
//             }}
//           >
//             Listings
//           </Typography>
//         </Link>
//         <Link style={{ textDecoration: "none" }} to={"/blog"}>
//           <Typography
//             sx={{
//               fontSize: { xs: "8px", sm: "16px", md: "16px" },
//               color: "#fff",
//               my: "10px",
//               mx: { md: "10px", sm: "10px", xs: "5px" },
//               cursor: "pointer",
//               "&:hover": { color: "#1c9ac0" },
//             }}
//           >
//             Blog
//           </Typography>
//         </Link>
//         <Link style={{ textDecoration: "none" }} to={"/contact"}>
//           <Typography
//             sx={{
//               fontSize: { xs: "8px", sm: "16px", md: "16px" },
//               color: "#fff",
//               my: "10px",
//               mx: { md: "10px", sm: "10px", xs: "5px" },
//               cursor: "pointer",
//               "&:hover": { color: "#1c9ac0" },
//             }}
//           >
//             Contact
//           </Typography>
//         </Link>
//         <Box sx={{ py: "20px", px: { sm: "20px", xs: "10px" } }}>
//           <IconButton onClick={handleClick}>
//             <img
//               src={PfP}
//               height="30px"
//               width="30px"
//               style={{ borderRadius: "50%" }}
//               alt="User"
//             />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "center",
//             }}
//             sx={{ mt: "10px", p: "10px" }}
//             PaperProps={{
//               sx: { bgcolor: "#ffffff" },
//             }}
//           >
//             <MenuItem
//               sx={{
//                 fontSize: { xs: "8px", sm: "16px", md: "16px" },
//                 color: "black",
//                 cursor: "pointer",
//                 bgcolor: "#ffffff",
//                 px: "16px",
//                 py: "2px",
//                 "&:hover": { color: "#1c9ac0", bgcolor: "#ffffff" },
//               }}
//               onClick={handleLogout}
//             >
//               <Typography component="span" sx={{ marginRight: "10px" }}>
//                 Logout
//               </Typography>
//               <Logout />
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default DashboardNavBar;

import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save"; // placeholder
import CodeIcon from "@mui/icons-material/Code"; // placeholder
import PushPinIcon from "@mui/icons-material/PushPin"; // placeholder
import ImageIcon from "@mui/icons-material/Image"; // placeholder

const DashboardNavbar = ({ role }: { role: string }) => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fafafa",
        px: 2,
        py: 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {/* Left Side */}
        <Box flex={1}>
          <Typography variant="h6" fontWeight="600" color="text.primary">
            Dashboard
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontSize: 14, color: "text.secondary" }}
          >
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Dashboard <span style={{ color: theme.palette.primary.focus, textTransform: "capitalize" }}>({role})</span>
            </Link>
          </Breadcrumbs>
        </Box>

        {/* Right Side */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          flex={1}
          justifyContent="flex-end"
        >
          {/* Icon Buttons */}
          <IconButton
            sx={{ border: "1px solid #ccc", bgcolor: "white", borderRadius: 2 }}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ border: "1px solid #ccc", bgcolor: "white", borderRadius: 2 }}
          >
            <ImageIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ border: "1px solid #ccc", bgcolor: "white", borderRadius: 2 }}
          >
            <PushPinIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ border: "1px solid #ccc", bgcolor: "white", borderRadius: 2 }}
          >
            <CodeIcon fontSize="small" />
          </IconButton>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 200, bgcolor: "white", borderRadius: 2 }}
          />

          {/* Search button */}
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              bgcolor: theme.palette.primary.focus,
              opacity: 0.9,
              "&:hover": { opacity: 1 },
            }}
          >
            Search
          </Button>

          {/* Add New Listing button */}
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              bgcolor: theme.palette.primary.hero,
              color: "white",
              width: 160,
              textTransform: "none",
              opacity: 0.9,
              "&:hover": { opacity: 1 },
            }}
          >
            + Add New Listing
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardNavbar;