import URLS from "../../../global/constants/UrlConstants";
import { getNoAuthCallParams, makeCall } from "../../../utils/services";

export const registerCustomer = async (email, password, name) => {
  const body = { email, password, name };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.registerCustomer, callParams);
};

export const registerRestaurant = async (email, password, name, location) => {
  const body = { email, password, name, location };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.registerRestaurant, callParams);
};

export const login = async (email, password, memberType) => {
  const body = { email, password, memberType };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.login, callParams);
  return response;
};
