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



export { getAllPostWithLimit, getDetailPostById, getAllPost };
