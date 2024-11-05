import axios from "./axios";
const token = localStorage.getItem("token");
const getAllPackage = () => {
    return axios.get("/getAllPackage",{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  };

  const handleCreateNewPackage = (userData) => {
    return axios.post("createNewPackage", userData,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
}

const handleUpdatePackage = (userData) => {
    return axios.post("updatePackage", userData,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
}

const handleActivePackage = (userData) => {
    return axios.post("activePackage", userData,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
}

const handleDeactivePackage = (userData) => {
    return axios.post("deactivePackage", userData,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
}

export {getAllPackage, handleCreateNewPackage, handleUpdatePackage, handleActivePackage, handleDeactivePackage};