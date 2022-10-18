const { STRINGS } = require("../constants/StringConstants");
const {
  createErrorResult,
  createSuccessResult,
} = require("../helpers/methods");
const RestaurantRepository = require("./RestaurantRepository");
const moment = require("moment-timezone");

class RestaurantService {
  static async getRestaurants() {
    try {
      const restaurants = await RestaurantRepository.fetchRestaurants();
      return createSuccessResult({ restaurants });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async searchRestaurants(searchStr) {
    try {
      const restaurants = await RestaurantRepository.searchRestaurants(
        searchStr
      );

      return createSuccessResult({ restaurants });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async getRestaurantInfo(restaurantId) {
    try {
      let restaurant = await RestaurantRepository.fetchRestaurantInfo(
        restaurantId
      );
      if (restaurant.length === 0) {
        return createErrorResult("No restaurant with this id found");
      }
      restaurant = restaurant[0];
      const formattedRestaurant = {
        restaurant: {
          email: restaurant.email,
          name: restaurant.name,
          description: restaurant.description,
          phone_number: restaurant.phone_number,
          restaurant_image: restaurant.restaurant_image,
          timings: [
            moment(restaurant.open_time),
            moment(restaurant.close_time),
          ],
          location: restaurant.location,
        },
        address: restaurant.location,
      };
      return createSuccessResult(formattedRestaurant);
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async getRestaurantCategories(restaurantId) {
    try {
      const categories = await RestaurantRepository.fetchRestaurantCategories(
        restaurantId
      );
      return createSuccessResult({ categories: categories });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async addCategory(restaurantId, categoryName) {
    try {
      const result = await RestaurantRepository.insertCategory(
        restaurantId,
        categoryName
      );

      return this.getRestaurantCategories(restaurantId);
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async getRestaurantItems(restaurantId) {
    try {
      const items = await RestaurantRepository.fetchRestaurantItems(
        restaurantId
      );
      return createSuccessResult({ items: items });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async addItem(restaurantId, item) {
    try {
      await RestaurantRepository.insertItem(restaurantId, item);
      const result = this.getRestaurantItems(restaurantId);
      return result;
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async updateItem(restaurantId, item) {
    try {
      const result = await RestaurantRepository.updateItem(restaurantId, item);
      return this.getRestaurantItems(restaurantId);
    } catch (error) {
      console.log(error);
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async addRestaurantImage(restaurantId, image) {
    try {
      const result = await RestaurantRepository.insertRestaurantImage(
        restaurantId,
        image
      );
      return createSuccessResult({ message: "Image added Successfully" });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async addItemImage(restaurantId, itemId, image) {
    try {
      const result = await RestaurantRepository.insertItemImage(
        restaurantId,
        itemId,
        image
      );
      return createSuccessResult({ message: "Image added Successfully" });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async updateRestaurant(restaurantId, restaurant) {
    try {
      const result = await RestaurantRepository.updateRestaurant(
        restaurantId,
        restaurant
      );
      return createSuccessResult({ message: "Updated details successfully" });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }
}

module.exports = RestaurantService;
