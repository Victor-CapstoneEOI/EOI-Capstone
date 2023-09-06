import React from 'react';
import { Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import cornerLogo from '../img/cornervictor.png'; 
import '../Styles/Header.css'; // Import the CSS file

const Header = () => {
  return (
    <div className='NavBar' style={{
      backgroundColor: '#ffffff',
      color: '#000000',
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  // Added boxShadow here
    }}>
      <Toolbar>
        <div className='Logo'>
          <img src={cornerLogo} alt="Logo" width="150" height="50" />
        </div>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" component={Link} to="/formlayout">
          Group Benefits
        </Button>
      </Toolbar>
    </div>
  );
};

export default Header;
