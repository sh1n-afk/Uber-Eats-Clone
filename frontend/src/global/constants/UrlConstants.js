class UrlConstants {
  url = "http://localhost:3001";
  // url = "http://3.131.98.11:3001";
  // url = "http://3.137.189.157:3001";

  customer = "customer";
  restaurant = "restaurant";
  orders = "orders";

  //view-paths
  homePath = "/";
  customerProfilePath = "/customer/profile";
  customerOrdersPath = "/customer/orders";
  restaurantProfilePath = "/restaurant/profile";
  restaurantOrdersPath = "/restaurant/orders";
  restaurantMenuViewPath = "/restaurant/menu";
  itemsViewPath = "/items";

  //auth
  login = `${this.url}/login`;
  registerCustomer = `${this.url}/register/customer`;
  registerRestaurant = `${this.url}/register/restaurant`;

  fetchCounties = `${this.url}/countries`;
  fetchStates = `${this.url}/states`;
  fetchCities = `${this.url}/cities`;
  insertImage = `${this.url}/insertImage`;

  //customer
  fetchCustomerInfo = `${this.url}/${this.customer}/info`;
  addFavourites = `${this.url}/${this.customer}/addFavourites`;
  updateCustomer = `${this.url}/${this.customer}/update`;

  //restaurant
  fetchRestaurants = `${this.url}/${this.restaurant}`;
  searchRestaurants = `${this.url}/${this.restaurant}/search`;
  fetchRestaurantInfo = `${this.url}/${this.restaurant}/info`;
  fetchRestaurantCategories = `${this.url}/${this.restaurant}/categories`;
  fetchRestaurantItems = `${this.url}/${this.restaurant}/items`;
  insertCategory = `${this.url}/${this.restaurant}/addcategory`;
  insertItem = `${this.url}/${this.restaurant}/addItem`;
  updateItem = `${this.url}/${this.restaurant}/updateItem`;
  updateRestaurant = `${this.url}/${this.restaurant}/update`;

  //orders
  fetchCustomerOrders = `${this.url}/${this.orders}/customer`;
  fetchRestaurantOrders = `${this.url}/${this.orders}/restaurant`;
  fetchOrderItems = `${this.url}/${this.orders}/items`;
  fetchAllItems = `${this.url}/${this.orders}/allItems`;
  insertOrder = `${this.url}/${this.orders}/insertOrder`;
  updateOrder = `${this.url}/${this.orders}/updateOrder`;
}

const URLS = new UrlConstants();
export default URLS;
