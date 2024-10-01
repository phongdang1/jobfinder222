import axios from "./axios";

const createNewUser = (userData) => {
  return axios.post("/create-new-user", userData);
};

const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData);
};

const getUsersById = (id) => {
  return axios.post(`/getUserById?id${id}`);
};

export { createNewUser, handleSetDataUserDetail, getUsersById };
