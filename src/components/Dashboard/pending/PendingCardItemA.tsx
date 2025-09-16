import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Tooltip,
  Modal,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DefaultImg from "../../../assets/images/placeholder.png";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Edit } from "@mui/icons-material";
import { AuthContext } from "../../../context/auth-context.tsx";
import { PendingCounterContext } from "../../../context/pending-counter";

/* ---------------- Types ---------------- */
interface Place {
  id: string;
  title?: string;
  email?: string;
  userName?: string;
  typeOfChange?: string;
  image?: string;
  businessBanner?: string;
  businessLogo?: string;
  [key: string]: any;
}

interface PendingCardItemAProps {
  item: Place;
  isAPIRunning: boolean;
  authRole: number;
  currentPage: number;
  fetchData: (page: number) => Promise<void>;
}

const PendingCardItemA: React.FC<PendingCardItemAProps> = ({
  item,
  isAPIRunning,
  authRole,
  currentPage,
  fetchData,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string; // vite-style env
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const pendingCounterContext = useContext(PendingCounterContext);
  const counter = pendingCounterContext?.counter;
  const setCounter = pendingCounterContext?.setCounter;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* ---------------- Handlers ---------------- */
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const truncateDesc = (desc: string, maxLength: number) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = desc;
    return tempElement.textContent && tempElement.textContent.length > maxLength
      ? tempElement.textContent.substring(0, maxLength) + "..."
      : tempElement.textContent || "";
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const handleEditClick = (id: string) => {
    navigate(`/dashboard/createlisting/update?id=${id}&type=pending`);
  };

  const approveCard = async (id: string) => {
    fetch(`${backendUrl}/api/pendings/approve/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        if (typeof fetchData === "function") {
          fetchData(currentPage);
        }
        if (typeof setCounter === "function" && typeof counter === "number") {
          setCounter(counter - 1);
        }
        console.log("Card approved");
      })
      .catch((error) => {
        console.error("Failed to approve card:", error);
      });
  };

  const rejectCard = async (id: string) => {
    fetch(`${backendUrl}/api/pendings/reject/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        fetchData(currentPage);
        setCounter(counter - 1);
        console.log("Card Rejected");
      })
      .catch((error) => {
        console.error("Failed to reject card:", error);
      });
  };

  /* ---------------- JSX ---------------- */
  return (
    <Grid
      item
      xs={12}
      md={5.4 as any}
      lg={3.7 as any}
      sx={{
        padding: { xs: "5px", sm: "0px", md: "10px" },
        marginLeft: "13px",
      }}
      component="div"
      {...({} as any)}
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: { xs: "100%", lg: "300px" },
            width: "auto",
            position: "relative",
            transition: "transform 0.3s",
            borderRadius: "6px",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            "&:hover": {
              border: "1px solid #1c9ac0",
              "& Button": {
                color: "white",
                opacity: 0.9,
              },
            },
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "140px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              opacity: 1,
              transition: "opacity 0.3s",
            }}
          />
          {/* Banner */}
          <CardMedia
            component="img"
            height="140px"
            image={
              !imgError && item.businessBanner
                ? `${backendUrl}/${item.businessBanner}`
                : DefaultImg
            }
            alt={item.title || "Listing banner"}
            onError={handleImageError}
          />
          {/* Action Buttons */}
          <Grid
            container
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "right",
              gap: 1,
              top: "10px",
              right: "10px",
            }}
          >
            {authRole === 0 ? (
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                {/* Waiting for approval */}
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: "lightgray",
                    borderRadius: "30px",
                    padding: "5px 10px",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: "16px" }} />
                  <Typography sx={{ fontSize: "12px" }}>
                    Waiting for Approval
                  </Typography>
                </Grid>
                {/* Edit */}
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #fff",
                    padding: "4px",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    backgroundColor: "#1c9ac0",
                    display: item.typeOfChange === "Delete" ? "none" : "block",
                  }}
                  onClick={() => handleEditClick(item.id)}
                >
                  <Edit
                    sx={{
                      color: "#fff",
                      display: "flex",
                      margin: "auto",
                      position: "relative",
                      fontSize: "20px",
                      top: "3px",
                    }}
                  />
                </Box>
                {/* Reject */}
                <Box
                  sx={{
                    borderRadius: "50%",
                    padding: "4px",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    backgroundColor: "red",
                    display: item.typeOfChange === "Delete" ? "none" : "block",
                  }}
                  onClick={() => handleDeleteClick()}
                >
                  <CloseOutlinedIcon
                    style={{
                      color: "#fff",
                      display: "flex",
                      margin: "auto",
                      position: "relative",
                      fontSize: "20px",
                      top: "3px",
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                {/* Edit */}
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #fff",
                    padding: "4px",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    backgroundColor: "#1c9ac0",
                  }}
                  onClick={() => handleEditClick(item.id)}
                >
                  <Edit sx={{ color: "#fff", fontSize: "20px", top: "3px" }} />
                </Box>
                {/* Approve */}
                <Box
                  sx={{
                    borderRadius: "50%",
                    padding: "4px",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    backgroundColor: "#5cb85c",
                  }}
                  onClick={() => approveCard(item.id)}
                >
                  <DoneOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
                </Box>
                {/* Reject */}
                <Box
                  sx={{
                    borderRadius: "50%",
                    padding: "4px",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    backgroundColor: "red",
                  }}
                  onClick={() => handleDeleteClick()}
                >
                  <CloseOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
                </Box>
              </Box>
            )}
          </Grid>
          {/* Content */}
          <Link
            to={
              auth.userRole === 1 ? `/listings/${item.id}?type=pendings` : "#"
            }
            style={{ textDecoration: "none" }}
          >
            <CardContent
              sx={{ flexGrow: 1, width: "100%", position: "relative" }}
            >
              <Box py={0}>
                {/* Logo */}
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "1px solid #1c9ac0",
                    top: "-34px",
                    position: "absolute",
                  }}
                  src={
                    !imgError && item.businessLogo && isAPIRunning
                      ? `${backendUrl}/${item.businessLogo}`
                      : item.businessLogo || DefaultImg
                  }
                  alt={item.title || "Business Logo"}
                  onError={handleImageError}
                />
                {/* Title */}
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: "14px", color: "black" }}
                  >
                    Title:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, fontSize: "14px", color: "black" }}
                  >
                    {truncateDesc(item.title || "", 30)}
                  </Typography>
                </Box>
                {/* User */}
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: "14px", color: "black" }}
                  >
                    User:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, fontSize: "14px", color: "black" }}
                  >
                    {item.userName || "John Doe"}
                  </Typography>
                </Box>
                {/* Email */}
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: "14px", color: "black" }}
                  >
                    Email:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, fontSize: "14px", color: "black" }}
                  >
                    {item.email || "johndoe@gmail.com"}
                  </Typography>
                </Box>
                {/* Change Type */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: "14px", color: "black" }}
                  >
                    Change Type:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, fontSize: "14px", color: "black" }}
                  >
                    {item.typeOfChange}
                  </Typography>
                  {item.typeOfChange === "edit" && (
                    <Tooltip
                      title={
                        <Typography component="div" sx={{ color: "black" }}>
                          <li>Text Change</li>
                          <li>Field Change</li>
                        </Typography>
                      }
                      placement="top-start"
                      PopperProps={{
                        sx: {
                          "& .MuiTooltip-tooltip": {
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            color: "black",
                            backdropFilter: "blur(5px)",
                            border: "1px solid #1c9ac0",
                          },
                        },
                      }}
                    >
                      <HelpOutlineIcon
                        sx={{
                          ml: "0.2rem",
                          cursor: "pointer",
                          color: "gray",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Link>
        </Card>
      </Box>
      {/* Reject Modal */}
      <Modal
        open={showDeleteModal}
        onClose={handleCancelDelete}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-desc"
      >
        <Box
          sx={{
            bgcolor: "#fff",
            width: "300px",
            p: 4,
            borderRadius: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <Typography
            variant="h6"
            id="delete-modal-title"
            sx={{ color: "black" }}
          >
            Are you sure you want to reject this item?
          </Typography>
          <Box mt={2} sx={{ display: "flex", justifyContent: "right" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => rejectCard(item.id)}
              sx={{ mr: 1.5 }}
            >
              Reject
            </Button>
            <Button variant="outlined" onClick={handleCancelDelete}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default PendingCardItemA;
