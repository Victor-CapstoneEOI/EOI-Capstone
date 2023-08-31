import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import cornerLogo from './img/cornervictor.png'; 
import './Header.css'; // Import the CSS file

const headerStyles = {
  backgroundColor: '#ffffff', // Set your desired background color
  color: '#000000', // Set your desired text color
};

const Header = () => {
  return (
    <AppBar position="static" sx={headerStyles}>
      <Toolbar>
        <div className='Logo'>
        <img src={cornerLogo} alt="Logo"  width="150" height="50" />
        </div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" component={Link} to="/profil">
          French Profile
        </Button>
        <Button color="inherit" component={Link} to="/formlayout">
          Group Benefits
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

