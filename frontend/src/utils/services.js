import NOTIFICATIONS from "../global/constants/NotificationConstants";
import STRINGS from "../global/constants/StringConstants";
import axiosInstance from "./axios-instance";

export async function getCallParams(body) {
  //   let auth = store.getState().auth;

  return {
    method: STRINGS.post,
    // headers: await getHeaderObject(auth, strings.applicationJSON),
    data: body,
  };
}

export function getNoAuthCallParams(body) {
  return {
    method: STRINGS.post,
    headers: STRINGS.applicationJSON,
    data: body,
  };
}

export function getFileUploadCallParams(body) {
  return {
    method: STRINGS.post,
    headers: STRINGS.multipartForm,
    data: body,
  };
}

export async function makeCall(url, callParams) {
  try {
    const response = await axiosInstance({
      url: url,
      ...callParams,
    });
    return { error: false, data: response.data };
  } catch (error) {
    if (error.message === NOTIFICATIONS.TIMEOUT_ERROR) {
      return { error: true, message: error.message };
    }
    if (error.response && error.response.data) {
      return { error: true, message: error.message, ...error.response.data };
    }
    return { error: true, message: error.message };
  }
}
