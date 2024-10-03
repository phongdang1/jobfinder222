import axios from "./axios";

const handleCreateNewAllCode = (userData) => {
    return axios.post("createNewCode", userData)

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



export {handleCreateNewAllCode, handleUpdateAllCode, getAllJobLevel, getAllWorkType, getAllJobType};