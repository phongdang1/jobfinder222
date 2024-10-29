import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { getCompanyById, updateCompany } from '@/fetchData/Company';

const CompanyInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [companyData, setCompanyData] = useState({
    id: '',
    name: '',
    phonenumber: '',
    address: '',
    description: '',
    website: '',
    amountEmployer: '',
    typeCompany: '',
    coverimage: '',
    thumbnail: '',
    file: '',
  });

  const userId = localStorage.getItem("user_id");

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await getCompanyById(userId);
      if (response.data.errCode === 0) {
        setCompanyData(response.data.data);
      } else {
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
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
          setCompanyData({
            ...companyData,
            [e.target.name]: base64
          });
        })
        .catch((error) => {
          console.error("Error converting file to base64: ", error);
        });
    } else {
      console.error("No file selected");
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
      );
      console.log("submit: ",response.data);
      if (response.data.errCode === 0) {
        fetchCompany();
        setIsEditable(false);
      } else {
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Thông tin công ty</h1>
        <div className="col-span-10 flex justify-end py-4">
          {!isEditable ? (
            <Button onClick={toggleEdit} className="px-6 py-4 bg-primary text-white rounded-md">
              Chỉnh sửa
            </Button>
          ) : (
            <>
              <Button type="submit" onClick={handleSubmit} className="px-6 py-4 bg-primary text-white rounded-md">
                Lưu
              </Button>
              <Button onClick={toggleEdit} className="ml-2 px-6 py-4 bg-primary text-white rounded-md">
                Hủy
              </Button>
            </>
          )}
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-7">
              <label className="block text-sm font-medium text-gray-700">Tên</label>
              <input
                type="text"
                name="name"
                value={companyData.name || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                disabled={!isEditable}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">Điện thoại</label>
              <input
                type="tel"
                name="phonenumber"
                value={companyData.phonenumber || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-7">
              <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={companyData.address || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                disabled={!isEditable}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">Mã số thuế</label>
              <input
                type="text"
                name="taxnumber"
                value={companyData.taxnumber || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                disabled={!isEditable}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lĩnh vực</label>
            <input
              type="text"
              name="typeCompany"
              value={companyData.typeCompany || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              disabled={!isEditable}
            />
          </div>
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700">Allow Hot Post</label>
              <input
                type="text"
                name="allowHotPost"
                value={companyData.allowHotPost || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                disabled={!isEditable}
              />
            </div>
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700">Allow CV</label>
              <input
                type="text"
                name="allowCv"
                value={companyData.allowCv || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700">Số lượng nhân viên</label>
              <input
                type="text"
                name="amountEmployer"
                value={companyData.amountEmployer || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                disabled={!isEditable}
              />
            </div>
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                name="website"
                value={companyData.website || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-10">
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
                disabled={!isEditable}
              />
              <img
                src={companyData.thumbnail}
              ></img>
            </div>
            <div className="col-span-10">
              <label className="block text-sm font-medium text-gray-700">Ảnh bìa</label>
              <input
                type="file"
                name="coverimage"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-16 "
                disabled={!isEditable}
              />
              <img
                className='w-full h-full max-h-[400px]'
                src={companyData.coverimage}
              ></img>
            </div>
            <div className="col-span-10">
              <label className="block text-sm font-medium text-gray-700">Video công ty</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-10"
                disabled={!isEditable}
              />
              <img
                width={"100%"}
                height={"200px"}
                src={companyData.file}
              ></img>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
