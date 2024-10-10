import axios from "./axios";


const getAllCompanies = (searchKey) => {
    return axios.get(`/getAllCompaniesInactive?searchKey=${searchKey}`);
}
const getCompanyById = (companyId) => {
    return axios.get(`/getCompanyById?id=${companyId}`);
}
const banCompany = (companyId) => {
    return axios.post(`/banCompany`, {
        companyId: companyId
    });
}
const unbanCompany = (companyId) => {
    return axios.post(`/unBanCompany`, {
        companyId: companyId
    });
}

const inactiveCompany = (companyId) => {
    return axios.post(`/rejectCompany`, {
        companyId: companyId
    });
}
const activeCompany = (companyId) => {
    return axios.post(`/approveCompany`, {
        companyId: companyId
    });
}
export {getAllCompanies,getCompanyById, banCompany, inactiveCompany, activeCompany, unbanCompany}