import axios from "./axios";

const getUserById = (id) => {
    return axios.get(`/getUserById?id=${id}`);
  };
const createNewUser = (userData) => {
  return axios.post("/create-new-user", userData);
};

const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData);
};

const getUsersById = (id) => {
  return axios.post(`/getUserById?id${id}`);
};

export { getProfile, createNewUser, handleSetDataUserDetail, getUsersById };
