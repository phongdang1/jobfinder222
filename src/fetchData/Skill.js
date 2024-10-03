import axios from "./axios";

const getAllSkillWithLimit = (userData, limit, offset) => {
    return axios.get(`getAllSkillWithLimit?limit=${limit}&offset=${offset}`, userData)
}

const handleCreateNewSkill = (userData) => {
    return axios.post("createNewSkill", userData)
}

const handleUpdateSkill = (userData) => {
    return axios.post("updateSkill", userData)
}

const handleDeleteSkill = (userData) => {
    return axios.post("/deleteSkill", userData)
}

const getAllSkillByCategory = (categoryJobCode) => {
  return axios.get(`getAllSkillByCategory?categoryJobCode=${categoryJobCode}`);
};

123

export {getAllSkillWithLimit, handleCreateNewSkill, handleUpdateSkill, handleDeleteSkill, getAllSkillByCategory};