import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("roleCode"));
  
  useEffect(() => {
    // Listen for changes in userRole from localStorage
    const role = localStorage.getItem("roleCode");
    setUserRole(role); // Update state if role changes
  }, []);

  console.log("user role", userRole);
  console.log("allowed roles", allowedRoles);

  if (userRole && allowedRoles === userRole) {
    return element;
  } else if (userRole === "USER" || !userRole) {
    return <Navigate to="/" replace />;
  } else if (userRole === "COMPANY") {
    return <Navigate to="/company/dashboard" replace />;
  } else if (userRole === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Outlet/>
};

export default ProtectedRoute;
