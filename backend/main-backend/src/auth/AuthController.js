var express = require("express");
const { STRINGS } = require("../constants/StringConstants");
const {
  sendResponse,
  createSuccessResult,
  createErrorResult,
} = require("../helpers/methods");
const AuthService = require("./AuthService");
// var kafka = require("../utils/kafka/client");
const { multerUploads, dataUri } = require("../config/multer");
const { uploader } = require("../config/cloudinaryConfig");
var router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, memberType } = req.body;
  let result;
  if (memberType === STRINGS.customer) {
    result = await AuthService.loginCustomer(email, password);
  }
  if (memberType === STRINGS.restaurant) {
    result = await AuthService.loginRestaurant(email, password);
  }
  sendResponse(result, res);
  // kafka.make_request("login", req.body, function (result) {
  //   console.log("in result");
  //   console.log(result);
  //   sendResponse(result, res);
  // });
});

router.post("/register/restaurant", (req, res) => {
  const { email, password, name, location } = req.body;
  AuthService.registerRestaurant(email, password, name, location);
});

router.post("/register/customer", (req, res) => {
  const { email, password, name } = req.body;
  AuthService.registerCustomer(email, password, name);
});

router.post("/countries", async (req, res) => {
  const result = await AuthService.getCountries();
  sendResponse(result, res);
});

router.post("/states", async (req, res) => {
  const { countryId } = req.body;
  const result = await AuthService.getStates(countryId);
  sendResponse(result, res);
});

router.post("/cities", async (req, res) => {
  const { countryId, stateId } = req.body;
  const result = await AuthService.getCities(stateId, countryId);
  sendResponse(result, res);
});

router.post("/image", multerUploads, async (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then((result) => {
        const image = result.url;
        sendResponse(createSuccessResult({ image }), res);
      })
      .catch((err) => {
        const result = createErrorResult(
          "Someting went wrong while processing your request",
          {
            error: err,
          }
        );
        sendResponse(result, res);
      });
  }
  // const { formData } = req.body;
  // const result = await RestaurantService.addRestaurantImage(
  //   formData.get("restaurantId"),
  //   formData.get("image")
  // );
  // sendResponse(result, res);
});

router.post("/insertImage", uploader.single("image"), async (req, res) => {
  if (req.file) {
    const image = req.file.path;
    sendResponse(createSuccessResult({ image }), res);
  } else {
    const result = createErrorResult(
      "Someting went wrong while processing your request",
    );
    sendResponse(result, res);
  }
});

module.exports = router;
