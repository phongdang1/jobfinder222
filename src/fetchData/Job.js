import axios from "./axios";
const token = localStorage.getItem("token");
const getAllPosts = () => {
    return axios.get("/getAllPost?limit=10&offset=1",{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
}
const getAllPostHomePage = () => {
    return axios.get("/getAllPost",{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
}
export {
    getAllPosts,getAllPostHomePage
}