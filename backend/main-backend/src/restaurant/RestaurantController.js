var express = require("express");
const { uploader } = require("../config/cloudinaryConfig");
const { multerUploads, dataUri } = require("../config/multer");
const { sendResponse } = require("../helpers/methods");
const RestaurantService = require("./RestaurantService");
var router = express.Router();

router.post("/", async (req, res) => {
  const result = await RestaurantService.getRestaurants();
  sendResponse(result, res);
});

router.post("/search", async (req, res) => {
  const { searchStr } = req.body;
  const result = await RestaurantService.searchRestaurants(searchStr);
  sendResponse(result, res);
});

router.post("/info", async (req, res) => {
  const { restaurantId } = req.body;
  const result = await RestaurantService.getRestaurantInfo(restaurantId);
  sendResponse(result, res);
});

router.post("/categories", async (req, res) => {
  const { restaurantId } = req.body;
  const result = await RestaurantService.getRestaurantCategories(restaurantId);
  sendResponse(result, res);
});

router.post("/addCategory", async (req, res) => {
  const { restaurantId, categoryName } = req.body;
  const result = await RestaurantService.addCategory(
    restaurantId,
    categoryName
  );
  sendResponse(result, res);
});

router.post("/items", async (req, res) => {
  const { restaurantId } = req.body;
  const result = await RestaurantService.getRestaurantItems(restaurantId);
  sendResponse(result, res);
});

router.post("/addItem", async (req, res) => {
  const { restaurantId, item } = req.body;
  const result = await RestaurantService.addItem(restaurantId, item);
  sendResponse(result, res);
});

router.post("/updateItem", async (req, res) => {
  const { restaurantId, item } = req.body;
  const result = await RestaurantService.updateItem(restaurantId, item);
  sendResponse(result, res);
});

router.post("/update", async (req, res) => {
  const { restaurantId, restaurant } = req.body;
  const result = await RestaurantService.updateRestaurant(
    restaurantId,
    restaurant
  );
  sendResponse(result, res);
});

module.exports = router;
