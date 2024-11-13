import axios from "./axios";

const token = localStorage.getItem("token")
const handleCreateNewAllCode = (userData) => {
    return axios.post("createNewCode", userData,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
)
}

const handleDeleteAllCode = (userData) => {
  return axios.post("deleteCode", userData,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
}

const handleUpdateAllCode = (userData) => {
    return axios.post("updateCode", userData,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
}

const getAllJobLevel = (userData) => {
    return axios.get("getAllCodeByType?type=JOBLEVEL", userData,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
}

const getAllWorkType = (userData) => {
    return axios.get("getAllCodeByType?type=WORKTYPE", userData,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
}

const getAllJobType = () => {
    return axios.get("getAllCodeByType?type=JOBTYPE",{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })

}

const getAllCodeByType = (type) => {
  return axios.get(`/getAllCodeByType?type=${type}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const getAllCode = () => {
  return axios.get("/getAllCode",{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const getValueByCode = (code) => {
  return axios.get(`/getValueByCode?code=${code}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

export {handleCreateNewAllCode, handleUpdateAllCode, getAllJobLevel, getAllWorkType, getAllJobType, getAllCodeByType, getAllCode, getValueByCode, handleDeleteAllCode};

