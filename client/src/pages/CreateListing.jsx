// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Checkbox,
//   MenuItem,
//   FormControlLabel,
//   Grid,
//   IconButton,
// } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   ref,
//   getDownloadURL,
//   getStorage,
//   uploadBytesResumable,
//   deleteObject,
// } from "firebase/storage";
// import { app } from "../firebase";
// import ClearIcon from "@mui/icons-material/Clear";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { CircularProgress } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(8),
//   },
//   checkboxGrid: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: 1,
//   },
//   imageList: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: theme.spacing(1),
//   },
//   imageContainer: {
//     position: "relative",
//     display: "inline-block",
//   },
//   deleteIcon: {
//     position: "absolute",
//     top: 4,
//     right: 4,
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//     borderRadius: "50%",
//     display: "none",
//   },
//   image: {
//     width: "100px",
//     height: "100px",
//     objectFit: "cover",
//     borderRadius: "8px",
//   },
// }));

// const CssTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "#7b1fa2",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#7b1fa2",
//   },
//   "&:before": {
//     borderBottomColor: "gray",
//   },
//   "&:hover:not(.Mui-disabled):before": {
//     borderBottomColor: "#7b1fa2",
//   },
//   "&:after": {
//     borderBottomColor: "#7b1fa2",
//   },
//   "&.Mui-error:before": {
//     borderBottomColor: "#f44336",
//   },
//   "&.Mui-error:after": {
//     borderBottomColor: "#f44336",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#7b1fa2",
//     },
//     "&:hover fieldset": {
//       borderColor: "#7b1fa2",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#7b1fa2",
//     },
//     "&.Mui-error fieldset": {
//       borderColor: "#f44336",
//     },
//   },
//   "& .MuiInputBase-input": {
//     backgroundColor: "#FFFFFF",
//     color: "#7b1fa2",
//     paddingRight: 36,
//     position: "relative",
//     zIndex: 0,
//   },
//   "& .MuiFormHelperText-root.Mui-error": {
//     color: "#f44336",
//   },
//   "& .MuiIconButton-root": {
//     position: "absolute",
//     top: "50%",
//     right: 8,
//     transform: "translateY(-50%)",
//     backgroundColor: "#f1f0f1",
//     color: "#7b1fa2",
//     "&:hover": {
//       backgroundColor: "#e1e0e1",
//     },
//   },
//   "& input[type=file]": {
//     position: "absolute",
//     top: "75%",
//     right: 48,
//     transform: "translateY(-50%)",
//     opacity: 1,
//     cursor: "pointer",
//     color: "#7b1fa2",
//     zIndex: 1,
//     width: "calc(100% - 56px)",
//     height: "100%",
//   },
// });

// const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
//   color: "#7b1fa2",
//   "&.Mui-checked": {
//     color: "#7b1fa2",
//   },
//   "& .MuiSvgIcon-root": {
//     fontSize: 20,
//   },
// }));

// const CustomButton = styled(Button)({
//   margin: "16px 0 8px",
//   backgroundColor: "#8e24aa",
//   "&:hover": {
//     backgroundColor: "#7b1fa2",
//   },
// });

// const CustomOutlinedButton = styled(Button)({
//   margin: "16px 0 8px",
//   borderColor: "#8e24aa",
//   color: "#8e24aa",
//   "&:hover": {
//     borderColor: "#7b1fa2",
//     color: "#7b1fa2",
//   },
//   "&:disabled": {
//     border: "1px solid #7b1fa2",
//     opacity: 0.5,
//   },
// });

// const CustomHeading = styled(Typography)({
//   marginTop: "25px",
//   color: "#7b1fa2",
//   fontWeight: "normal",
//   fontSize: "2.5rem",
//   textAlign: "center",
// });

// const CreateListing = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [files, setFiles] = useState([]);
//   const { currentUser } = useSelector((state) => state.user);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     address: "",
//     bedrooms: 1,
//     bathrooms: 1,
//     regularPrice: 0,
//     discountPrice: 0,
//     type: "rent",
//     parking: false,
//     furnished: false,
//     offer: false,
//     imageUrls: [],
//   });
//   console.log(formData);
//   const [imageUploadError, setImageUploadError] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleImageUpload = () => {
//     if (files.length === 0) {
//       setImageUploadError("No items selected!");
//       return;
//     }
//     if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
//       setLoading(true);
//       setImageUploadError(false);
//       const promises = [];

//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }
//       Promise.all(promises)
//         .then((urls) => {
//           setFormData({
//             ...formData,
//             imageUrls: formData.imageUrls.concat(urls),
//           });
//           setImageUploadError(false);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setImageUploadError("Image upload failed!(must be less than 2 MB)");
//         });
//     } else {
//       setImageUploadError("You can only upload 6 images per listing!");
//       setLoading(false);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(progress);
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//             console.log(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const deleteImage = (url) => {
//     const storage = getStorage(app);
//     const storageRef = ref(storage, url);
//     deleteObject(storageRef)
//       .then(() => {
//         setFormData({
//           ...formData,
//           imageUrls: formData.imageUrls.filter((imageUrl) => imageUrl !== url),
//         });
//       })
//       .catch((error) => {
//         console.error("Error deleting image:", error);
//       });
//   };

//   useEffect(() => {
//     console.log("Current User:", currentUser); // Debugging line
//   }, [currentUser]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);
//       const res = fetch("/api/listing/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           userRef: currentUser.id,
//         }),
//       });
//       const data = await res.json();
//       if (!data.success) {
//         setError(data.message);
//       }
//       console.log("Listing created:", formData);
//       navigate("/listings");
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="lg" className={classes.container}>
//       <CustomHeading variant="h5" component="h1" gutterBottom>
//         Create a new Listing
//       </CustomHeading>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={8}>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <CssTextField
//                   name="name"
//                   label="Name"
//                   fullWidth
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <CssTextField
//                   name="description"
//                   label="Description"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <CssTextField
//                   name="address"
//                   label="Address"
//                   fullWidth
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CssTextField
//                   name="regularPrice"
//                   label="Regular Price"
//                   type="number"
//                   fullWidth
//                   value={formData.regularPrice}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CssTextField
//                   name="discountPrice"
//                   label="Discount Price"
//                   type="number"
//                   fullWidth
//                   value={formData.discountPrice}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CssTextField
//                   name="bedrooms"
//                   label="Bedrooms"
//                   type="number"
//                   fullWidth
//                   value={formData.bedrooms}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CssTextField
//                   name="bathrooms"
//                   label="Bathrooms"
//                   type="number"
//                   fullWidth
//                   value={formData.bathrooms}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <CssTextField
//                   select
//                   name="type"
//                   label="Type"
//                   fullWidth
//                   value={formData.type}
//                   onChange={handleChange}
//                   required
//                 >
//                   <MenuItem value="sale">Sale</MenuItem>
//                   <MenuItem value="rent">Rent</MenuItem>
//                 </CssTextField>
//               </Grid>
//               <Grid item xs={12} className={classes.checkboxGrid}>
//                 <Box display="flex" alignItems="center" flexWrap="wrap">
//                   <FormControlLabel
//                     control={
//                       <CustomCheckbox
//                         checked={formData.furnished}
//                         onChange={handleChange}
//                         name="furnished"
//                       />
//                     }
//                     label="Furnished"
//                   />
//                   <FormControlLabel
//                     control={
//                       <CustomCheckbox
//                         checked={formData.parking}
//                         onChange={handleChange}
//                         name="parking"
//                       />
//                     }
//                     label="Parking"
//                   />
//                   <FormControlLabel
//                     control={
//                       <CustomCheckbox
//                         checked={formData.offer}
//                         onChange={handleChange}
//                         name="offer"
//                       />
//                     }
//                     label="Offer"
//                   />
//                 </Box>
//               </Grid>
//             </Grid>
//           </form>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Box>
//             <Typography variant="body1" gutterBottom>
//               Total six images supported
//             </Typography>
//             <div>
//               <CssTextField
//                 disabled
//                 fullWidth
//                 InputProps={{
//                   endAdornment: (
//                     <input
//                       id="upload-file"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setFiles(e.target.files)}
//                       multiple
//                     />
//                   ),
//                 }}
//               />
//               <label htmlFor="upload-image-button">
//                 <CustomOutlinedButton
//                   variant="outlined"
//                   component="span"
//                   startIcon={
//                     loading ? (
//                       <CircularProgress size={24} sx={{ color: "#7b1fa2" }} />
//                     ) : (
//                       <CloudUploadIcon />
//                     )
//                   }
//                   onClick={handleImageUpload}
//                   sx={{ color: loading ? "#7b1fa2" : "#7b1fa2" }}
//                 >
//                   {loading ? "Uploading..." : "Upload Images"}
//                 </CustomOutlinedButton>
//               </label>
//             </div>
//             <p className="text-red-700 text-sm">
//               {imageUploadError && imageUploadError}
//             </p>
//             <div className={classes.imageList}>
//               {formData.imageUrls.length > 0 &&
//                 formData.imageUrls.map((url) => (
//                   <div key={url} className={classes.imageContainer}>
//                     <img
//                       src={url}
//                       alt="listing image"
//                       className={classes.image}
//                     />
//                     <IconButton
//                       size="small"
//                       className={classes.deleteIcon}
//                       onClick={() => deleteImage(url)}
//                       style={{
//                         position: "absolute",
//                         top: -4,
//                         right: -4,
//                         color: "#ccc",
//                       }}
//                     >
//                       <ClearIcon fontSize="medium" />
//                     </IconButton>
//                   </div>
//                 ))}
//             </div>
//             <CustomButton
//               type="submit"
//               variant="contained"
//               size="large"
//               color="primary"
//               fullWidth
//               sx={{ color: loading ? "#7b1fa2" : "#ccc" }}
//             >
//               {loading ? "Creating..." : "Create Listing"}
//             </CustomButton>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CreateListing;


import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Checkbox,
  MenuItem,
  FormControlLabel,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { app } from "../firebase";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  checkboxGrid: {
    display: "flex",
    alignItems: "center",
    marginBottom: 1,
  },
  imageList: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  imageContainer: {
    position: "relative",
    display: "inline-block",
  },
  deleteIcon: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "50%",
    display: "none",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
}));

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7b1fa2",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7b1fa2",
  },
  "&:before": {
    borderBottomColor: "gray",
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#7b1fa2",
  },
  "&:after": {
    borderBottomColor: "#7b1fa2",
  },
  "&.Mui-error:before": {
    borderBottomColor: "#f44336",
  },
  "&.Mui-error:after": {
    borderBottomColor: "#f44336",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#7b1fa2",
    },
    "&:hover fieldset": {
      borderColor: "#7b1fa2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7b1fa2",
    },
    "&.Mui-error fieldset": {
      borderColor: "#f44336",
    },
  },
  "& .MuiInputBase-input": {
    backgroundColor: "#FFFFFF",
    color: "#7b1fa2",
    paddingRight: 36,
    position: "relative",
    zIndex: 0,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#f44336",
  },
  "& .MuiIconButton-root": {
    position: "absolute",
    top: "50%",
    right: 8,
    transform: "translateY(-50%)",
    backgroundColor: "#f1f0f1",
    color: "#7b1fa2",
    "&:hover": {
      backgroundColor: "#e1e0e1",
    },
  },
  "& input[type=file]": {
    position: "absolute",
    top: "75%",
    right: 48,
    transform: "translateY(-50%)",
    opacity: 1,
    cursor: "pointer",
    color: "#7b1fa2",
    zIndex: 1,
    width: "calc(100% - 56px)",
    height: "100%",
  },
});

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#7b1fa2",
  "&.Mui-checked": {
    color: "#7b1fa2",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}));

const CustomButton = styled(Button)({
  margin: "16px 0 8px",
  backgroundColor: "#8e24aa",
  "&:hover": {
    backgroundColor: "#7b1fa2",
  },
});

const CustomOutlinedButton = styled(Button)({
  margin: "16px 0 8px",
  borderColor: "#8e24aa",
  color: "#8e24aa",
  "&:hover": {
    borderColor: "#7b1fa2",
    color: "#7b1fa2",
  },
  "&:disabled": {
    border: "1px solid #7b1fa2",
    opacity: 0.5,
  },
});

const CustomHeading = styled(Typography)({
  marginTop: "25px",
  color: "#7b1fa2",
  fontWeight: "normal",
  fontSize: "2.5rem",
  textAlign: "center",
});

const CreateListing = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    imageUrls: [],
  });
  console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = () => {
    if (files.length === 0) {
      setImageUploadError("No items selected!");
      return;
    }
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setLoading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setLoading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed!(must be less than 2 MB)");
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing!");
      setLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    });
  };

  const deleteImage = (url) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, url);
    deleteObject(storageRef)
      .then(() => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((imageUrl) => imageUrl !== url),
        });
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  useEffect(() => {
    console.log("Current User:", currentUser); // Debugging line
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser.id,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      }
      console.log("Listing created:", formData);
      navigate("/listings");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CustomHeading variant="h5" component="h1" gutterBottom>
        Create a new Listing
      </CustomHeading>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CssTextField
                  name="name"
                  label="Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  name="address"
                  label="Address"
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  name="regularPrice"
                  label="Regular Price"
                  type="number"
                  fullWidth
                  value={formData.regularPrice}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  name="discountPrice"
                  label="Discount Price"
                  type="number"
                  fullWidth
                  value={formData.discountPrice}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  name="bedrooms"
                  label="Bedrooms"
                  type="number"
                  fullWidth
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  name="bathrooms"
                  label="Bathrooms"
                  type="number"
                  fullWidth
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  select
                  name="type"
                  label="Type"
                  fullWidth
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="sale">Sale</MenuItem>
                  <MenuItem value="rent">Rent</MenuItem>
                </CssTextField>
              </Grid>
              <Grid item xs={12} className={classes.checkboxGrid}>
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={formData.furnished}
                        onChange={handleChange}
                        name="furnished"
                      />
                    }
                    label="Furnished"
                  />
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={formData.parking}
                        onChange={handleChange}
                        name="parking"
                      />
                    }
                    label="Parking"
                  />
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={formData.offer}
                        onChange={handleChange}
                        name="offer"
                      />
                    }
                    label="Offer"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Total six images supported
                </Typography>
                <div>
                  <CssTextField
                    disabled
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <input
                          id="upload-file"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFiles(e.target.files)}
                          multiple
                        />
                      ),
                    }}
                  />
                  <label htmlFor="upload-image-button">
                    <CustomOutlinedButton
                      variant="outlined"
                      component="span"
                      startIcon={
                        loading ? (
                          <CircularProgress
                            size={24}
                            sx={{ color: "#7b1fa2" }}
                          />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                      onClick={handleImageUpload}
                      sx={{ color: loading ? "#7b1fa2" : "#7b1fa2" }}
                    >
                      {loading ? "Uploading..." : "Upload Images"}
                    </CustomOutlinedButton>
                  </label>
                </div>
                <p className="text-red-700 text-sm">
                  {imageUploadError && imageUploadError}
                </p>
                <div className={classes.imageList}>
                  {formData.imageUrls.length > 0 &&
                    formData.imageUrls.map((url) => (
                      <div key={url} className={classes.imageContainer}>
                        <img
                          src={url}
                          alt="listing image"
                          className={classes.image}
                        />
                        <IconButton
                          size="small"
                          className={classes.deleteIcon}
                          onClick={() => deleteImage(url)}
                          style={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            color: "#ccc",
                          }}
                        >
                          <ClearIcon fontSize="medium" />
                        </IconButton>
                      </div>
                    ))}
                </div>
                <CustomButton
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  sx={{ color: loading ? "#7b1fa2" : "#cccccc" }}
                >
                  {loading ? "Creating..." : "Create Listing"}
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateListing;
