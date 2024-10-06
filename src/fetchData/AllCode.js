import axios from "./axios";

const getAllCodeByType = (type) => {
  return axios.get(`/getAllCodeByType?type=${type}`);
};

const getAllCode = () => {
  return axios.get("/getAllCode");
};

const getValueByCode = (code) => {
  return axios.get(`/getValueByCode?code=${code}`);
};

export { getAllCodeByType, getAllCode, getValueByCode };
