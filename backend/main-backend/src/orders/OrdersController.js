var express = require("express");
const { sendResponse } = require("../helpers/methods");
const OrdersService = require("./OrdersService");
// var kafka = require("../utils/kafka/client");
var router = express.Router();

router.post("/customer", async (req, res) => {
  const { customerId } = req.body;
  const result = await OrdersService.getCustomerOrders(customerId);
  sendResponse(result, res);
});

router.post("/restaurant", async (req, res) => {
  const { restaurantId } = req.body;
  const result = await OrdersService.getRestaurantOrders(restaurantId);
  sendResponse(result, res);
});

router.post("/items", async (req, res) => {
  const { restaurantId, itemIds } = req.body;
  const result = await OrdersService.getOrderItems(restaurantId, itemIds);
  sendResponse(result, res);
});

router.post("/allItems", async (req, res) => {
  const { itemIds } = req.body;
  const result = await OrdersService.getAllItems(itemIds);
  sendResponse(result, res);
});

router.post("/insertOrder", async (req, res) => {
  const { restaurantId, customerId, deliveryMode, items, userDate } = req.body;
  const result = await OrdersService.insertOrder(
    restaurantId,
    customerId,
    deliveryMode,
    items,
    userDate
  );
  sendResponse(result, res);
  // kafka.make_request("place_order", req.body, function (result) {
  //   console.log("in result");
  //   console.log(result);
  //   sendResponse(result, res);
  // });
});

router.post("/updateOrder", async (req, res) => {
  const { orderId, orderStatus } = req.body;
  const result = await OrdersService.updateOrder(orderId, orderStatus);
  console.log(result)
  sendResponse(result, res);
});

module.exports = router;
