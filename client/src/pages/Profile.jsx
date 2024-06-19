import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Avatar,
} from "@material-ui/core";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    marginBottom: theme.spacing(2),
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    margin: "auto", // Center the form horizontally
    padding: theme.spacing(3),
    backgroundColor: "#f9f9f9",
    borderRadius: theme.shape.borderRadius,
    // boxShadow: `0 2px 4px ${theme.palette.primary.main}`,
  },
  form: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  card: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "95%", 
    justifyContent: "space-between", 
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 2px 4px ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(1),
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: `0 6px 12px ${theme.palette.primary.main}`,
    }
  },
  cardMedia: {
    width: "35%", 
    height: 260,
    objectFit: "cover",
  },
  cardDetails: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  cardContent: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  createListingButton: {
    marginBottom: theme.spacing(0),
    margin: theme.spacing(3, 0, 1),
    backgroundColor: "#8e24aa",
    "&:hover": {
      backgroundColor: "#7b1fa2",
    },
  },
  editButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: "#7b1fa2",
  },
  signOutButton: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  delButton: {
    display: "flex",
    justifyContent: "end",
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    backgroundColor: "#8e24aa",
    "&:hover": {
      backgroundColor: "#7b1fa2",
    },
  },
}));

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
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#f44336", // Helper text color when error
    },
  },
})(TextField);

const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Modern House",
      description:
        "Description of the listing goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$100",
      image:
        "https://static.vecteezy.com/system/resources/previews/023/309/047/non_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
    },
    {
      id: 2,
      title: "Luxury Apartment",
      description:
        "Another listing description. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      price: "$150",
      image:
        "https://static.vecteezy.com/system/resources/previews/023/309/047/non_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
    },
    {
      id: 3,
      title: "Cozy Cottage",
      description:
        "Third listing description. Excepteur sint oat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: "$80",
      image:
        "https://static.vecteezy.com/system/resources/previews/023/309/047/non_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
    },
  ];

  const handleCreateListing = () => {
    // Handle logic for creating a new listing
    console.log("Creating a new listing...");
  };

  const handleDeleteAccount = () => {
    console.log("Deleting user account...");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.avatarContainer}>
        {currentUser.photo ? (
          <Avatar
            alt={currentUser.name}
            src={currentUser.photo}
            className={classes.avatar}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                currentUser.name
              )}&background=random&color=fff`;
            }}
          />
        ) : (
          <Avatar>{currentUser.name?.charAt(0).toUpperCase()}</Avatar>
        )}
      </div>
      <div className={classes.signOutButton}>
        <Button
          disableRipple
          size="small"
          type="submit"
          variant="text"
          color="primary"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CssTextField
                id="username"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                // Add value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                id="email"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                // Add value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                id="password"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Password"
                name="password"
                type="password"
                // Add value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                disableRipple
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateListing}
          className={classes.createListingButton}
        >
          Create Listing
          <AddOutlinedIcon sx={{ width: 30, height: 30 }} />
        </Button>
      </div>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} key={card}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={card.image}
                title={card.title}
              />
              <div className={classes.cardDetails}>
                <CardContent className={classes.cardContent}>
                  <Typography component="h2" variant="h6">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {card.description}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {card.price}
                  </Typography>
                </CardContent>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  size="small"
                  className={classes.editButton}
                >
                  <EditIcon />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className={classes.delButton}>
        <Button
          disableRipple
          size="small"
          type="submit"
          variant="text"
          color="primary"
          className={classes.deleteButton}
        >
          Delete Account
          <IconButton
            disableFocusRipple
            disableTouchRipple
            aria-label="delete-account"
            className={classes.deleteButton}
            onClick={handleDeleteAccount}
          >
            <DeleteIcon />
          </IconButton>
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
