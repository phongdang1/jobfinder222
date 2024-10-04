import axios from "./axios";

const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData);
};

const getUsersById = (id) => {
  return axios.get(`/getUserById?id=${id}`);
};
const resetPassword = (id, oldPassword, newPassword) => {
  return axios.post(`/changePassword`,{
    userId : id,
    oldPassword : oldPassword,
    newPassword : newPassword,
  });
}

export { handleSetDataUserDetail, getUsersById , resetPassword };

