import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/features/authSlice";

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
    <div
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 cursor-pointer w-full"
    >
      Logout
    </div>
  );
};

export default Logout;
