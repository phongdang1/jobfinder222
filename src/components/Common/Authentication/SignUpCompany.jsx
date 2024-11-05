import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Validation from "@/components/User/Common/Validation";
import { useNavigate } from "react-router-dom";
import { handleSetDataUserDetail } from "@/fetchData/User";
import { Button } from "@/components/ui/button";
import { description } from "@/components/Admin/components/LineChart";
import { createNewCompany } from "@/fetchData/Company";
import UserProfileUpdateHeader from "@/components/User/UserProfileUpdate/Common/UserProfileUpdateHeader";
import toast from "react-hot-toast";

function SignUpCompany() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    phonenumber: "",
    amountEmployer: "",
    typeCompany: "",
    userId: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: "" });
  };

  const userId = localStorage.getItem("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = Validation(formData);
    const dataSent = {
      name: formData.name,
      address: formData.address,
      description: formData.description,
      phonenumber: formData.phonenumber,
      amountEmployer: formData.amountEmployer,
      typeCompany: formData.typeCompany,
      userId: userId,
    };

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
    } else {
      try {
        const response = await createNewCompany(dataSent);
        if (response) {
          console.log(response);
          localStorage.setItem("company", JSON.stringify(response.data));
          localStorage.setItem("companyId", JSON.stringify(response.data.id));
          navigate("/company/dashboard");
          toast.success("Company profile updated !!!")
        } else {
          console.log("Profile update failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <UserProfileUpdateHeader />
      <div className="h-full bg-white border border-gray-200 shadow-lg my-4 mx-4 lg:mx-44 rounded-lg">
        <p className="text-center text-2xl font-semibold pt-8 pb-4">
          Sign up as an Employer
        </p>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-4/5 w-full">
            <div className="h-[460px] lg:h-[600px] mx-4 md:mx-10 lg:mx-20 xl:mx-40 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col items-center mt-8 space-y-6">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    className={`${
                      errorMessage.name
                        ? "border-red-500"
                        : "focus:border-primary"
                    } rounded-lg`}
                    onChange={handleInputChange}
                    value={formData.name}
                  />
                  {errorMessage.name && (
                    <p className="text-red-500">{errorMessage.name}</p>
                  )}
                </div>

                <div className="flex flex-col w-full max-w-sm gap-1.5">
                  <Label htmlFor="address">Company Address</Label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Company Address"
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

                <div className="flex flex-col w-full max-w-sm gap-1.5">
                  <Label htmlFor="phonenumber">Contact Number</Label>
                  <Input
                    type="text"
                    name="phonenumber"
                    placeholder="Contact Number"
                    className={`${
                      errorMessage.phonenumber
                        ? "border-red-500"
                        : "focus:border-primary"
                    } rounded-lg`}
                    onChange={handleInputChange}
                    value={formData.phonenumber}
                  />
                  {errorMessage.phonenumber && (
                    <p className="text-red-500">{errorMessage.phonenumber}</p>
                  )}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="amountEmployer">Amount Employee</Label>
                  <Input
                    type="text"
                    name="amountEmployer"
                    placeholder="Amount Employee"
                    className={`${
                      errorMessage.amountEmployer
                        ? "border-red-500"
                        : "focus:border-primary"
                    } rounded-lg`}
                    onChange={handleInputChange}
                    value={formData.amountEmployer}
                  />
                  {errorMessage.amountEmployer && (
                    <p className="text-red-500">
                      {errorMessage.amountEmployer}
                    </p>
                  )}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="typeCompany">Company Specialize</Label>
                  <Input
                    type="text"
                    name="typeCompany"
                    placeholder="Company Specialize"
                    className={`${
                      errorMessage.typeCompany
                        ? "border-red-500"
                        : "focus:border-primary"
                    } rounded-lg`}
                    onChange={handleInputChange}
                    value={formData.typeCompany}
                  />
                  {errorMessage.typeCompany && (
                    <p className="text-red-500">{errorMessage.typeCompany}</p>
                  )}
                </div>
              </div>

              <div className="w-full mt-8 items-center">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`h-[300px] lg:h-[400px] ${
                      errorMessage.description
                        ? "border-red-500"
                        : "focus:border-primary"
                    } rounded-lg`}
                  />
                  {errorMessage.description && (
                    <p className="text-red-500">{errorMessage.description}</p>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="flex justify-center lg:justify-end mx-4 lg:mx-40 my-4">
            <Button
              variant="outline"
              className="w-full lg:w-auto border border-primary text-primary bg-white hover:bg-primary hover:text-white"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpCompany;
