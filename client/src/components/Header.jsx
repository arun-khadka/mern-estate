import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  border: `1px ${theme.palette.common.white}`,
  // boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.2)}`,
  backgroundColor: alpha(theme.palette.common.white, 0.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    // border: `1px solid ${theme.palette.primary.main}`, // Change border color on hover
    boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.2)}`, // Increase shadow on hover
  },
  "&.Mui-focused": {
    border: `1px solid ${theme.palette.primary.main}`, // Change border color on focus
    boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.3)}`, // Increase shadow on focus
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    color: "white",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "15ch",
    },
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#FFFFFF",
  borderColor: "#FFFFF",
  fontSize: 16,
  fontWeight: 500,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    borderColor: alpha(theme.palette.common.white, 0.3),
    color: "white",
  },
  "&.Mui-focusVisible": {
    color: "teal",
  },
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    borderRadius: 2,
    backgroundColor: "#a835d8",
    color: "#FFFFFF",
  },
}));

const pages = ["Home", "About"];
const settings = ["Profile", "Signout"];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    handleCloseUserMenu();
    navigate("/signin"); // Redirect to sign-in page after sign-out
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleProfileClick = () => {
    navigate("/profile");
    handleMobileMenuClose();
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <List>
        {pages.map((page) => (
          <ListItem
            key={page}
            disablePadding
            component={RouterLink}
            to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
            sx={{
              textAlign: "center",
              "& .MuiTypography-root": {
                color: "#FFFFFF",
              },
              "&:hover .MuiTypography-root": {
                color: "teal",
              },
              "&.Mui-selected .MuiTypography-root": {
                color: "#FFFFFF",
              },
            }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#7b1fa2" }}>
        <Toolbar sx={{ padding: { xs: 1, sm: 1 } }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", fontWeight: "700" } }}
          >
            Estate
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {pages.map((page) => (
                <CustomButton
                  disableRipple
                  key={page}
                  component={RouterLink}
                  to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                  sx={{
                    fontSize: 14,
                    mx: 1.1,
                    "&.active": {
                      color: "#FFFFFF", // Ensuring the color stays white when active
                    },
                    "&:visited": {
                      color: "#FFFFFF", // Ensuring the color stays white when visited
                    },
                  }}
                >
                  {page}
                </CustomButton>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <>
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {currentUser.photo ? (
                      <Avatar
                        alt={currentUser.name}
                        src={currentUser.photo}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            currentUser.name
                          )}&background=random&color=fff`;
                        }}
                      />
                    ) : (
                      <Avatar>
                        {currentUser.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) =>
                    setting === "Signout" ? (
                      <CustomMenuItem key={setting} onClick={handleSignOut}>
                        <Typography textAlign="center">{setting}</Typography>
                      </CustomMenuItem>
                    ) : (
                      <CustomMenuItem
                        key={setting}
                        onClick={handleProfileClick}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </CustomMenuItem>
                    )
                  )}
                </Menu>
              </>
            ) : (
              <CustomButton
                disableRipple
                component={RouterLink}
                to="/signin"
                variant="outlined"
                sx={{
                  fontSize: 14,
                  marginRight: 1,
                  textTransform: "Capital",

                  "&.active": {
                    color: "#FFFFFF", // Ensuring the color stays white when active
                  },
                  "&:visited": {
                    color: "#FFFFFF", // Ensuring the color stays white when visited
                  },
                }}
              >
                Sign In
              </CustomButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default Header;
