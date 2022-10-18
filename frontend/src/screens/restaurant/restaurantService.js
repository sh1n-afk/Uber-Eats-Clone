import axios from "axios";
import URLS from "../../global/constants/UrlConstants";
import {
  getFileUploadCallParams,
  getNoAuthCallParams,
  makeCall,
} from "../../utils/services";

export const fetchRestaurantInfo = async (restaurantId) => {
  const body = { restaurantId };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchRestaurantInfo, callParams);
  return response;
};

export const fetchCategories = async (restaurantId) => {
  const body = { restaurantId };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchRestaurantCategories, callParams);
  return response;
};

export const fetchItems = async (restaurantId) => {
  const body = { restaurantId };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchRestaurantItems, callParams);
  return response;
};

export const insertCategory = async (restaurantId, categoryName) => {
  const body = { restaurantId, categoryName };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.insertCategory, callParams);
  return response;
};

export const insertItem = async (restaurantId, item) => {
  const body = { restaurantId, item };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.insertItem, callParams);
  return response;
};

export const updateItem = async (restaurantId, item) => {
  const body = { restaurantId, item };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.updateItem, callParams);
  return response;
};

export const insertImage = async (imageFile) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageFile);

  const response = await axios.post(URLS.insertImage, imageFormData, {
    headers: { "content-type": "multipart/form-data" },
  });

  return response;
};

export const fetchRestaurantOrders = async (restaurantId) => {
  const body = { restaurantId };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchRestaurantOrders, callParams);
  return response;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  const body = { orderId, orderStatus };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.updateOrder, callParams);
  return response;
};

export const updateRestaurant = async (restaurantId, restaurant) => {
  const body = { restaurantId, restaurant };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.updateRestaurant, callParams);
  return response;
};
