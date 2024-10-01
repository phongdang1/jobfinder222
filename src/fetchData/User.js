import axios from "./axios";

const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData);
};

const getUsersById = (id) => {
  return axios.get(`/getUserById?id=${id}`);
};

export { handleSetDataUserDetail, getUsersById };
