import axios from "./axios";

const getAllCodeByType = (type) => {
  return axios.get(`/getAllCodeByType?type=${type}`);
};

const getAllCode = () => {
  return axios.get("/getAllCode");
};

export { getAllCodeByType, getAllCode };
