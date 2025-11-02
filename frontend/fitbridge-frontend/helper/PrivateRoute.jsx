import { jwtDecode } from "jwt-decode";
import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";


const PrivateRoute = ({ children, allowedRoles }) => {
    const { token } = useContext(AuthContext);
    if(!token) return <Navigate to="/login"/>;

    const decoded = jwtDecode(token);
    if(!allowedRoles.includes(decoded.role)) return <Navigate to="/unauthorized" />;

    return children;
};

export default PrivateRoute;