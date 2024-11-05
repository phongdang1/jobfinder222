import axios from "./axios";
const token = localStorage.getItem("token")
const getAllPostsInactive = (searchKey) => {
  return axios.get(`getAllPost?searchKey=${searchKey}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};
const getAllPostWithLimit = (limit, offset) => {
  return axios.get(`getAllPostWithLimit?limit=${limit}&offset=${offset}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const getAllPost = () => {
  return axios.get(`/getAllPost`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};
const createNewPost = (data) => {
  return axios.post(`/createNewPost`, data,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}

const getDetailPostById = (id) => {
  return axios.get(`getDetailPostById?id=${id}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const banPost = (id, note) => {
  return axios.post(`/banPost`, {
    id: id,
    note: note
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}
const unbanPost = (id, note, userId) => {
  return axios.post(`/unBanPost`, {
    id: id,
    note: note,
    userId: userId
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}

const inactivePost = (id, note) => {
  return axios.post(`/rejectPost`, {
    id: id,
    note: note
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}
const activePost = (id) => {
  return axios.post(`/approvePost`, {
    id: id
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}

export {getDetailPostById, banPost, unbanPost, activePost, inactivePost, getAllPostsInactive, getAllPostWithLimit, getAllPost, createNewPost };
