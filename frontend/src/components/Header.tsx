import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  useTheme,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { availableThemes, themeName, setThemeName } = useThemeContext();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { text: "Control Room", path: "/" },
    { text: "Audio Motor", path: "/audio-motor" },
    { text: "Users", path: "/users" },
    { text: "Settings", path: "/settings" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 4 }}>
          URSAC
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{ textTransform: "none" }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Theme Switcher Dropdown */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{ minWidth: 120, mr: 2 }}
          >
            <InputLabel sx={{ color: "#fff" }}>Theme</InputLabel>
            <Select
              label="Theme"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: muiTheme.palette.background.paper,
                    color: "#fff",
                  },
                },
              }}
            >
              {availableThemes.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  sx={{ textTransform: "capitalize" }}
                >
                  {name.replace(/([A-Z])/g, " $1")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton color="inherit" disabled>
            {muiTheme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: muiTheme.palette.primary.main }}>U</Avatar>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
