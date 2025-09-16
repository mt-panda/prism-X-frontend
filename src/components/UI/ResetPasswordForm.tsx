import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import LabelWithInput from "./LabelWithInput";
import ButtonPrimary from "./ButtonPrimary";
import apiClient from "../../utils/apiClient";

interface ResetPasswordFormProps {
  handleOpenModal: (mode: "signin" | "register") => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  handleOpenModal,
}) => {
  const theme = useTheme();
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleUserName = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const res: any = await apiClient.post(`/api/users/reset-password`, { email: userName });
      setMessage(res?.message || "If the account exists, a reset link was sent.");
    } catch (err: any) {
      setMessage(err?.message || "Failed to submit password reset.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Heading */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Barlow",
          fontSize: "22px",
          color: theme.palette.text.primary,
          fontWeight: "600",
          textAlign: "center",
          position: "relative",
        }}
      >
        Reset Password
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

      <Box>
        {/* Input */}
        <LabelWithInput
          label="Username or E-mail"
          id="name"
          value={userName}
          placeholder="Username"
          type="text"
          onChange={handleUserName}
        />

        {/* Submit button */}
        <ButtonPrimary
          type="submit"
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            height: "64px",
            px: 6,
            mt: "19px",
            borderRadius: 1,
            letterSpacing: "3px",
            fontFamily: "Barlow",
            fontSize: "14px",
            fontWeight: "600",
            "&:hover": {
              background: theme.palette.primary.dark,
              color: theme.palette.common.white,
              opacity: 0.9,
            },
          }}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "GET NEW PASSWORD"}
        </ButtonPrimary>

        {message && (
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            {message}
          </Typography>
        )}

        {/* Register link */}
        <Box
          sx={{
            fontSize: "16px",
            lineHeight: "29px",
            fontWeight: 400,
            fontFamily: "sans-serif",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            mt: "18px",
          }}
        >
          <Box>
            <Box sx={{ mt: "10px" }}>
              <span style={{ color: theme.palette.text.secondary }}>
                Don&apos;t have an account?
              </span>
              <span
                style={{
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  marginLeft: "4px",
                }}
                onClick={() => handleOpenModal("register")}
              >
                Register
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
