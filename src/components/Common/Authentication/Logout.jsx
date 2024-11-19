import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/features/authSlice";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("companyId");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("token");
    localStorage.removeItem("roleCode");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        className="bg-transparent text-primary rounded-md hover:text-white border border-primary"
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
