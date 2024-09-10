import axios from "./axios";

const getProfile = () => {
    return axios.get("/get-user-by-id");
  };

  export{
    getProfile,
}