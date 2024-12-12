import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getCompanyById, updateCompany } from "@/fetchData/Company";
import { getAllSkill } from "@/fetchData/Skill";
import Validation from "@/components/User/Common/Validation";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../assets/animation/loadingAnimation.json";
import toast from "react-hot-toast";

const CompanyInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [companyData, setCompanyData] = useState({
    id: "",
    name: "",
    phonenumber: "",
    address: "",
    description: "",
    website: "",
    amountEmployer: "",
    typeCompany: "",
    coverimage: "",
    thumbnail: "",
    file: "",
    allowHotPost: "",
    allowCv: "",
    taxnumber: "",
  });
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState([]);
  const companyId = JSON.parse(localStorage.getItem("companyId"));
  const fetchSkills = async () => {
    try {
      const response = await getAllSkill();
      if (response.status === 200) {
        const uniqueSkills = response.data.data.filter(
          (skill, index, self) =>
            index === self.findIndex((s) => s.categoryJobCode === skill.categoryJobCode)
        );
        setSkills(uniqueSkills);
      } else {
        console.error("Failed to fetch skills");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await getCompanyById(companyId);
      if (response.data.errCode === 0) {
        setCompanyData(response.data.data);
        setInitialData(response.data.data);
      } else {
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      setError("error fetch.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log("update: ", updatedData);
      const validationErrors = Validation(updatedData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name] || "",
      }));

      return updatedData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setCompanyData((prevData) => ({
          ...prevData,
          [e.target.name]: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await updateCompany(
        companyData.id,
        companyData.name,
        companyData.address,
        companyData.description,
        companyData.phonenumber,
        companyData.amountEmployer,
        companyData.coverimage,
        companyData.thumbnail,
        companyData.file,
        companyData.taxnumber,
        companyData.typeCompany,
        companyData.website,
      );
      console.log('res', response)
      if (response.data.errCode === 0) {
        fetchCompany();
        toast.success("Update company success!");
        setIsEditable(false);
        window.location.reload();
      } else {
        setError("loi submit");
      }
    } catch (error) {
      setError("loi submit catch");
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      setCompanyData(initialData);
      setErrors({});
    }
    setIsEditable((prev) => !prev);
  };


  if (error) return <p>{error}</p>;
  console.log("companyData",companyData );
  return (
    <div className="p-4 col-span-5 w-full">
      <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Company Information</h1>
        <div className="col-span-10 flex justify-end py-4">
          {!isEditable ? (
            <Button
              onClick={toggleEdit}
              className="px-6 py-4 bg-primary text-white rounded-md"
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-4 bg-primary text-white rounded-md"
              >
                Save
              </Button>
              <Button
                onClick={toggleEdit}
                className="ml-2 px-6 py-4 bg-primary text-white rounded-md"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-7">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={companyData.name || ""}
                onChange={handleChange}
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                required
                disabled={!isEditable}
              />{errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phonenumber"
                value={companyData.phonenumber || ""}
                onChange={handleChange}
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                required
                disabled={!isEditable}
              />
              {errors.phonenumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-7">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={companyData.address || ""}
                onChange={handleChange}
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                required
                disabled={!isEditable}
              />{errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">Tax Number</label>
              <input
                type="text"
                name="taxnumber"
                value={companyData.taxnumber || ""}
                onChange={handleChange}
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                required
                disabled={!isEditable}
              />
              {errors.taxnumber && (
                <p className="text-red-500 text-sm mt-1">{errors.taxnumber}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <select
              name="typeCompany"
              value={companyData.typeCompany || ""}
              onChange={handleChange}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
              disabled={!isEditable}
            >
              <option value="" disabled>
                -- Select Categories --
              </option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.categoryJobCode}>
                  {skill.categoryJobCode}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700">Number of employees</label>
              <input
                type="text"
                name="amountEmployer"
                value={companyData.amountEmployer || ""}
                onChange={handleChange}
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                disabled={!isEditable}
              />
              {errors.amountEmployer && (
                <p className="text-red-500 text-sm mt-1">{errors.amountEmployer}</p>
              )}
            </div>
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                name="website"
                value={companyData.website || ""}
                onChange={handleChange}
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                disabled={!isEditable}
              />{errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700 pb-1">Cover Image</label>
              <div className="col-span-5 border border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  name="coverimage"
                  onChange={handleFileChange}
                  className={`py-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                  disabled={!isEditable}
                />{companyData.coverimage && (
                  <div className="mt-2 rounded-md overflow-hidden">
                    <img
                      src={companyData.coverimage}
                      alt="Cover"
                      className="w-full h-auto"
                    />
                  </div>
                )}

              </div>
            </div>
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700 pb-1">Thumbnail</label>
              <div className="col-span-5 border border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleFileChange}
                  className={`py-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}
                  disabled={!isEditable}
                />{companyData.thumbnail && (
                  <div className="mt-2 rounded-md overflow-hidden">
                    <img
                      src={companyData.thumbnail}
                      alt="Cover"
                      className="w-full h-auto"
                    />
                  </div>
                )}

              </div>
            </div>
          </div>
          {loading && (
            <div className="fixed inset-0 flex justify-center items-center opacity-55 z-50">
              <Lottie
                className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]"
                animationData={loadingAnimation}
                loop
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
