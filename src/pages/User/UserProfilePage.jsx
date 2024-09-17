import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

import DefaultBg from "../../../src/assets/Home/Home/defaultavatar.png";
import { toast, Toaster } from "react-hot-toast";
import { CheckCircleOutline, Close, CloseOutlined } from "@mui/icons-material";
import { useState } from "react";

function UserProfilePage() {
  const [date, setDate] = useState();
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputField = (e) => {
    setInputValue(e.target.value);
    setErrorMessage("");
  };

  const handleValidation = (inputValue) => {
    if (inputValue.trim() === "") {
      setErrorMessage("You need to fill this field!");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (handleValidation(inputValue)) {
      toast.success("Your information has been saved successfully!");
    }
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
        <p className="font-poppins text-xl md:text-2xl font-medium ml-6 my-6">
          Hello, User
        </p>
        <div className="px-6">
          <Separator />
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
            <div className="space-y-2">
              <label className="font-medium">Name:</label>
              <Input
                id="name"
                placeholder="Name"
                className={`${
                  errorMessage ? "border-red-500" : null
                } flex items-center rounded-sm border focus:border-primary py-4 px-4`}
                onChange={handleInputField}
                value={inputValue}
              />

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <div className="space-y-2 w-full">
              <p className="font-medium">Date of Birth:</p>
              <div className="w-full max-w-lg">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={date}
                      onSelect={setDate}
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Address:</p>
              <Input
                id="Address"
                placeholder="Address"
                className="flex items-center rounded-sm border focus:border-primary py-4 px-4"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Phone Number:</p>
              <Input
                id="PhoneNumber"
                placeholder="Phone Number"
                className="flex items-center rounded-sm border focus:border-primary py-4 px-4"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Email:</p>
              <Input
                id="Email"
                placeholder="Email"
                className="flex items-center rounded-sm border focus:border-primary py-4 px-4"
              />
            </div>
            <div className="space-y-2 items-center">
              <p className="font-medium">Gender:</p>
              <div className="flex gap-10">
                <div className="flex gap-2 items-center">
                  <input type="radio" name="gender" id="male" />
                  <p>Male</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="radio" name="gender" id="female" />
                  <p>Female</p>
                </div>
              </div>
            </div>

            <div className="col-span-2 flex justify-end">
              <div className="space-x-2 mt-4 ">
                <Button
                  className="bg-secondary mx-auto text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1"
                  variant="outline"
                >
                  <DeleteOutlineOutlinedIcon />
                  <p>Cancel</p>
                </Button>
                <Button
                  className="bg-secondary mx-auto text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1"
                  variant="outline"
                  type="submit"
                >
                  <SaveOutlinedIcon />
                  <p>Save</p>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePage;
