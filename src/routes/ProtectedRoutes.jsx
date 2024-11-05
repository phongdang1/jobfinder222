import { useState, useEffect } from "react";
import { getUsersById } from "@/fetchData/User";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles, redirectPath }) => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = localStorage.getItem("user_id");
      const res = await getUsersById(userId);

      if (res.data.errCode === 0) {
        setUserRole(res.data.data.roleCode);
      } else {
        console.error("Error fetching user role:", res);
      }
      setIsLoading(false);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    console.log("Role updated:", userRole);
  }, [userRole]);

  if (isLoading) return <div>Loading...</div>;

  // Conditional routing based on userRole
  if (allowedRoles === userRole) {
    return element;
  } else if (userRole === "USER") {
    return <Navigate to="/" replace />;
  } else if (userRole === "COMPANY") {
    return <Navigate to="/company/dashboard" replace />;
  } else if (userRole === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }
};

export default ProtectedRoute;
