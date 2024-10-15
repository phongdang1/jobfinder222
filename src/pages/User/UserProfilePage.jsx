import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Bg from "../../../src/assets/Home/Home/defaultavatar.png"; // Default image
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsersById, handleSetDataUserDetail } from "@/fetchData/User";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

function UserProfilePage() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const userId = localStorage.getItem("user_id");

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      getBase64(file)
        .then((base64) => {
          setImage(base64);
          console.log("Uploaded file: ", file, "Base64: ", base64);
          uploadImage(base64);
        })
        .catch((error) => {
          console.error("Error converting file to base64: ", error);
        });
    }
  };

  const uploadImage = async (image) => {
    setUploading(true);
    try {
      const userDataImage = {
        userId: userId,

        image: image,
        data: {},
      };
      const response = await handleSetDataUserDetail(userDataImage);

      console.log("Image: ", response.data.data);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image to backend: ", error);
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUsersById(userId);
        const userImage = response.data.data;
        setImage(userImage.image);
        console.log("img: " + userImage);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="w-full lg:w-1/3 items-center text-center rounded-lg bg-white shadow-md space-y-2">
      <div
        className="h-40 w-40 bg-contain bg-center mx-auto rounded-full my-4"
        style={{
          backgroundImage: `url(${image ? image : Bg})`,
          backgroundSize: "cover",
        }}
      ></div>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Button
        className="bg-secondary mx-auto text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-2"
        variant="outline"
        onClick={() => document.getElementById("file-upload").click()}
      >
        <UploadFileOutlinedIcon />
        <p>Upload Image</p>
      </Button>

      <div className="px-6 pt-2">
        <Separator />
      </div>

      <ul className="flex flex-col items-center space-y-2 px-6 text-center pb-4 w-full">
        <Link to="/userProfile/personalInfo">
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <AccountCircleOutlinedIcon />
            <p>Personal Information</p>
          </li>
        </Link>

        <Link to="/userProfile/advancedSetting">
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <SettingsSuggestOutlinedIcon />
            <p>Advanced Settings</p>
          </li>
        </Link>

        <Link to="/userProfile/changePassword">
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <AdminPanelSettingsOutlinedIcon />
            <p>Account Security</p>
          </li>
        </Link>

        <Link to="/userProfile/viewApplication">
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <DescriptionOutlinedIcon />
            <p>Your Application</p>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default UserProfilePage;
