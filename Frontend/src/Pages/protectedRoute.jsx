import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('datosLogin');

    if (!token) {
        return <Navigate to="/login" replace></Navigate>
    }

    return children;
}

export default ProtectedRoute;