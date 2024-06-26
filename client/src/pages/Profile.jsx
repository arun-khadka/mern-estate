import React, { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
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
import {
  signOut,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches("images/.*")

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
    cursor: "pointer",
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
    },
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
    color: "#FFFFFF",
    padding: 5,
    backgroundColor: "#FF0000",
    "&:hover": {
      backgroundColor: "#FF1119",
    },
  },
  delButton: {
    display: "flex",
    justifyContent: "end",
    marginBottom: 6,
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
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  const handleAvatarClose = () => {
    setAvatarDialogOpen(false);
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    console.log("Current User:", currentUser); // Debugging line
  }, [currentUser]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatar(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
          setFileUploadError(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log("Updating user with ID:", currentUser.id); // Debugging line
      console.log("Form data being sent:", JSON.stringify(formData)); // Debugging line

      const res = await fetch(`/api/user/update/${currentUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status); // Debugging line
      const data = await res.json();
      console.log("Response data:", data); // Debugging line

      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      console.log("API response successful:", data); // Debugging line
      dispatch(updateUserSuccess(data));
    } catch (error) {
      console.error("Caught error:", error.message); // Debugging line
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/signin");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.avatarContainer}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <Avatar
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className={classes.avatar}
        />
      </div>
      <div className="ml-40">
        {fileUploadError ? (
          <span className="text-red-700">Error image upload</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-700">Image uploaded!</span>
        ) : (
          ""
        )}
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
                defaultValue={currentUser.name}
                name="username"
                autoComplete="username"
                onChange={handleChange}
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
                defaultValue={currentUser.email}
                name="email"
                autoComplete="email"
                onChange={handleChange}
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
                onChange={handleChange}
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
        <div className={classes.signOutButton}>
          <Button
            disableRipple
            size="small"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <Link to="/create-listing">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateListing}
            className={classes.createListingButton}
          >
            Create Listing
            <AddOutlinedIcon sx={{ width: 30, height: 30 }} />
          </Button>
        </Link>
      </div>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} key={card.id}>
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
          variant="contained"
          color="secondary"
          className={classes.deleteButton}
          onClick={handleDeleteAccount}
        >
          Delete Account
          <IconButton
            disableRipple
            aria-label="delete-account"
            className={classes.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
