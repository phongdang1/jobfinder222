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
export { handleApplyJob, getCvByUserId };
