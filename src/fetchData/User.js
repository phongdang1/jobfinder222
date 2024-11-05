import axios from "./axios";
const token = localStorage.getItem("token");
const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData, {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in headers
    },
  });
};

const getUsersById = (id) => {
  return axios.get(`/getUserById?id=${id}`);
};

const getAllUsers = () => {
  return axios.get("/getAllUsers");
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
