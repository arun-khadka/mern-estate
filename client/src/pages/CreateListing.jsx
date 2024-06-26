import React, { useState } from "react";
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
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  checkboxGrid: {
    display: "flex",
    alignItems: "center",
    marginBottom: -10,
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
  // marginBottom: "25px",
  marginTop: "25px",
  color: "#7b1fa2", // Custom heading text color
  fontWeight: "normal", // Custom font weight
  fontSize: "2.5rem", // Custom font size
  textAlign: "center", // Center align text
});

const CreateListing = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    regularPrice: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    type: "house",
    parking: false,
    furnished: false,
    offer: false,
    imageUrls: [],
    userRef: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    let imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i]);
    }
    setFormData({
      ...formData,
      images: imagesArray,
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
    <Container maxWidth="sm" className={classes.container}>
      <Box>
        <CustomHeading variant="h5" component="h1" gutterBottom>
          Create a new Listing
        </CustomHeading>
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
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Total six images supported
              </Typography>

              <div style={{}}>
                <CssTextField
                  disabled
                  fullWidth
                  value={
                    formData.imageUrls.length > 0
                      ? `${formData.imageUrls.length} image(s) selected`
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <input
                        id="upload-file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                      />
                    ),
                  }}
                />
                <CustomButton
                  variant="contained"
                  component="label"
                  color="primary"
                >
                  Upload
                </CustomButton>
              </div>
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                name="userRef"
                label="User Reference"
                fullWidth
                value={formData.userRef}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
              >
                Create Listing
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateListing;
