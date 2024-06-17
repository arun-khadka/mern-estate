import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
// import SearchBar from "../SearchBar/SearchBar";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  const HeroWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
  }));

  const HeroTitle = styled(Typography)(({ theme }) => ({
    position: "relative",
    fontSize: "3rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  }));

  const OrangeCircle = styled(Box)(({ theme }) => ({
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.main,
    position: "absolute",
    top: "-20px",
    left: "-20px",
  }));

  return (
    <HeroWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* left side */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <HeroTitle component="div">
                <OrangeCircle />
                <motion.div
                  initial={{ y: "2rem", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 2,
                    type: "ease-in",
                  }}
                >
                  Discover <br />
                  Your Dream
                  <br /> Home
                </motion.div>
              </HeroTitle>
              <Box mt={2}>
                <Typography variant="h6" color="textSecondary">
                  Discover a Range of Properties Tailored to Your Needs
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Leave Behind the Challenges of Finding Your Perfect Home
                </Typography>
              </Box>
              <Box mt={4}>
                {/* <SearchBar /> */}
              </Box>
              <Box display="flex" mt={4}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper elevation={3} className="flexColCenter stat">
                      <Typography variant="h4">
                        <CountUp start={9800} end={10000} duration={4} />{" "}
                        <span>+</span>
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Premium Product
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={3} className="flexColCenter stat">
                      <Typography variant="h4">
                        <CountUp start={2950} end={3000} duration={4} />{" "}
                        <span>+</span>
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Happy Customer
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={3} className="flexColCenter stat">
                      <Typography variant="h4">
                        <CountUp end={30} /> <span>+</span>
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Awards Winning
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* right side */}
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <motion.div
                initial={{ x: "7rem", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "ease-in",
                }}
              >
                <img
                  src="./hero-image.png"
                  alt="houses"
                  style={{ width: "100%", height: "auto" }}
                />
              </motion.div>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer
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
      </Container>
    </HeroWrapper>
  );
};

export default Home;
