import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import { Home, Assignment } from '@mui/icons-material';
import { useLocation, Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const user = location.state?.user; // Access user details from location state
  const userRole = user?.employee?.role; // Access user role from location state
  console.log('Role:', user);

  const getSidebarItems = (role) => {
    switch (role) {
      case 'Admin':
        return [
          { text: 'Dashboard', icon: <Home />, path: '/AdminDashboard' },
          { text: 'Manage', icon: <Assignment />, path: '/UserManage' },
        ];
      case 'HRAssist':
        return [
          { text: 'HR Dashboard', icon: <Home />, path: '/HRDashboard' },
        ];
      case 'InventoryAssist':
        return [
          { text: 'Inventory Dashboard', icon: <Home />, path: '/InventoryDashboard' },
        ];
      case 'SalesAssist':
        return [
          { text: 'Sales Dashboard', icon: <Home />, path: '/SalesDashboard' },
        ];
      case 'TechnicalAssist':
        return [
          { text: 'Technical Dashboard', icon: <Home />, path: '/TechnicalDashboard' },
        ];
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems(userRole);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#E8F5E9',
            color: '#1B5E20',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* User profile section */}
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Avatar
            src={user?.employee?.Image || '/default-profile.png'} // Fallback to default if no image
            alt={user?.employee?.user?.username || 'User'}
            sx={{ width: 80, height: 80, margin: '0 auto' }}
          />
          <Typography variant="h6" sx={{ mt: 1 }}>
            {user?.employee?.user?.username || 'Guest User'} {/* Display user's name */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {userRole}
            
          </Typography>
        </Box>

        <Divider />

        {/* Sidebar items based on role */}
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              button
              component={Link}
              to={item.path}
              key={index}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
