import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard.jsx';
import Login from '../Pages/login.jsx';
import ProtectedRoute from '../Pages/protectedRoute.jsx';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />  
      <Route
        path="/dashboard"                          
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;