import axios from './axios'
const token = localStorage.getItem('token')
const sendOtp = (email) => {
    return axios.post('/sendOtp', {
        email: email,
    },{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
}
const verifyOtp = (email, otp) => {
    return axios.post('/verifyOtp', {
        email: email,
        otp: otp,
    },{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
}
export {sendOtp, verifyOtp}