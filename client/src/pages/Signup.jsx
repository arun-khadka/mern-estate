import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link as MuiLink,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import OAuth from "../components/OAuth";
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    // backgroundColor: theme.palette.info.main,
    backgroundColor: "#8e24aa",
    "&:hover": {
      backgroundColor: "#7b1fa2",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    margin: "auto", // Center the form horizontally
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #7b1fa2 ",
    boxShadow: `0 0 4px ${theme.palette.primary.main}`,
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    backgroundColor: "#8e24aa",
    "&:hover": {
      backgroundColor: "#7b1fa2",
    },
  },
}));

const CustomLink = withStyles({
  root: {
    color: "#7b1fa2", // Custom default link color
    "&:hover": {
      color: "#7b1fa2", // Custom link hover color
      textDecoration: "underline", // Optional: Add underline on hover
    },
  },
})(MuiLink);

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#7b1fa2", // Custom label color when focused
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7b1fa2", // Custom underline color when focused
    },
    "& .MuiFilledInput-root": {
      "&:before": {
        borderBottomColor: "gray", // Default border color
      },
      "&:hover :not(.Mui-disabled):before": {
        borderBottomColor: "#7b1fa2", // Border color when hovered
      },
      "&:after": {
        borderBottomColor: "#7b1fa2", // Border color when focused
      },
      "&.Mui-error:before": {
        borderBottomColor: "#f44336", // Border color when error
      },
      "&.Mui-error:after": {
        borderBottomColor: "#f44336", // Border color when error
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "#7b1fa2", // Border color when hovered
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7b1fa2", // Border color when focused
      },
      "&.Mui-error fieldset": {
        borderColor: "#f44336", // Border color when error
      },
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#FFFFFF",
      color: "#7b1fa2", // Custom input text color
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#f44336", // Helper text color when error
    },
    // "& .MuiIconButton-root": {
    //   backgroundColor: "#f1f0f1", // Custom background color for visibility icon
    //   color: "#7b1fa2", // Custom color for visibility icon
    //   "&:hover": {
    //     backgroundColor: "#e1e0e1", // Hover background color for visibility icon
    //   },
    // },
  },
})(TextField);

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegularSignUp = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setFieldErrors({
        username: !formData.username,
        email: !formData.email,
        password: !formData.password,
      });
    }

    // Client-side validation
    let validationError = null;

    switch (true) {
      case !formData.username && !formData.email && !formData.password:
        validationError = "All fields are required.";
        break;
      case !formData.username && !formData.password:
        validationError = "Username and password are required.";
        break;
      case !formData.email && !formData.password:
        validationError = "Email and password are required.";
        break;
      case !formData.username && !formData.email:
        validationError = "Username and email are required.";
        break;
      case !formData.username:
        validationError = "Username is required.";
        break;
      case !formData.email:
        validationError = "Email is required.";
        break;
      case !formData.password:
        validationError = "Password is required.";
        break;
      default:
        break;
    }

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (!data.success) {
        setLoading(false);
        if (data.errors) {
          let errors = {};
          data.errors.forEach((error) => {
            errors[error.param] = error.msg;
            toast.error(error.msg);
          });
          setFieldErrors(errors);
        } else {
          toast.error(data.message);
        }
        return;
      }
      setLoading(false);
      setError(null);
      toast.success("Signup successful!");
      navigate("/signin", {
        state: { successMessage: "Signup successful! Please log in." },
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };
  console.log(formData);

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google clicked");
    navigate("/");
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}

        <div className={classes.formContainer}>
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                  helperText={fieldErrors.username}
                  error={!!fieldErrors.username}
                  className={fieldErrors.username ? classes.error : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  helperText={fieldErrors.email}
                  error={!!fieldErrors.email}
                  className={fieldErrors.email ? classes.error : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{
                            marginRight: -8,
                            padding: 0,
                            disableRipple: true,
                          }}
                          disableRipple
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={fieldErrors.password}
                  error={!!fieldErrors.password}
                  className={fieldErrors.password ? classes.error : ""}
                />
              </Grid>
            </Grid>
            <Button
              id="signUpButton"
              type="submit"
              fullWidth
              disableRipple
              disabled={loading}
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
              onClick={handleRegularSignUp}
            >
              {loading ? (
                <CircularProgress aria-describedby="aria-busy" size={24} />
              ) : (
                "Sign up"
              )}
            </Button>
            <OAuth onGoogleSignIn={handleGoogleSignIn} />
            <Grid container justify="flex-end">
              <Grid item>
                <CustomLink component={Link} to="/signin" variant="body2">
                  Already have an account? Sign in
                </CustomLink>
              </Grid>
            </Grid>
          </form>
        </div>

        <ToastContainer
          // transition="bounce"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Container>
  );
};

export default Signup;
