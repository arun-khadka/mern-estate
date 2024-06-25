import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
  checkboxGrid: {
    display: "flex",
    alignItems: "center",
  },
}));

const CreateListing = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    name: "",
    description: "",
    regularPrice: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    image: null,
    sell: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setListing((prevListing) => ({
      ...prevListing,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    setListing((prevListing) => ({
      ...prevListing,
      image: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic (e.g., API call)
    console.log("Listing created:", listing);
    // Navigate to another page or show a success message
    navigate("/listings"); // Example route
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className={classes.heading}
        >
          Create Listing
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Name"
                  name="name"
                  value={listing.name}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Regular Price"
                  name="regularPrice"
                  value={listing.regularPrice}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  required
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Address"
                  name="address"
                  value={listing.address}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Box>
          <TextField
            label="Description"
            name="description"
            value={listing.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Bedrooms"
            name="bedrooms"
            value={listing.bedrooms}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Bathrooms"
            name="bathrooms"
            value={listing.bathrooms}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          {listing.image && <Typography>{listing.image.name}</Typography>}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} className={classes.checkboxGrid}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={listing.sell}
                    onChange={handleChange}
                    name="sell"
                  />
                }
                label="Sell"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.checkboxGrid}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={listing.rent}
                    onChange={handleChange}
                    name="rent"
                  />
                }
                label="Rent"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.checkboxGrid}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={listing.parking}
                    onChange={handleChange}
                    name="parking"
                  />
                }
                label="Parking"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.checkboxGrid}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={listing.furnished}
                    onChange={handleChange}
                    name="furnished"
                  />
                }
                label="Furnished"
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.checkboxGrid}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={listing.offer}
                    onChange={handleChange}
                    name="offer"
                  />
                }
                label="Offer"
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Create Listing
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateListing;
