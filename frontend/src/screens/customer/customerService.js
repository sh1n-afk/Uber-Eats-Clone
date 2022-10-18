import URLS from "../../global/constants/UrlConstants";
import { getNoAuthCallParams, makeCall } from "../../utils/services";

export const fetchCustomerInfo = async (customerId) => {
  const body = { customerId };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchCustomerInfo, callParams);
  return response;
};

export const searchRestaurants = async (searchStr) => {
  const body = { searchStr };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.searchRestaurants, callParams);
  return response;
};

export const getRestaurants = async () => {
  const body = {};
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchRestaurants, callParams);
  return response;
};

export const addToFavourites = async (customerId, favourites) => {
  const body = { customerId, favourites };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.addFavourites, callParams);
  return response;
};

export const fetchCartItems = async (restaurantId, itemIds) => {
  const body = { restaurantId, itemIds };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchOrderItems, callParams);
  return response;
};

export const fetchAllItems = async (itemIds) => {
  const body = { itemIds };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchAllItems, callParams);
  return response;
};

export const fetchCustomerOrders = async (customerId) => {
  const body = { customerId };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchCustomerOrders, callParams);
  return response;
};

export const insertOrder = async (
  restaurantId,
  customerId,
  deliveryMode,
  items,
  userDate
) => {
  const body = { restaurantId, customerId, deliveryMode, items, userDate };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.insertOrder, callParams);
  return response;
};

export const updateCustomer = async (customerId, customer) => {
  const body = { customerId, customer };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.updateCustomer, callParams);
  return response;
};
