import axios from "./axios";

const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData);
};

const getUsersById = (id) => {
  return axios.post(`/getUserById?id${id}`);
};

export { handleSetDataUserDetail, getUsersById };
