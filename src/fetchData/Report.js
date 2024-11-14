import axios from "./axios";

const token = localStorage.getItem('token');
// Create new report
const createNewReport = (data) => {
  return axios.post("/createNewReport", data,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Get all reports
const getAllReport = () => { // No need to pass `data` in GET request
  return axios.get(`getAllReport`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Check report (ensure this matches your backend route)
const handleCheckReport = (data) => {
  return axios.post("/checkReport", data); // Keep POST if it's supposed to be a POST request
};

// Get report by post ID
const getReportByPostId = (data) => {
  return axios.get("/getReportByPostId", { params: data }); // Use `params` for GET query parameters
};

export { createNewReport, getAllReport, handleCheckReport, getReportByPostId };
