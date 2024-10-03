import axios from './axios'

const sendOtp = (email) => {
    return axios.post('/sendOtp', {
        email: email,
    });
}
const verifyOtp = (email, otp) => {
    return axios.post('/verifyOtp', {
        email: email,
        otp: otp,
    });
}
export {sendOtp, verifyOtp}