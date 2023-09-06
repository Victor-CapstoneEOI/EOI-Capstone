import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Hidden, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import cornerLogo from '../img/cornervictor.png'; 
import '../Styles/Header.css'; 

const headerStyles = {
  backgroundColor: '#ffffff',
  color: '#000000', 
  position: 'sticky',
  top: 0,
  zIndex: 1,
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='NavBar'>
    <AppBar position="static" sx={headerStyles}>
      <Toolbar>
        <div className='Logo'>
        <img src={cornerLogo} alt="Logo"  width="150" height="50" />
        </div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Hidden smDown>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" component={Link} to="/formlayout">
          Group Benefits
        </Button>
        </Hidden>
          <Hidden mdUp>
            {/* Mobile menu */}
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              ☰
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/formlayout">Group Benefits</MenuItem>
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
