import axios from "./axios";

const getAllPosts = () => {
    return axios.get("/getAllPost?limit=10&offset=1");
}

export {
    getAllPosts
}