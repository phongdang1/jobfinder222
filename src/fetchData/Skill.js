import axios from "./axios";

const getAllSkillByCategory = (categoryJobCode) => {
  return axios.get(`getAllSkillByCategory?categoryJobCode=${categoryJobCode}`);
};

export { getAllSkillByCategory };
