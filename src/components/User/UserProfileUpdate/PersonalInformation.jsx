import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import Validation from "../Common/Validation";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { handleSetDataUserDetail } from "@/fetchData/User";

function PersonalInformation() {
  const [date, setDate] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setFormData({ ...formData, dob: selectedDate });
    setErrorMessage((prevErrors) => ({ ...prevErrors, dob: "" }));
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e });
    setErrorMessage((prevErrors) => ({ ...prevErrors, gender: "" }));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: "" });
  };

  const userId = localStorage.getItem("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = Validation(formData);
    const dataSent = {
      userId: userId,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dob: formData.dob,
      address: formData.address.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      data: { genderCode: formData.gender },
    };

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      console.log("deo dc");
    } else {
      try {
        const response = await handleSetDataUserDetail(dataSent);
        console.log(response);
        if (response) {
          navigate("/profileUpdate/skills");
          console.log("Profile updated successfully");
        } else {
          console.log("Profile update failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-full block">
      <form onSubmit={handleSubmit}>
        <div className="h-[460px] 2xl:h-[600px] lg:mx-40 md:mx-10 my-10 bg-white shadow-xl rounded-2xl">
          <p className="text-center pt-8 text-xl font-semibold">
            Personal Information
          </p>
          <ScrollArea className="h-4/5">
            <div className="flex flex-col items-center mt-8 space-y-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={`${
                    errorMessage.firstName
                      ? "border-red-500"
                      : "focus:border-primary"
                  } rounded-lg`}
                  onChange={handleInputChange}
                  value={formData.firstName}
                />
                {errorMessage.firstName && (
                  <p className="text-red-500">{errorMessage.firstName}</p>
                )}
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={`${
                    errorMessage.lastName
                      ? "border-red-500"
                      : "focus:border-primary"
                  } rounded-lg`}
                  onChange={handleInputChange}
                  value={formData.lastName}
                />
                {errorMessage.lastName && (
                  <p className="text-red-500">{errorMessage.lastName}</p>
                )}
              </div>

              <div className="flex gap-4 w-full max-w-sm items-center">
                <div className="block">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="w-full max-w-md ">
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
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={date}
                          onSelect={handleDateChange}
                          fromYear={1960}
                          toYear={2030}
                          value={formData.dob}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errorMessage.dob && (
                    <p className="text-red-500">{errorMessage.dob}</p>
                  )}
                </div>

                <div className="flex flex-col gap-5 justify-center">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup
                    onValueChange={handleGenderChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="M" id="r1" />
                      <Label htmlFor="r1">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FE" id="r2" />
                      <Label htmlFor="r2">Female</Label>
                    </div>
                  </RadioGroup>
                  {errorMessage.gender && (
                    <p className="text-red-500">{errorMessage.gender}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className={`${
                      errorMessage.phoneNumber
                        ? "border-red-500"
                        : "focus:border-primary"
                    } rounded-lg`}
                    onChange={handleInputChange}
                    value={formData.phoneNumber}
                  />
                </div>
                {errorMessage.phoneNumber && (
                  <p className="text-red-500 ">{errorMessage.phoneNumber}</p>
                )}
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address">Current Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Current Address"
                  className={`${
                    errorMessage.address
                      ? "border-red-500"
                      : "focus:border-primary"
                  } rounded-lg`}
                  onChange={handleInputChange}
                  value={formData.address}
                />
                {errorMessage.address && (
                  <p className="text-red-500">{errorMessage.address}</p>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="h-16 lg:mx-40 md:mx-10 my-10 bg-white shadow-xl rounded-2xl flex justify-between items-center">
          <Link
            className="flex gap-2 pl-4 hover:bg-primary cursor-pointer rounded-2xl items-center h-full transition-all duration-300 pr-4"
            to={"/profileUpdate/experience"}
          >
            <div className="flex gap-1">
              <ArrowBackIcon />
              <p>Back</p>
            </div>
          </Link>

          <button
            type="submit"
            className="flex gap-2 pl-4 hover:bg-primary cursor-pointer rounded-2xl items-center h-full transition-all duration-300 pr-4"
            to={"/profileUpdate/information"}
          >
            <div className="flex gap-1">
              <p>Next</p>
              <ArrowForwardIcon />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformation;
