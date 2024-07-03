import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { ListItemIcon } from "@material-ui/core";
import Contact from "../components/Contact";
import {
  IconButton,
  Tooltip,
  Box,
  Paper,
  Typography,
  Chip,
  List,
  Grid,
  ListItem,
  ListItemText,
} from "@mui/material";

const Listing = () => {
  SwiperCore.use([Navigation]);

  const params = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const [mainImage, setMainImage] = useState(null);

  const handleThumbnailClick = (url) => {
    setMainImage(url);
  };

  console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        if (data.imageUrls && data.imageUrls.length > 0) {
          setMainImage(data.imageUrls[0]);
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {listing && !loading && !error && (
        <div>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Box sx={{ width: "50%", marginLeft: 2 }}>
              <Paper elevation={3}>
                <Box
                  sx={{
                    height: 400,
                    marginTop: 10,
                    borderRadius: 2,
                    background: `url(${mainImage}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
              </Paper>
            </Box>
            <Box sx={{ width: "25%", marginTop: "80px" }}>
              <Swiper
                direction="vertical"
                spaceBetween={5}
                slidesPerView="auto"
              >
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <Paper
                      elevation={2}
                      sx={{
                        height: "130px",
                        width: "70%",
                        borderRadius: 2,
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => handleThumbnailClick(url)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "lg",
              mx: "auto",
              p: 3,
              my: 7,
              gap: 4,
            }}
          >
            <div maxWidth="lg" mx="auto" p={3} my={7} gap={4}>
              <Typography variant="h5" fontWeight="bold">
                {listing.name} - Rs{" "}
                <span style={{}}>
                  {" "}
                  {listing && listing.regularPrice.toLocaleString()}{" "}
                </span>
                <span style={{ fontSize: 18, fontWeight: 500 }}>
                  {listing && listing.type == "rent" ? "/month" : "/year"}
                </span>
              </Typography>
              <Box display="flex" alignItems="center" mt={2} gap={1}>
                <FaMapMarkerAlt style={{ color: "green" }} />
                <Typography variant="body2" color="textSecondary">
                  {listing.address}
                </Typography>
              </Box>
              <Box display="flex" gap={2} my={2}>
                <Chip
                  label={listing.type === "rent" ? "For Rent" : "For Sale"}
                  color="primary"
                />
                {listing.offer && (
                  <Chip
                    label={`Rs ${listing.discountPrice} OFF`}
                    color="secondary"
                  />
                )}
              </Box>
              <Typography color="textPrimary">
                <strong>Description - </strong>
                {listing.description}
              </Typography>
              <List>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <ListItem>
                      <ListItemIcon>
                        <FaBed />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${listing.bedrooms} ${
                          listing.bedrooms > 1 ? "bedrooms" : "bedroom"
                        }`}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ListItem>
                      <ListItemIcon>
                        <FaBath />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${listing.bathrooms} ${
                          listing.bathrooms > 1 ? "bathrooms" : "bathroom"
                        }`}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ListItem>
                      <ListItemIcon>
                        <FaParking />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          listing.parking ? "Parking spot" : "No Parking"
                        }
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ListItem>
                      <ListItemIcon>
                        <FaChair />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          listing.furnished ? "Furnished" : "Unfurnished"
                        }
                      />
                    </ListItem>
                  </Grid>
                </Grid>
              </List>
            </div>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95"
                  >
                    Contact Landlord
                  </button>
                )}
              <Tooltip title="Copy link">
                <IconButton onClick={handleCopy}>
                  <FaShare style={{ color: "slate.500" }} />
                </IconButton>
              </Tooltip>
              {copied && <Box sx={{ marginLeft: 1 }}>Link Copied!</Box>}
            </Box>

            {contact && <Contact listing={listing} />}
          </Box>
        </div>
      )}
    </main>
  );
};

export default Listing;
