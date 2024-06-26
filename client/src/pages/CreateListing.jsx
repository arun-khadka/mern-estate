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
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  checkboxGrid: {
    display: "flex",
    alignItems: "center",
    marginBottom: 1,
  },
}));

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7b1fa2", // Custom label color when focused
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7b1fa2", // Custom underline color when focused
  },
  "&:before": {
    borderBottomColor: "gray", // Default border color
  },
  "&:hover:not(.Mui-disabled):before": {
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
    paddingRight: 36, // Adjust padding to accommodate button
    position: "relative",
    zIndex: 0,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#f44336", // Helper text color when error
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
    right: 48, // Adjust right position to create margin
    transform: "translateY(-50%)",
    opacity: 1,
    cursor: "pointer",
    zIndex: 1,
    width: "calc(100% - 56px)", // Adjust width to match TextField
    height: "100%", // Ensure full height
  },
});
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    color: "#7b1fa2",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20, // Adjust size of the checkbox
  },
}));

const CustomButton = styled(Button)({
  margin: "16px 0 8px",
  backgroundColor: "#8e24aa",
  "&:hover": {
    backgroundColor: "#7b1fa2",
  },
});

const CustomHeading = styled(Typography)({
  marginTop: "25px",
  color: "#7b1fa2", // Custom heading text color
  fontWeight: "normal", // Custom font weight
  fontSize: "2.5rem", // Custom font size
  textAlign: "center", // Center align text
});

const CreateListing = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    // name: "",
    // description: "",
    // regularPrice: "",
    // address: "",
    // bedrooms: "",
    // bathrooms: "",
    // type: "house",
    // parking: false,
    // furnished: false,
    // offer: false,
    imageUrls: [],
    // userRef: "",
  });
  console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
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
        })
        .catch((err) => {
          setImageUploadError("Image upload failed!(must be less than 2 MB)");
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic (e.g., API call)
    console.log("Listing created:", formData);
    // Navigate to another page or show a success message
    navigate("/listings"); // Example route
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CustomHeading variant="h5" component="h1" gutterBottom>
        Create a new Listing
      </CustomHeading>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CssTextField
                    name="name"
                    label="Name"
                    variant="outlined"
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
                    fullWidth
                    multiline
                    rows={4}
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
                    <MenuItem value="house">Sell</MenuItem>
                    <MenuItem value="condo">Rent</MenuItem>
                  </CssTextField>
                </Grid>
                <Grid item xs={12} className={classes.checkboxGrid}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={formData.furnished}
                        onChange={handleChange}
                        disableRipple
                        name="furnished"
                      />
                    }
                    label="Furnished"
                  />
                </Grid>
                <Grid item xs={12} className={classes.checkboxGrid}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={formData.parking}
                        onChange={handleChange}
                        disableRipple
                        name="parking"
                      />
                    }
                    label="Parking"
                  />
                </Grid>
                <Grid item xs={12} className={classes.checkboxGrid}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={formData.offer}
                        onChange={handleChange}
                        disableRipple
                        name="offer"
                      />
                    }
                    label="Offer"
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
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
              <CustomButton
                type="button"
                variant="contained"
                component="label"
                color="primary"
                onClick={handleImageUpload}
              >
                Upload
              </CustomButton>
            </div>
            <p className="text-red-700 text-sm">
              {" "}
              {imageUploadError && imageUploadError}
            </p>
            <CustomButton
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Create Listing
            </CustomButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateListing;
