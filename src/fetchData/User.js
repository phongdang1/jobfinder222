import axios from "./axios";

const getProfile = () => {
  return axios.get("/get-user-by-id");
};
const createNewUser = (userData) => {
  return axios.post("/create-new-user", userData);
};

const getAllCodeByType = (type) => {
  return axios.get(`/getAllCodeByType?type=${type}`);
};

const getAllSkillByCategory = (categoryJobCode) => {
  return axios.get(`getAllSkillByCategory?categoryJobCode=${categoryJobCode}`);
};

const handleSetDataUserDetail = (userData) => {
  return axios.post(`/setDataUserDetail`, userData);
};

const getUsersById = (id) => {
  return axios.post(`/getUserById?id${id}`);
};

export {
  getProfile,
  createNewUser,
  getAllCodeByType,
  getAllSkillByCategory,
  handleSetDataUserDetail,
  getUsersById,
};
