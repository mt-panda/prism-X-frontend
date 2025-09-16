import { useState, useContext, type MouseEvent } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Button,
  Modal,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Room, Call, OpenInNew, Edit, Delete, Star } from "@mui/icons-material";
import { DashboardContext } from "./../../context/DashboardContext";

/* ---------------- Types ---------------- */
interface Place {
  id: string;
  title?: string;
  desc?: string;
  address?: string;
  phone?: string;
  website?: string;
  businessBanner?: string;
  businessLogo?: string;
  listFor?: string;
  [key: string]: any;
}

interface DashboardCardItemProps {
  item: Place;
  handleDeleteItem: (id: string) => void;
  isAPIRunning: boolean;
}

interface DashboardContextType {
  selectedSection: string;
  setSelectedSection: (s: string) => void;
}

const DashboardCardItem: React.FC<DashboardCardItemProps> = ({
  item,
  handleDeleteItem,
  isAPIRunning,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "";
  const [imgError, setImgError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { setSelectedSection } = useContext(
    DashboardContext
  ) as DashboardContextType;

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleEditClick = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    navigate(`/dashboard/createlisting/update?id=${id}&type=listing`);
    setSelectedSection(`/dashboard/createlisting/update?id=${id}`);
  };

  const truncateDescription = (description: string, maxLength: number) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = description;
    let plainText = tempElement.textContent || tempElement.innerText || "";
    plainText = plainText.trim();
    if (plainText.length > maxLength) {
      plainText = plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };

  const truncateTitle = (title: string | undefined, maxLength: number) => {
    if (title && title.length > maxLength) {
      return title.substring(0, maxLength) + "..";
    }
    return title;
  };

  const urlTitle = (website: string | undefined, maxLength: number) => {
    if (website && website.length > maxLength) {
      return website.substring(0, maxLength) + "..";
    }
    return website;
  };

  const truncateAddress = (address: string | undefined, maxLength: number) => {
    if (address && address.length > maxLength) {
      return address.substring(0, maxLength) + "..";
    }
    return address;
  };

  const handleDeleteClick = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = (id: string) => {
    handleDeleteItem(id);
    setShowDeleteModal(false);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const shouldHide = item.website === "https://www.example.com/";

  return (
    <>
      <Grid
        item
        xs={12}
        sm={5.4}
        md={3.7}
        lg={3.8}
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
              height: "100%",
              width: { lg: "auto", md: "110%", sm: "110%", xs: "105%" },
              pb: 0,
              position: "relative",
              transition: "transform 0.3s",
              borderRadius: "6px",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              "&:hover": {
                "& Button": {
                  color: "white",
                  opacity: 0.9,
                },
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "240px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                opacity: 1,
                transition: "opacity 0.3s",
              }}
            ></Box>

            <CardMedia
              component="img"
              height="240"
              width="110%"
              image={
                !imgError && item.businessBanner && isAPIRunning
                  ? `${backendUrl}/${item.businessBanner}`
                  : `${item.businessBanner}`
              }
              alt={item.title}
              onError={handleImageError}
            />

            {/* Edit + Delete buttons */}
            <Grid
              container
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "right",
                gap: 1,
                top: "10px",
                right: "20px",
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  border: "1px solid #fff",
                  padding: "4px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  backgroundColor: "#1c9ac0",
                }}
                onClick={(e) => handleEditClick(e, item.id)}
              >
                <Edit
                  sx={{
                    color: "#fff",
                    display: "flex",
                    margin: "auto",
                    position: "relative",
                    fontSize: "24px",
                    top: "3px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  borderRadius: "50%",
                  border: "1px solid #fff",
                  padding: "4px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  backgroundColor: "#1c9ac0",
                }}
                onClick={(e) => handleDeleteClick(e, item.id)}
              >
                <Delete
                  style={{
                    color: "#fff",
                    display: "flex",
                    margin: "auto",
                    position: "relative",
                    fontSize: "24px",
                    top: "3px",
                  }}
                />
              </Box>
            </Grid>

            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                letterSpacing: "1px",
                lineHeight: "2.4rem",
                position: "absolute",
                background: "white",
                borderRadius: "28px",
                left: "11px",
                top: "14px",
                padding: "0px 17px",
              }}
            >
              {item.listFor}
            </Typography>

            <Link
              to={`/listings/${item.id}?type=listing`}
              style={{ textDecoration: "none" }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  pb: 1,
                  width: "100%",
                  position: "relative",
                }}
              >
                {/* Title + Description + Address + Phone + Website */}
                <Box px={2}>
                  {/* Logo */}
                  <img
                    style={{
                      width: "63px",
                      height: "63px",
                      borderRadius: "50%",
                      border: "4px solid white",
                      position: "absolute",
                      top: "-34px",
                      left: "38px",
                    }}
                    src={
                      !imgError && item.businessLogo && isAPIRunning
                        ? `${backendUrl}/${item.businessLogo}`
                        : `${item.businessLogo}`
                    }
                    alt={item.title}
                    onError={handleImageError}
                  />

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "700",
                      lineHeight: "26px",
                      textAlign: "left",
                      cursor: "pointer",
                      marginTop: "30px",
                      fontFamily: "poppins",
                      fontSize: "18px",
                      color: "black",
                      "&:hover": { color: "#1c9ac0" },
                    }}
                  >
                    {truncateTitle(item.title, 30)}
                  </Typography>

                  {/* Desc */}
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontWeight: "500",
                      fontSize: "15px",
                      color: "#4a4a4a",
                    }}
                  >
                    {truncateDescription(item.desc ?? "", 30)}
                  </Typography>

                  {/* Address */}
                  <Typography variant="body2" sx={{ color: "#4a4a4a" }}>
                    <Room sx={{ fontSize: "20px", color: "#1c9ac0" }} />{" "}
                    {truncateAddress(item.address, 30)}
                  </Typography>

                  {/* Phone */}
                  <Typography variant="body2" sx={{ color: "#4a4a4a" }}>
                    <Call sx={{ fontSize: "20px", color: "#1c9ac0" }} />{" "}
                    <Link
                      onClick={handleLinkClick}
                      to={`tel:${item.phone}`}
                      style={{ textDecoration: "none", color: "unset" }}
                    >
                      {item.phone}
                    </Link>
                  </Typography>

                  {/* Website */}
                  <Typography variant="body2" sx={{ color: "#4a4a4a" }}>
                    <OpenInNew sx={{ fontSize: "20px", color: "#1c9ac0" }} />{" "}
                    {!shouldHide ? (
                      <Link
                        onClick={handleLinkClick}
                        to={`${item.website}`}
                        style={{ textDecoration: "none", color: "unset" }}
                      >
                        {urlTitle(item.website, 30)}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </Typography>
                </Box>
              </CardContent>
            </Link>
          </Card>
        </Box>
      </Grid>

      {/* Delete Modal */}
      <Modal open={showDeleteModal} onClose={handleCancelDelete}>
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
          }}
        >
          <Typography variant="h6" sx={{ color: "black" }}>
            Are you sure you want to delete this item?
          </Typography>
          <Box mt={2} sx={{ display: "flex", justifyContent: "right" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteId && handleDeleteConfirm(deleteId)}
              sx={{ mr: 1.5 }}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleCancelDelete}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DashboardCardItem;
