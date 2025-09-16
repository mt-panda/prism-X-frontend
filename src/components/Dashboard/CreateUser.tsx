import { useState, useRef, useContext, type ChangeEvent, type FormEvent } from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import Pfp from "../../assets/images/Pfptemp.jpg";
import ButtonPrimary from "../UI/ButtonPrimary";
import LabelWithInput from "../UI/LabelWithInput";
import { AuthContext } from "../../context/auth-context.tsx";

/* ---------------- Types ---------------- */
interface FormField {
  name: string;
  placeholder: string;
  type: string;
  maxLength?: number;
  minLength?: number;
  disabled: boolean;
  options?: string[];
}

interface FormDataState {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface AuthContextType {
  userId: string;
}

const formData: FormField[] = [
  {
    name: "Name",
    placeholder: "Name",
    type: "text",
    maxLength: 30,
    disabled: false,
  },
  {
    name: "Email Address",
    placeholder: "E-mail",
    type: "email",
    maxLength: 50,
    disabled: false,
  },
  {
    name: "Role",
    placeholder: "Choose Role",
    type: "select",
    options: ["User", "Admin"],
    disabled: false,
  },
  {
    name: "Password",
    placeholder: "Password",
    type: "password",
    minLength: 6,
    maxLength: 8,
    disabled: false,
  },
  {
    name: "Confirm password",
    placeholder: "Confirm password",
    type: "password",
    disabled: false,
  },
];

const CreateUser: React.FC = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const userId = auth.userId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "";

  const { enqueueSnackbar } = useSnackbar();

  const [selectedImage, setSelectedImage] = useState<string>(Pfp);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formDataState, setFormDataState] = useState<FormDataState>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormDataState({});
    setFormErrors({});
    setSelectedImage(Pfp);
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setLoading(true);

    const errors: FormErrors = {};
    let hasError = false;

    formData.forEach((item) => {
      if (!formDataState[item.name]) {
        errors[item.name] = `${item.name} is required`;
        hasError = true;
      } else if (
        item.minLength &&
        formDataState[item.name].length < item.minLength
      ) {
        errors[
          item.name
        ] = `${item.name} must be at least ${item.minLength} characters long`;
        hasError = true;
      }
    });

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formDataState["Email Address"] &&
      !emailPattern.test(formDataState["Email Address"])
    ) {
      errors["Email Address"] = "Invalid email address";
      hasError = true;
    }

    // Password confirmation
    if (formDataState["Password"] !== formDataState["Confirm password"]) {
      errors["Confirm password"] = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    const role = formDataState["Role"] === "Admin" ? 1 : 0;

    const userData = new FormData();
    userData.append("username", formDataState["Name"]);
    userData.append("email", formDataState["Email Address"]);
    userData.append("password", formDataState["Password"]);
    userData.append("role", String(role));
    userData.append("userId", userId);

    try {
      const response = await fetch(`${backendUrl}/api/users/signup/admin`, {
        method: "POST",
        body: userData,
      });

      const responseData = await response.json();
      if (response.ok) {
        resetForm();
        enqueueSnackbar("User created successfully!", { variant: "success" });
      } else {
        setFormErrors({ apiError: responseData.message });
        enqueueSnackbar("Failed to create user", { variant: "error" });
      }
    } catch (err) {
      setFormErrors({
        apiError: "Something went wrong. Please try again later.",
      });
      enqueueSnackbar("Failed to create user", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = () => {
    return formData.every((item) => formDataState[item.name]);
  };

  return (
    <Grid
      container
      sx={{
        overflow: "scroll",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        alignItems={"center"}
        spacing={1}
        mt={4}
        mb={8}
        sx={{ overflow: "scroll", height: "100vh" }}
      >
        <Typography
          sx={{
            fontSize: { xs: "25px", sm: "32px" },
          }}
          variant="h5"
          color="#2d3954"
          style={{
            lineHeight: "42px",
            fontWeight: 600,
            fontFamily: "poppins",
          }}
        >
          CREATE A USER/ADMIN
        </Typography>
        <Typography
          variant="h6"
          color="#72809d"
          style={{
            fontSize: "16px",
            lineHeight: "22px",
            textAlign: "center",
            fontWeight: 400,
            fontFamily: "poppins",
          }}
        >
          Here you can create a user with admin privileges
        </Typography>

        <Box sx={{ width: { xs: "70vw", sm: "70vw", md: "50vw", lg: "30vw" } }}>
          {formData.map((item, index) => (
            <div key={index}>
              <LabelWithInput
                label={item.name}
                id={item.name}
                name={item.name}
                value={formDataState[item.name] || ""}
                placeholder={item.placeholder}
                type={item.type as "text" | "email" | "select" | "password" | undefined}
                disabled={item.disabled}
                onChange={handleInputChange}
                options={item.options || []}
                />
                {formErrors[item.name] && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "red",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {formErrors[item.name]}
                </Typography>
              )}
            </div>
          ))}
          {formErrors.apiError && (
            <Typography
              variant="body2"
              sx={{ color: "red", fontSize: "12px", marginTop: "14px" }}
            >
              {formErrors.apiError}
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
              cursor: loading ? "not-allowed" : "pointer",
              "&:hover": {
                background: "#1c9ac0",
                color: "white",
                opacity: 0.9,
              },
            }}
            onClick={handleSubmit}
            disabled={!isFormComplete() || loading}
          >
            {loading ? "..." : "Create"}
          </ButtonPrimary>
        </Box>
      </Stack>
    </Grid>
  );
};

const CreateUserWithSnackbar: React.FC = () => (
  <SnackbarProvider maxSnack={3}>
    <CreateUser />
  </SnackbarProvider>
);

export default CreateUserWithSnackbar;
