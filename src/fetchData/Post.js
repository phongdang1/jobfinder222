import axios from "./axios";

const getAllPostsInactive = (searchKey) => {
  return axios.get(`getAllPost?searchKey=${searchKey}`);
};

const getAllPostWithLimit = (limit, offset) => {
  return axios.get(`getAllPostWithLimit?limit=${limit}&offset=${offset}`);
};

const getAllPost = () => {
  return axios.get(`/getAllPost`);
};

const createNewPost = (data) => {
  return axios.post(`/createNewPost`, data);
};

const getDetailPostById = (id) => {
  return axios.get(`getDetailPostById?id=${id}`);
};

const banPost = (id, note) => {
  return axios.post(`/banPost`, {
    id: id,
    note: note,
  });
};
const unbanPost = (id, note, userId) => {
  return axios.post(`/unBanPost`, {
    id: id,
    note: note,
    userId: userId,
  });
};

const inactivePost = (id, note) => {
  return axios.post(`/rejectPost`, {
    id: id,
    note: note,
  });
};
const activePost = (id) => {
  return axios.post(`/approvePost`, {
    id: id,
  });
};

export {
  getDetailPostById,
  banPost,
  unbanPost,
  activePost,
  inactivePost,
  getAllPostsInactive,
  getAllPostWithLimit,
  getAllPost,
  createNewPost,
};
