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
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 14,
  border: `1px ${theme.palette.common.white}`,
  boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.2)}`, // Box shadow for shadowed effect
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
      width: "12ch",
    },
  },
}));
const pages = ["Home", "About", "Signin"];
const settings = ["Profile", "Account", "Signout"];

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin"); // Redirect to sign-in page after sign-out
  };

  const [showBorder, setShowBorder] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     if (currentScrollPos > 0) {
  //       setShowBorder(true);
  //     } else {
  //       setShowBorder(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
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
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", fontWeight: "700" } }}
          >
            MyEstate
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
              <div
                className={`${
                  showBorder
                    ? "absolute bottom-0 left-0 right-0 h-2 bg-slate-950 rounded-md"
                    : ""
                } ${
                  showBorder
                    ? "after:content-[''] after:absolute after:h-[7px] after:bg-purple-500 after:rounded-md after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-center"
                    : ""
                }`}
              ></div>
              {pages.map((page) => (
                <Button
                  disableTouchRipple
                  className={`relative text-lg w-fit block after:rounded-md aria-[current=page]:text-purple-500 after:block after:content-[''] after:absolute after:h-[4px] hover:text-teal-500 after:bg-purple-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-left after:bottom-[1px] active:text-purple-500}`}
                  key={page}
                  sx={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 500,
                    mx: 1.1,
                  }}
                  component={RouterLink}
                  to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                >
                  {page}
                </Button>
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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt=""
                  src="https://cdn.ontourmedia.io/gunsnroses/site_v2/animations/gnr_loop_logo_01.jpg"
                />
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
                  <MenuItem key={setting} onClick={handleSignOut}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
