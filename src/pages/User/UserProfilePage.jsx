import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Bg from "../../../src/assets/Home/Home/defaultavatar.png";
import { Link } from "react-router-dom";

function UserProfilePage() {
  return (
    <div className="w-full lg:w-1/3 items-center text-center rounded-lg bg-white shadow-md space-y-2">
      <div
        className="h-40 w-40 bg-contain bg-center mx-auto"
        style={{ backgroundImage: `url(${Bg})` }}
      ></div>
      <Button
        className="bg-secondary mx-auto text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-2"
        variant="outline"
      >
        <UploadFileOutlinedIcon />
        <p>Upload Image</p>
      </Button>
      <div className="px-6 pt-2">
        <Separator />
      </div>

      <ul className="flex flex-col items-center space-y-2 px-6 text-center pb-4">
        <Link to="/userProfile/personalInfo">
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <AccountCircleOutlinedIcon />
            <p>Personal Information</p>
          </li>
        </Link>

        <Link to="/userProfile/advancedSetting">
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <AccountCircleOutlinedIcon />
            <p>Advance Settings</p>
          </li>
        </Link>
        <Link to="/userProfile/changePassword">
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <AdminPanelSettingsOutlinedIcon />
            <p>Account Security</p>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default UserProfilePage;
