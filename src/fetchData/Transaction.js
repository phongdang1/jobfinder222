import axios from "./axios";
const token = localStorage.getItem("token");
const createPaymentViewCv = (packageId) => {
  return axios.post(
    "createPaymentViewCv",
    {
      id: packageId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const executePaymentViewCv = (data) => {
  return axios.post(
    `executePaymentViewCv?paymentId=${data.paymentId}&token=${data.token}&PayerID=${data.PayerID}&userId=${data.userId}&packageId=${data.packageId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export { createPaymentViewCv,executePaymentViewCv };
