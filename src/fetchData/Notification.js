import axios from "./axios";

const handleCheckNotification = (notificationId) => {
  return axios.post("/handleCheckNotification", { notificationId });
};

export { handleCheckNotification };
