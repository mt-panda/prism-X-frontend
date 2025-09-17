import React, { useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import LabelWithInput from "./LabelWithInput";
import ButtonPrimary from "./ButtonPrimary";
import { AuthContext } from "../../context/auth-context.tsx";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

interface LoginFormProps {
  handleOpenModal?: () => void;
  setIsModalOpen?: (open: boolean) => void;
  loginref?: React.RefObject<HTMLInputElement>;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleOpenModal, setIsModalOpen, loginref }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserEmail = (e: any) => {
    setUserEmail(e.target.value);
    setEmailError("");
    setErrorMessage("");
  };

  const handleUserPassword = (e: any) => {
    setUserPassword(e.target.value);
    setPasswordError("");
    setErrorMessage("");
  };

  const validateEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: any) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setErrorMessage("");

    if (!userEmail) {
      setEmailError("Email is required.");
    }
    if (!userPassword) {
      setPasswordError("Password is required.");
    }

    if (userEmail && !validateEmail(userEmail)) {
      setEmailError("Please enter a valid email address.");
    }

    if (!userEmail || !userPassword || emailError || passwordError) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting login with backend URL:", backendUrl);
      console.log("Login payload:", { email: userEmail, password: userPassword });
      
      console.log("About to make fetch request...");
      const response = await fetch(`${backendUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });
            console.log("Fetch request completed, response received");
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      
      console.log("About to parse response JSON...");
      const responseData = await response.json();
      console.log("Response JSON parsed successfully");
      console.log("Login response:", responseData);
      
      if (response.ok && responseData.success) {
        const { user, token } = responseData.data;

        auth.login(
          user.id,
          user.role,
          token,
          user.email
        );

        if (user.role === "admin") {
          navigate("/dashboard/createuser");
        } else if (user.role === "user") {
          navigate("/dashboard/createlisting");
        }
        

        if (setIsModalOpen) {
          setIsModalOpen(false);
        }
      } else {
        console.log("Login failed - response not ok");
        console.log("Error response data:", responseData);
        setErrorMessage("Incorrect email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      ref={loginref}
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
          color: "rgb(22, 28, 38)",
          fontWeight: "600",
          textAlign: "center",
          position: "relative",
        }}
      >
        Login
        <span
          style={{
            content: '""',
            width: "50px",
            height: "2px",
            background: "#1c9ac0",
            position: "absolute",
            bottom: "-4px",
            left: "50%",
            marginLeft: "-25px",
            zIndex: 1,
          }}
        />
      </Typography>
      <Box sx={{ px: "30px" }}>
        <LabelWithInput
          label="Email Address"
          id="email"
          value={userEmail}
          placeholder="Email Address"
          type="email"
          onChange={handleUserEmail}
        />
        {emailError && (
          <Typography
            variant="body2"
            sx={{ color: "red", textAlign: "center", marginTop: 1 }}
          >
            {emailError}
          </Typography>
        )}
        <LabelWithInput
          label="Password"
          id="password"
          value={userPassword}
          placeholder="Password"
          onChange={handleUserPassword}
          type="password"
        />
        {passwordError && (
          <Typography
            variant="body2"
            sx={{ color: "red", textAlign: "center", marginTop: 1 }}
          >
            {passwordError}
          </Typography>
        )}
        {errorMessage && (
          <Typography
            variant="body2"
            sx={{ color: "red", textAlign: "center", marginTop: 2 }}
          >
            {errorMessage}
          </Typography>
        )}
        <ButtonPrimary
          type="submit"
          sx={{
            background: "#1c9ac0",
            color: "white",
            height: "64px",
            px: 6,
            marginTop: "19px",
            borderRadius: 1,
            letterSpacing: "3px",
            fontFamily: "Barlow",
            fontSize: "14px",
            fontWeight: "600",
            "&:hover": {
              background: "#1c9ac0",
              color: "white",
              opacity: 0.9,
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress
              size={24}
              sx={{
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          ) : (
            "Login"
          )}
        </ButtonPrimary>
        <Box
          sx={{
            color: "#1c9ac0",
            fontSize: "16px",
            lineHeight: "29px",
            fontWeight: 400,
            fontFamily: "sans-serif",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "18px",
            ml: "40px",
          }}
        >
          <Box>
            <Box
              sx={{ marginTop: "10px", display: { xs: "none", md: "block" } }}
            >
              <span style={{ color: "rgb(121, 127, 137)" }}>
                {" "}
                Don't have an account?
              </span>
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={handleOpenModal ? handleOpenModal : undefined}
              >
                {" "}
                Register
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
