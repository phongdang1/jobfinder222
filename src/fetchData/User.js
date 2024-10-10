import axios from "./axios";

const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData);
};

const getUsersById = (id) => {
  return axios.get(`/getUserById?id=${id}`);
};

const getAllCompanies = (limit, offset, searchKey) => {
  return axios.get(`/getAllCompanies?limit=${limit}&offset=${offset}&searchKey=${searchKey}`);
};

export { handleSetDataUserDetail, getUsersById, getAllCompanies };