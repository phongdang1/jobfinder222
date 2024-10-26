import axios from "./axios";

const getAllPackage = () => {
    return axios.get("/getAllPackage");
  };

  const handleCreateNewPackage = (userData) => {
    return axios.post("createNewPackage", userData)
}

const handleUpdatePackage = (userData) => {
    return axios.post("updatePackage", userData)
}

const handleActivePackage = (userData) => {
    return axios.post("activePackage", userData)
}

const handleDeactivePackage = (userData) => {
    return axios.post("deactivePackage", userData)
}

export {getAllPackage, handleCreateNewPackage, handleUpdatePackage, handleActivePackage, handleDeactivePackage};