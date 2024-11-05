import axios from "./axios";
const token = localStorage.getItem("token");
const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const getUsersById = (id) => {
  return axios.get(`/getUserById?id=${id}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const getAllUsers = () => {
  return axios.get("/getAllUsers",{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};
const resetPassword = (id, oldPassword, newPassword) => {
  return axios.post(
    `/changePassword`,
    {
      userId: id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    }
  );
};
export { handleSetDataUserDetail, getUsersById, resetPassword, getAllUsers };
