import axios from "axios";
import NOTIFICATIONS from "../global/constants/NotificationConstants";

const timeoutDuration = 10 * 1000; // 10 seconds to milliseconds

const axiosInstance = axios.create({
  timeout: timeoutDuration,
  timeoutErrorMessage: NOTIFICATIONS.TIMEOUT_ERROR,
});

export default axiosInstance;
