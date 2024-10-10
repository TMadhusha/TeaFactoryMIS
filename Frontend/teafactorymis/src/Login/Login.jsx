import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Paper, Typography, Link, Box, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../Images/background1.jpg';
import logo from '../Images/logo.png';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green color
    },
    secondary: {
      main: '#81C784', // Light green for secondary actions
    },
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    // Add form validation logic if needed
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/user/login', { username, password });

        if (response.status === 200) {
          const userResponse = response.data;
          localStorage.setItem('userRole', userResponse.employee.role); 
          localStorage.setItem('user', JSON.stringify(userResponse));

          // Navigate to the dashboard based on the user role
          switch (userResponse.employee.role) {
            case 'Admin':
              navigate('/AdminDashboard', { state: { user: userResponse } });
              break;
            case 'HRAssist':
              navigate('/HRDashboard', { state: { user: userResponse } });
              break;
            case 'InventoryAssist':
              navigate('/InventoryDashboard', { state: { user: userResponse } });
              break;
            case 'SalesAssist':
              navigate('/SalesDashboard', { state: { user: userResponse } });
              break;
            case 'TechnicalAssist':
              navigate('/TechnicalDashboard', { state: { user: userResponse } });
              break;
            default:
              setLoginError('Unexpected user role');
              break;
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setLoginError('Invalid username or password');
        } else {
          setLoginError('An error occurred. Please try again later.');
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} sm={4} md={7} sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={logo} alt="Company Logo" style={{ width: '150px', marginBottom: '16px' }} />
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {loginError && (
                <Typography color="error" variant="body2" align="center">{loginError}</Typography>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">Forgot password?</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;