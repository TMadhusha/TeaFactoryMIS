import React from 'react'
import Sidebar from '../../Component/Sidebar';
import { Box, Typography } from '@mui/material';

const InventoryDashboard = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }} className="app-container">
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Allow this box to grow to fill the available space
          p: 3, // Padding around the content
           backgroundColor: '#f5f5f5', // Light gray background for contrast
          overflowY: 'auto', // Allow vertical scrolling if content overflows
        }}
      >
        <Typography variant="h4" gutterBottom>
        Inventory Dashboard
        </Typography>
       
      
      </Box>
    </Box>
  );
};

export default InventoryDashboard
