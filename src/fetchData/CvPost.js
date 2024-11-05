import axios from "./axios";
const token = localStorage.getItem("token")
const handleApplyJob = (userId, postId, description) => {
  return axios.post("/applyJob", {
    userId: userId,
    postId: postId,
    description: description,
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};
const getCvByUserId = (userId) => {
  return axios.get(`/getAllCvPostByUserId?userId=${userId}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const handleFindCv = (userData) => {
  return axios.post("/handleFindCv", userData,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const checkViewCompany = (userId) => {
  return axios.get(`/checkViewCompany?userId=${userId}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

const getAllCvPostByCompanyId = (companyId) => {
  return axios.get(`/getAllCvPostByCompanyId?companyId=${companyId}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};
const handleCreateInterviewSchedule = (data) => {
  return axios.post(`/createInterviewSchedule`, data,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
}
const handleRejectCvPost = (cvPostId) => {
  return axios.post(`/handleRejectCvPost`, {
    cvPostId : cvPostId
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
}
const handleApproveCvPost = (cvPostId) => {
  return axios.post(`/handleApproveCvPost`, {
    cvPostId : cvPostId
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
}

export {
  handleApplyJob,
  getCvByUserId,
  handleFindCv,
  checkViewCompany,
  getAllCvPostByCompanyId,
  handleCreateInterviewSchedule,
  handleRejectCvPost,
  handleApproveCvPost
};
