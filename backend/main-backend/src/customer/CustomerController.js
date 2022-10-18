var express = require("express");
const { sendResponse } = require("../helpers/methods");
const CustomerService = require("./CustomerService");
// var kafka = require("../utils/kafka/client");
var router = express.Router();

router.post("/info", async (req, res) => {
  const { customerId } = req.body;
  const result = await CustomerService.getCustomerInfo(customerId);
  sendResponse(result,res);
});

router.post("/addFavourites", async (req, res) => {
  const { customerId, favourites } = req.body;
  const result = await CustomerService.updateFavorites(customerId, favourites);
  sendResponse(result,res);
});

router.post("/update", async (req, res) => {
  const { customerId, customer } = req.body;
  const result = await CustomerService.updateCustomer(customerId, customer);
  // kafka.make_request("update_customer", req.body, function (result) {
  //   console.log("in result");
  //   console.log(result);
  //   sendResponse(result, res);    
  // });
  sendResponse(result,res);
});

module.exports = router;
