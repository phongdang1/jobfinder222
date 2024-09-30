import axios from "./axios";

const getProfile = () => {
  return axios.get("/get-user-by-id");
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
