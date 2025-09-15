import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, redirige a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, deja renderizar el componente hijo
  return children;
};

export default ProtectedRoute;