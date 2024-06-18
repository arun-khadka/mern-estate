import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: "#4285i8",
    "&:hover": {
      backgroundColor: "#4285j9",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.5rem",
  },
}));

const OAuth = ({ onGoogleSignIn }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      onGoogleSignIn(result); // Pass the result back to the parent component
    } catch (error) {
      console.log("Couldn't sign in with Google", error);
    }
  };

  return (
    <div className={classes.paper}>
      <Button
        type="button"
        fullWidth
        disableRipple
        variant="contained"
        color="primary"
        size="large"
        className={classes.submit}
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className={classes.icon} />
        continue with google
      </Button>
    </div>
  );
};

export default OAuth;
