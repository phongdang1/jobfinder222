import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import axios from "axios";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DefaultBg from "../../../src/assets/Home/Home/defaultavatar.png";
import { useState, useEffect } from "react";
import Validation from "@/components/User/Common/Validation";
import toast from "react-hot-toast";

function UserProfilePage() {
  const userId = localStorage.getItem("user_id");
  const [date, setDate] = useState(null);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    skills: [],
    gender: "",
    dob: "",
  });
  const [originalUserData, setOriginalUserData] = useState(null); // Store original data
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/getUserById?id=${userId}`);
        if (response.data.errCode === 0) {
          setInputValue({
            firstName: response.data.data.firstName || "",
            lastName: response.data.data.lastName || "",
            address: response.data.data.address || "",
            phoneNumber: response.data.data.phoneNumber || "",
            email: response.data.data.email || "",
            skills: response.data.data.listSkill || [],
            gender: response.data.data.UserDetailData.genderCode || "",
            dob: response.data.data.dob || "",
            image: response.data.data.image || "",
          });
          setOriginalUserData(response.data.data); // Save original data
          if (response.data.data.dob) {
            setDate(new Date(response.data.data.dob));
          }
        } else {
          setError(response.data.errMessage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(inputValue);
    setErrorMessage(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("/setDataUserDetail", {
          userId: userId,
          data: {
            firstName: inputValue.firstName,
            lastName: inputValue.lastName,
            address: inputValue.address,
            phoneNumber: inputValue.phoneNumber,
            data: {
              genderCode: inputValue.gender,
            }
          }
        });

        if (response.data.errCode === 0) {
          toast.success("Profile updated successfully!");
          setOriginalUserData(inputValue);
          setIsEditing(false);
        } else {
          setError(response.data.errMessage || "Failed to update profile.");
        }
      } catch (error) {
        console.error("Error updating user data:", error);
        setError("Error updating data. Please try again later.");
      }
    }
  };
  const addSkill = () => {
    setInputValue((prev) => ({
      ...prev,
      skills: [...prev.skills, { skillId: Date.now(), skillData: { name: "" } }],
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...inputValue.skills];
    newSkills[index].skillData.name = value;
    setInputValue((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const removeSkill = (index) => {
    const newSkills = inputValue.skills.filter((_, i) => i !== index);
    setInputValue((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleCancel = () => {
    setInputValue({
      firstName: originalUserData.firstName || "",
      lastName: originalUserData.lastName || "",
      address: originalUserData.address || "",
      phoneNumber: originalUserData.phoneNumber || "",
      email: originalUserData.email || "",
      skills: originalUserData.listSkill || [],
      gender: originalUserData.UserDetailData.genderCode || "",
      dob: originalUserData.dob || "",
      image: originalUserData.image || "",
    });
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 px-4 lg:px-36 my-4">
      {/* left */}
      <div className="w-full lg:w-1/3 items-center text-center rounded-lg bg-white shadow-md space-y-2">
        <div
          className="h-40 w-40 bg-contain bg-center mx-auto"
          style={{ backgroundImage: `url(${DefaultBg})` }}
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
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <AccountCircleOutlinedIcon />
            <p>Personal Information</p>
          </li>
          <li className="flex gap-2 cursor-pointer w-full mx-auto items-center hover:bg-primary hover:text-white p-2 hover:rounded-md">
            <AdminPanelSettingsOutlinedIcon />
            <p>Account Security</p>
          </li>
        </ul>
      </div>
      {/* right */}
      <div className="bg-white w-full rounded-lg shadow-md space-y-4 pb-4">
        <div className="flex justify-end gap-4 px-6 mt-4">
          {!isEditing && (
            <Button
              className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>

        <p className="font-poppins text-xl md:text-2xl font-medium ml-6 my-6">
          Hello, {inputValue.firstName || "User"}
        </p>
        <div className="px-6">
          <Separator />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
              <div className="space-y-2">
                <div className="font-medium">First Name:</div>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${errorMessage.firstName && isEditing ? "border-red-500" : ""}`}
                  onChange={handleInputField}
                  value={inputValue.firstName}
                  disabled={!isEditing}
                />
                {errorMessage.firstName && isEditing && <p className="text-red-500">{errorMessage.firstName}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-medium">Last Name:</label>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${errorMessage.lastName && isEditing ? "border-red-500" : ""}`}
                  onChange={handleInputField}
                  value={inputValue.lastName}
                  disabled={!isEditing}
                />
                {errorMessage.lastName && isEditing && <p className="text-red-500">{errorMessage.lastName}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-medium" htmlFor="dob">Date of Birth:</label>
                <div className="w-full">
                  <Input
                    type="date"
                    id="dob"
                    name="dob"
                    className="w-full px-4 py-2 rounded-sm border focus:border-primary"
                    value={inputValue.dob}
                    onChange={handleInputField}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2 items-center">
                <p className="font-medium">Gender:</p>
                <div className="flex gap-10">
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="M"
                      checked={inputValue.gender === "M"}
                      onChange={handleInputField}
                      disabled={!isEditing}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="F"
                      checked={inputValue.gender === "FE"}
                      onChange={handleInputField}
                      disabled={!isEditing}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Phone Number:</div>
                <Input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${errorMessage.phoneNumber && isEditing ? "border-red-500" : ""}`}
                  onChange={handleInputField}
                  value={inputValue.phoneNumber}
                  disabled={!isEditing}
                />
                {errorMessage.phoneNumber && isEditing && <p className="text-red-500">{errorMessage.phoneNumber}</p>}
              </div>

              <div className="space-y-2">
                <div className="font-medium">Address:</div>
                <Input
                  name="address"
                  placeholder="Address"
                  className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${errorMessage.address && isEditing ? "border-red-500" : ""}`}
                  onChange={handleInputField}
                  value={inputValue.address}
                  disabled={!isEditing}
                />
                {errorMessage.address && isEditing && <p className="text-red-500">{errorMessage.address}</p>}
              </div>

              <div className="space-y-2">
                <div className="font-medium">Email:</div>
                <Input
                  name="email"
                  placeholder="Email"
                  className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${errorMessage.email && isEditing ? "border-red-500" : ""}`}
                  onChange={handleInputField}
                  value={inputValue.email}
                  disabled={!isEditing}
                />
                {errorMessage.email && isEditing && <p className="text-red-500">{errorMessage.email}</p>}
              </div>
              <div className="space-y-2">
                <div className="font-medium">Category Job Code:</div>
                <div className="relative">
                  <select
                    name="categoryJobCode"
                    className={`block w-full rounded-sm border py-2 px-4 appearance-none bg-white focus:outline-none ${errorMessage.categoryJobCode && isEditing ? "border-red-500" : "focus:border-primary"
                      }`}
                    onChange={handleInputField}
                    value={inputValue.categoryJobCode}
                    disabled={!isEditing}
                  >
                    <option value="">Select Job Code</option>
                    <option value="code1">Job Code 1</option>
                    <option value="code2">Job Code 2</option>
                    <option value="code3">Job Code 3</option>
                    {/* Add more options as needed */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                {errorMessage.categoryJobCode && isEditing && (
                  <p className="text-red-500">{errorMessage.categoryJobCode}</p>
                )}
              </div>



            </div>
            <div className="gap-6 px-6">
              <div className="space-y-2">
                <div className="flex justify-between pt-5 pb-1">
                  <p className="font-medium">Skills:</p>
                  {isEditing && (
                    <Button onClick={addSkill} className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary">
                      Add Skill
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Use grid layout with 3 columns */}
                  {inputValue.skills.map((skill, index) => (
                    <div key={skill.skillId} className="flex justify-between items-center space-x-2"> {/* Add spacing between input and button */}
                      <Input
                        placeholder="Skill"
                        value={skill.skillData.name}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        disabled={!isEditing}
                        className="flex-1 rounded-sm"
                      />
                      {isEditing && (
                        <Button onClick={() => removeSkill(index)} className="bg-red-500 text-white">
                          <DeleteOutlineOutlinedIcon />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 px-6 mt-4">
              {isEditing && (
                <div className="flex gap-4">
                  <Button
                    className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1"
                    variant="outline"
                    onClick={() => {
                      handleCancel();
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                    type="submit"
                  >
                    <SaveOutlinedIcon />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
