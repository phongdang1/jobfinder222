import axios from "./axios";

const getAllPosts = () => {
    return axios.get("/getAllPost?limit=10&offset=1");
}
const getAllPostHomePage = () => {
    return axios.get("/getAllPost");
}
export {
    getAllPosts,getAllPostHomePage
}