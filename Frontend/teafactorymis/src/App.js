import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './Login/Login';
import Sidebar from './Component/Sidebar';
import AdminDashboard from './Dashboards/Admin/AdminDashboard';
import HRDashboard from './Dashboards/HRAssist/HRDashboard';
import InventoryDashboard from './Dashboards/InventoryAssist/InventoryDashboard';
import SalesDashboard from './Dashboards/SalesAssist/SalesDashboard';
import TechnicalDashboard from './Dashboards/TechnicalAssist/TechnicalDashboard';
import UserManage from './Dashboards/Admin/UserManage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => {
    // Handle login logic (set authentication state to true)
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />} {/* Render Sidebar if authenticated */}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
\
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/UserManage" element={<UserManage />} />

            <Route path="/HRDashboard" element={<HRDashboard />} />
            <Route path="/InventoryDashboard" element={<InventoryDashboard />} />
            <Route path="/SalesDashboard" element={<SalesDashboard />} />
            <Route path="/TechnicalDashboard" element={<TechnicalDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;