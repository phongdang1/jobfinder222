import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getCompanyById } from "@/fetchData/Company";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Separator } from "@/components/ui/separator";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/fetchData/User";
import toast from "react-hot-toast";

function AccountInfo() {
  const [companyData, setCompanyData] = useState({});

  const companyId = JSON.parse(localStorage.getItem("companyId"));

  const fetchCompany = async () => {
    try {
      const response = await getCompanyById(companyId);
      console.log(response.data.data);

      setCompanyData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

  const userId = localStorage.getItem("user_id");
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
      }
    }
  };

  return (
    <div className="p-4 mt-4 rounded-md shadow-lg col-span-5 w-full bg-white">
      <p className="text-2xl font-medium p-2">Company Account</p>
      <Table className="my-2">
        <TableBody className="">
          <TableRow className="flex gap-10 hover:bg-transparent border-none">
            <TableCell className="font-medium w-32">Email</TableCell>
            <TableCell className="">
              {companyData?.userData?.[0]?.email}
            </TableCell>
          </TableRow>
          <TableRow className="flex gap-10 hover:bg-transparent border-none">
            <TableCell className="font-medium w-32">Full Name</TableCell>
            <TableCell className="">{companyData?.name}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="">
        <Separator />
      </div>

      <div className="ml-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex gap-4 items-center">
                <p>Change Your Password</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-none">
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
                        <p className="text-red-500 mt-1">
                          {errors.oldPassword}
                        </p>
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
                        <p className="text-red-500 mt-1">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Retype New Password */}
                  <div className="flex flex-col md:flex-row space-x-2 justify-center items-center">
                    <div className="font-medium w-full md:w-1/4">
                      Retype Password:
                    </div>
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
                        <p className="text-red-500 mt-1">
                          {errors.retypePassword}
                        </p>
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
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default AccountInfo;
