import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "../../../fetchData/User";
import toast from "react-hot-toast";
import GlobalLoadingMain from "@/components/GlobalLoading/GlobalLoadingMain";
const ChangePassword = () => {
  const userId = localStorage.getItem("user_id");
  // const token = localStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to control loading

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === "newPassword" || name === "retypePassword") {
      validateNewPasswords(name, value);
    }
  };

  const validateNewPasswords = (name, value) => {
    let newErrors = { ...errors };

    if (name === "newPassword") {
      if (value && value === form.oldPassword) {
        newErrors.newPassword =
          "New password cannot be the same as the old password";
      } else {
        delete newErrors.newPassword;
      }
    }

    if (name === "retypePassword" || name === "newPassword") {
      if (form.newPassword && form.retypePassword) {
        if (form.newPassword !== form.retypePassword) {
          newErrors.retypePassword =
            "New password and retype password do not match";
        } else {
          delete newErrors.retypePassword;
        }
      } else {
        delete newErrors.retypePassword;
      }
    }

    setErrors(newErrors);
  };

  const validateNullField = (name, value) => {
    let nullErrors = { ...errors };

    if (!value) {
      nullErrors[name] = `${getFieldLabel(name)} is required`;
    } else {
      delete nullErrors[name];
    }
    setErrors(nullErrors);
  };

  const getFieldLabel = (name) => {
    switch (name) {
      case "oldPassword":
        return "Old password";
      case "newPassword":
        return "New password";
      case "retypePassword":
        return "Retype password";
      default:
        return name;
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    validateNullField(name, value);
    if (name === "newPassword" || name === "retypePassword") {
      validateNewPasswords(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        oldPassword: "Old password is required",
      }));
      return;
    }

    setIsSubmitting(true);

    if (!errors.newPassword && !errors.retypePassword) {
      try {
        const response = await resetPassword(
          userId,
          form.oldPassword,
          form.newPassword
        );
        if (response.data.errCode === 0) {
          toast.success(response.data.errMessage);
          setForm({
            oldPassword: "",
            newPassword: "",
            retypePassword: "",
          });
        } else {
          toast.error(response.data.errMessage);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false); // Stop loading after the search is complete
      }
    }
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-md space-y-4 pb-4">
      <p className="font-poppins text-xl md:text-2xl font-medium ml-6 my-6 italic">
        Reset Your Password
      </p>
      <div className="px-6">
        <Separator />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col px-6 md:px-32 space-y-5">
          {/* Old Password */}
          <div className="flex flex-col md:flex-row space-x-2 justify-center items-center">
            <div className="font-medium w-full md:w-1/4">
              Enter your Password:
            </div>
            <div className="flex flex-col w-full md:w-3/4">
              <Input
                name="oldPassword"
                placeholder="Your old Password here..."
                className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${
                  errors.oldPassword ? "border-red-500" : ""
                }`}
                type="password"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={form.oldPassword}
              />
              {errors.oldPassword && (
                <p className="text-red-500 mt-1">{errors.oldPassword}</p>
              )}
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col md:flex-row space-x-2 justify-center items-center">
            <div className="font-medium w-full md:w-1/4">
              Enter new Password:
            </div>
            <div className="flex flex-col w-full md:w-3/4">
              <Input
                name="newPassword"
                placeholder="Your new Password here..."
                className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
                type="password"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={form.newPassword}
              />
              {errors.newPassword && (
                <p className="text-red-500 mt-1">{errors.newPassword}</p>
              )}
            </div>
          </div>

          {/* Retype New Password */}
          <div className="flex flex-col md:flex-row space-x-2 justify-center items-center">
            <div className="font-medium w-full md:w-1/4">Retype Password:</div>
            <div className="flex flex-col w-full md:w-3/4">
              <Input
                name="retypePassword"
                placeholder="Retype your password..."
                className={`flex items-center rounded-sm border focus:border-primary py-4 px-4 ${
                  errors.retypePassword ? "border-red-500" : ""
                }`}
                type="password"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={form.retypePassword}
              />
              {errors.retypePassword && (
                <p className="text-red-500 mt-1">{errors.retypePassword}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-16 mx-6 md:mx-32">
          <Button
            className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1"
            variant="outline"
            type="submit"
          >
            Save
          </Button>
        </div>
        <GlobalLoadingMain isSubmiting={isSubmitting} />
      </form>
    </div>
  );
};

export default ChangePassword;
