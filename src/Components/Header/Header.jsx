import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

const settings = ["Company", "Logout"];

const Component = styled(AppBar)`
  background: #ffffff;
  color: black;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  display: flex;
  gap: 10px;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const Image = styled("img")({
  height: "56px",
  position: "absolute",
  left: "8%",
});

const Toolbarr = styled(Toolbar)`
  width: 20px;
  position: absolute;
  right: 57px;
`;

const Header = () => {
  const navigate = useNavigate();
  const imageURL =
    "https://img.freepik.com/premium-vector/fast-movie-logo-cinema-logo-design-template_227744-195.jpg?size=626&ext=jpg";
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem === "Logout") {
      handleLogout();
    } else if (menuItem === "Company") {
      navigate("/companyinfo");
    }
  };

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <Component style={{ color: "blue" }}>
      <Container>
        <Image onClick={redirectHome} src={imageURL} alt="logo" />
        <Link to="/home">HOME</Link>
        <Link to="">ABOUT</Link>
        <Link to="">CONTACT</Link>
      </Container>
      <Toolbarr>
        <Box />
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Avatar" src="/static/images/avatar/2.jpg" />
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbarr>
    </Component>
  );
};

export default Header;
