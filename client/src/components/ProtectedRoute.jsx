import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;