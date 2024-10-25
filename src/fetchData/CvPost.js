import axios from "./axios";

const handleApplyJob = (userId, postId, description) => {
  return axios.post("/applyJob", {
    userId: userId,
    postId: postId,
    description: description,
  });
};
const getCvByUserId = (userId) => {
  return axios.get(`/getAllCvPostByUserId?userId=${userId}`);
}
const getAllCvPostByCompanyId = (companyId) => {
  return axios.get(`/getAllCvPostByCompanyId?companyId=${companyId}`);
}
export { handleApplyJob, getCvByUserId, getAllCvPostByCompanyId };
