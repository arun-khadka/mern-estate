import React, { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    backgroundColor: "#f8f8f8",
    width: "60%",
    marginLeft: theme.spacing(5),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0),
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "start",
    marginLeft: theme.spacing(2),
    cursor: "pointer",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    // margin: "auto",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  form: {
    width: "70%",
    marginBottom: theme.spacing(2),
  },
  card: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "90%",
    justifyContent: "space-between",
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 1px 4px ${theme.palette.primary.main}`,
    marginBottom: 1,
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: `0 3px 8px ${theme.palette.primary.main}`,
    },
  },
  cardMedia: {
    width: "35%",
    height: 230,
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
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  editButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: "#7b1fa2",
  },
  signOutButton: {
    display: "flex",
    justifyContent: "end",
  },
  deleteButton: {
    color: "#FFFFFF",
    padding: 5,
    backgroundColor: "#FF0000",
    "&:hover": {
      backgroundColor: "#FF1119",
    },
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
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
  chat: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "& .messages": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2.5),
      overflowY: "scroll",
      "& h1": {
        fontWeight: 300,
      },
      "& .message": {
        backgroundColor: "white",
        padding: theme.spacing(2.5),
        borderRadius: "0.675rem",
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2.5),
        cursor: "pointer",
        "& img": {
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          objectFit: "cover",
        },
        "& span": {
          fontWeight: "bold",
        },
      },
    },
    "& .chatBox": {
      flex: 1,
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "& .top": {
        backgroundColor: "#f7c14b85",
        padding: theme.spacing(2.5),
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& .user": {
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(2.5),
          "& img": {
            width: "1.875rem",
            height: "1.875rem",
            borderRadius: "50%",
            objectFit: "cover",
          },
        },
        "& .close": {
          cursor: "pointer",
        },
      },
      "& .center": {
        overflowY: "scroll",
        height: "21.875rem",
        padding: theme.spacing(2.5),
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2.5),
        "& .chatMessage": {
          width: "50%",
          "&.own": {
            alignSelf: "flex-end",
            textAlign: "right",
          },
          "& span": {
            fontSize: "0.75rem",
            backgroundColor: "#f7c14b85",
            padding: theme.spacing(0.5),
            borderRadius: "0.3125rem",
          },
        },
      },
      "& .bottom": {
        borderTop: "0.125rem solid #f7c14b85",
        height: "3.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& textarea": {
          flex: 3,
          height: "100%",
          border: "none",
          padding: theme.spacing(2.5),
        },
        "& button": {
          flex: 1,
          backgroundColor: "#f7c14b85",
          height: "100%",
          border: "none",
          cursor: "pointer",
        },
      },
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
  const [chat, setChat] = useState(true);
  const [showListingserror, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

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

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser.id}`);
      const data = await res.json();
      if (!data.success) {
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.signOutButton}>
        <Button
          disableRipple
          size="normal"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSignOut}
          style={{ marginTop: "10px" }}
        >
          Sign out
        </Button>
      </div>
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
            <Typography
              variant="h5"
              style={{ marginLeft: 5, color: "#7b1fa2" }}
            >
              User Details
            </Typography>
            <Grid item xs={12}>
              <CssTextField
                id="username"
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
            <AddOutlinedIcon sx={{ width: 25, height: 30 }} />
          </Button>
        </Link>
      </div>

      <Grid container spacing={0}>
        <Button
          variant="text"
          size="large"
          color="secondary"
          style={{
            marginLeft: "10px",
            marginBottom: "5px",
            fontWeight: 600,
            color: "#7b1fa2",
          }}
          onClick={handleShowListings}
        >
          Show Listings
        </Button>
        <div className="mx-2 mt-5 ">
          {showListingserror ? (
            <Typography variant="body2" color="error" gutterBottom>
              Error showing listings!
            </Typography>
          ) : (
            ""
          )}
        </div>

        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <Grid item xs={12} key={listing._id}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={listing.imageUrls[0]}
                />
                <div className={classes.cardDetails}>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      component="h2"
                      variant="h6"
                      style={{ color: "#7b1fa2", fontWeight: 600 }}
                    >
                      {listing.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      style={{ color: "#7b1fa2", fontWeight: 500 }}
                    >
                      {listing.description}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Rs {listing.regularPrice}
                    </Typography>
                  </CardContent>
                  <div
                    className={classes.cardActions}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Tooltip title="Edit" placement="bottom">
                      <IconButton
                        aria-label="edit"
                        size="small"
                        style={{ marginRight: 2 }}
                        className={classes.editButton}
                      >
                        <EditIcon sx={{ fontSize: 24 }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title="Delete"
                      placement="top"
                      PopperProps={{
                        popperOptions: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [-5, -5], // adjust the margin here
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        size="small"
                        style={{
                          color: "red",
                          marginRight: 8,
                          marginBottom: 6,
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 24 }} />
                      </IconButton>
                    </Tooltip>
                  </div>
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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Delete Account
          <IconButton
            disableTouchRipple
            aria-label="delete-account"
            style={{ padding: 0, marginLeft: 5 }}
          >
            <DeleteIcon style={{ fontSize: 20, color: "#FFFFFF" }} />
          </IconButton>
        </Button>
      </div>

      {/* <div className={classes.chat}>
        <div className="messages">
          <h1>Messages</h1>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Dog</span>
            <p>Hi, I have a really good offer...</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Dog</span>
            <p>Hi, I have a really good offer...</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Dog</span>
            <p>Hi, I have a really good offer...</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Dog</span>
            <p>Hi, I have a really good offer...</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Dog</span>
            <p>Hi, I have a really good offer...</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Dog</span>
            <p>Hi, I have a really good offer...</p>
          </div>
          <div className="message">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Dog</span>
            <p>Hi, I have a really good offer...</p>
          </div>
        </div>
        {chat && (
          <div className="chatBox">
            <div className="top">
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
                John Dog
              </div>
              <span className="close" onClick={() => setChat(null)}>
                X
              </span>
            </div>
            <div className="center">
              <div className="chatMessage own">
                <p>Hi, I have an another offer...</p>
                <span>1 hour ago</span>
              </div>
              <div className="chatMessage">
                <p>Hi, I have an another offer...</p>
                <span>1 hour ago</span>
              </div>
              <div className="chatMessage">
                <p>Hi, I have an another offer...</p>
                <span>1 hour ago</span>
              </div>
              <div className="chatMessage own">
                <p>Hi, I have an another offer...</p>
                <span>1 hour ago</span>
              </div>
              <div className="chatMessage">
                <p>Hi, I have an another offer...</p>
                <span>1 hour ago</span>
              </div>
              <div className="chatMessage own">
                <p>Hi, I have an another offer...</p>
                <span>1 hour ago</span>
              </div>
            </div>
            <div className="bottom">
              <textarea></textarea>
              <button>Send</button>
            </div>
          </div>
        )}
      </div> */}
    </Container>
  );
};

export default Profile;
