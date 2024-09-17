import axios from "./axios";

const getProfile = () => {
    return axios.get("/get-user-by-id");
  };
const createNewUser = (userData) => {
  return axios.post("/create-new-user",userData);
}
  export{
    getProfile,
    createNewUser
}