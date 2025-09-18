/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect, type FormEvent } from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import LabelWithInput from "./LabelWithInput";
import ButtonPrimary from "./ButtonPrimary";
import { AuthContext } from "../../context/auth-context.tsx";
import apiClient from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";
import Pfp from "../../assets/images/userImg.png";

interface RegisterFormProps {
  handleOpenModal?: (mode: "signin" | "register" | "resetPassForm") => void;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleOpenModal,
  setIsModalOpen,
}) => {
  const theme = useTheme();
  // Base URL is centralized in apiClient
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [registerUserName, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [usernameError] = useState("");
  const [emailError] = useState("");
  const [passwordError] = useState("");
  const [confirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch(Pfp)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "Pfptemp.jpg", { type: blob.type });
        setSelectedImage(file);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", registerUserName);
      formData.append("email", registerEmail);
      formData.append("password", registerPassword);
      formData.append("confirmPassword", confirmRegisterPassword);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const responseData: any = await apiClient.post(
        `/users/signup`,
        formData
      );

      if (responseData && responseData.data) {
        const { user, token } = responseData.data;

        auth.login(user.id, user.role, token, user.email);

        
          navigate("/dashboard");
       

        if (setIsModalOpen) {
          setIsModalOpen(false);
        }
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Box
      component="form"
      sx={{
        pt: { xs: 22, md: 0 },
        pb: { xs: 10, md: 0 },
        px: { xs: 0, sm: "20%", md: 0 },
      }}
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Barlow",
          fontSize: "22px",
          color: theme.palette.text.primary,
          fontWeight: 600,
          textAlign: "center",
          position: "relative",
        }}
      >
        Register
        <span
          style={{
            width: "50px",
            height: "2px",
            background: theme.palette.primary.main,
            position: "absolute",
            bottom: "-4px",
            left: "50%",
            marginLeft: "-25px",
          }}
        />
      </Typography>

      <Box sx={{ px: "30px" }}>
        <LabelWithInput
          label="Name"
          id="name"
          value={registerUserName}
          placeholder="Name"
          type="text"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        {usernameError && (
          <Typography
            variant="body2"
            sx={{ color: theme.palette.error.main, textAlign: "center", mt: 1 }}
          >
            {usernameError}
          </Typography>
        )}

        <LabelWithInput
          label="Email Address"
          id="email"
          value={registerEmail}
          placeholder="Email Address"
          type="email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        {emailError && (
          <Typography
            variant="body2"
            sx={{ color: theme.palette.error.main, textAlign: "center", mt: 1 }}
          >
            {emailError}
          </Typography>
        )}

        <LabelWithInput
          label="Password"
          id="Password"
          value={registerPassword}
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
          type="password"
        />
        {passwordError && (
          <Typography
            variant="body2"
            sx={{ color: theme.palette.error.main, textAlign: "center", mt: 1 }}
          >
            {passwordError}
          </Typography>
        )}

        <LabelWithInput
          label="Re-enter Password"
          id="confirmPassword"
          value={confirmRegisterPassword}
          placeholder="Password"
          onChange={(e) => setConfirmRegisterPassword(e.target.value)}
          type="password"
        />
        {confirmPasswordError && (
          <Typography
            variant="body2"
            sx={{ color: theme.palette.error.main, textAlign: "center", mt: 1 }}
          >
            {confirmPasswordError}
          </Typography>
        )}

        {errorMessage && (
          <Typography
            variant="body2"
            sx={{ color: theme.palette.error.main, textAlign: "center", mt: 2 }}
          >
            {errorMessage}
          </Typography>
        )}

        <ButtonPrimary
          type="submit"
          sx={{
            background: theme.palette.primary.focus,
            color: theme.palette.primary.main,
            height: "64px",
            px: 6,
            mt: "19px",
            borderRadius: 1,
            letterSpacing: "3px",
            fontFamily: "Barlow",
            fontSize: "14px",
            fontWeight: 600,
            "&:hover": {
              background: theme.palette.primary.hover,
            },
            position: "relative",
          }}
        >
          {isLoading ? (
            <CircularProgress
              size={24}
              sx={{
                color: theme.palette.common.white,
                position: "absolute",
                top: "50%",
                left: "50%",
                mt: "-12px",
                ml: "-12px",
              }}
            />
          ) : (
            "REGISTER NOW"
          )}
        </ButtonPrimary>

        {/* login link */}
        <Box
          sx={{
            color: theme.palette.primary.focus,
            fontSize: "16px",
            lineHeight: "29px",
            letterSpacing: 1,
            fontWeight: 600,
            fontFamily: "sans-serif",
            textAlign: "center",
            mt: "18px",
          }}
        >
          <span style={{ color: theme.palette.text.secondary }}>
            Already have an account?
          </span>
          <span
            style={{ cursor: "pointer", marginLeft: "4px" }}
            onClick={() => handleOpenModal && handleOpenModal("signin")}
          >
            Login
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
