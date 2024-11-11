import axios from "./axios";

const createNewReport = (data) => {
  return axios.post("/createNewReport", data);
};

export { createNewReport };
