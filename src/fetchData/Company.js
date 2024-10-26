import axios from "./axios";


const getAllCompanies = (searchKey) => {
    return axios.get(`/getAllCompaniesInactive?searchKey=${searchKey}`);
}
const getAllCompaniesUser = (searchKey) => {
    return axios.get(`/getAllCompanies?searchKey=${searchKey}`);
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
const updateCompany = (companyId, name, address, description, phonenumber, amountEmployer, coverimage, thumbnail, file) => {
    return axios.post(`/updateCompany`, {
        companyId: companyId, 
        name: name,
        address: address,
        description: description,
        phonenumber: phonenumber, 
        amountEmployer: amountEmployer,
        coverimage: coverimage, 
        thumbnail: thumbnail, 
        file: file
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
export {getAllCompanies,getCompanyById, banCompany, inactiveCompany, activeCompany, unbanCompany, getAllCompaniesUser, updateCompany}