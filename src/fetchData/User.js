import axios from "./axios";

const getUserById = (id) => {
    return axios.get(`/getUserById?id=${id}`);
  };
const createNewUser = (userData) => {
  return axios.post("/create-new-user",userData);
}
  export{
    getUserById,
    createNewUser
}