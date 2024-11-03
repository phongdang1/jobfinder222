import axios from "./axios";

const handleCreateNewAllCode = (userData) => {
    return axios.post("createNewCode", userData)

}

const handleDeleteAllCode = (userData) => {
  return axios.post("deleteCode", userData)
}

const handleUpdateAllCode = (userData) => {
    return axios.post("updateCode", userData)
}

const getAllJobLevel = (userData) => {
    return axios.get("getAllCodeByType?type=JOBLEVEL", userData)
}

const getAllWorkType = (userData) => {
    return axios.get("getAllCodeByType?type=WORKTYPE", userData)
}

const getAllJobType = () => {
    return axios.get("getAllCodeByType?type=JOBTYPE")

}

const getAllCodeByType = (type) => {
  return axios.get(`/getAllCodeByType?type=${type}`);
};

const getAllCode = () => {
  return axios.get("/getAllCode");
};

const getValueByCode = (code) => {
  return axios.get(`/getValueByCode?code=${code}`);
};

export {handleCreateNewAllCode, handleUpdateAllCode, getAllJobLevel, getAllWorkType, getAllJobType, getAllCodeByType, getAllCode, getValueByCode, handleDeleteAllCode};

