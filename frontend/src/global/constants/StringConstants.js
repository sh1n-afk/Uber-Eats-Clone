class StringConstants {
  //call types
  get = "GET";
  post = "POST";
  put = "PUT";
  deleteRequest = "DELETE";

  //contentTypes
  applicationJSON = { "Content-Type": "application/json" };
  multipartForm = { "Content-Type": "multipart/form-data" };

  //regex
  emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  //constants
  restaurant = "restaurant";
  customer = "customer";
  login = "Login";
  register = "Register";

  //address
  addressAuthToken =
    "B6_wCgZAcZS5s4fhHvwE3vTpp39NKLaDvh-0A5qIdefrcGg5Jl1M1PYF4ttbvVyZbQ8";
  defaultAddress = "Default";

  //orders
  delivery = "Delivery";
  pickup = "Pickup";
  received = "Received";
  preparing = "Preparing";
  cancelled = "Cancelled";
  onTheWay = "On The Way";
  delivered = "Delivered";
  pickUpReady = "Pick up Ready";
  pickedUp = "Picked Up";
}

const STRINGS = new StringConstants();
export default STRINGS;
