import axios from "axios";

const createPaymentViewCv = (packageId) => {
    return axios.post('createPaymentViewCv', {
        id : packageId,
    })
}

export {createPaymentViewCv} 