import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Hidden, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import cornerLogo from '../img/cornervictor.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
      <Toolbar>
        <div className="Logo">
          <img src={cornerLogo} alt="Logo" width="150" height="50" />
        </div>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}></Typography>
        <Hidden smDown>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/profile">Profile</Button>
          <Button color="inherit" component={Link} to="/formlayout">EOI</Button>
        </Hidden>
        <Hidden mdUp>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>☰</Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/formlayout">EOI</MenuItem>
          </Menu>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
