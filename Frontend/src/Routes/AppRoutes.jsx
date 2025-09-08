import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard.jsx';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;