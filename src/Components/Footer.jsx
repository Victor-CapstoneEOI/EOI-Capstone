import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    
    <Box
      bgcolor="#64CCC9"
      color="#ffffff"
      py={2}
      textAlign="center"
    >
      <Typography variant="subtitle1" fontWeight="bold">
        VICTOR
      </Typography>
      <Typography variant="body2">
      © 2023 Victor Insurance Managers LLC. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
