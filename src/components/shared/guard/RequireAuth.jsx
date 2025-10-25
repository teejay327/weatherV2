import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.jsx";
import toast from "react-hot-toast";
import { useRef } from "react";

const RequireAuth = ({ children }) => {
  const { token, isLoading } = useAuth();
  const location = useLocation();
  const warned = useRef(false);

  if (isLoading) {
    return (
      <div className="py-8 text-center text-stone-400">
        checking session
      </div>
    )
  }

  if (!token) {
    if (!warned.current) {
      toast.error("You must be logged in to view that page");
      warned.current = true;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if children are passed, they get rendered; otherwise nested routes are rendered using Outlet
  return children ? children : <Outlet />
}

export default RequireAuth;