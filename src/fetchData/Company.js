import axios from "./axios";

const getAllCompanies = () => {
    return axios.get("/getAllCompanies");
}
const getCompanyById = (companyId) => {
    return axios.get(`/getCompanyById?id=${companyId}`);
}
export {getAllCompanies,getCompanyById}