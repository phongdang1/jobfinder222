import axios from "./axios";
const token = localStorage.getItem("token")
const getAllSkillWithLimit = (userData, limit, offset) => {
    return axios.get(`getAllSkillWithLimit?limit=${limit}&offset=${offset}`, userData,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
}

const getAllSkill = () => { 
  return axios.get(`getAllSkill`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const handleCreateNewSkill = (userData) => {
    return axios.post("createNewSkill", userData,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
}

const handleUpdateSkill = (userData) => {
    return axios.post("updateSkill", userData,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
}

const handleDeleteSkill = (userData) => {
  return axios.post("/deleteSkill", userData,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
}

const getAllSkillByCategory = (categoryJobCode) => {
  return axios.get(`getAllSkillByCategory?categoryJobCode=${categoryJobCode}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

123

export {getAllSkillWithLimit, handleCreateNewSkill, handleUpdateSkill, handleDeleteSkill, getAllSkillByCategory, getAllSkill};