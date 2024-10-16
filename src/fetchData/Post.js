import axios from "./axios";

const getAllPostWithLimit = (limit, offset) => {
  return axios.get(`getAllPostWithLimit?limit=${limit}&offset=${offset}`);
};

const getDetailPostById = (id) => {
  return axios.get(`getDetailPostById?id=${id}`);
};

const getAllPost = () => {
  return axios.get(`/getAllPost`);
};
const createNewPost = (data) => {
  return axios.post(`/createNewPost`, data);
}



export { getAllPostWithLimit, getDetailPostById, getAllPost, createNewPost };
