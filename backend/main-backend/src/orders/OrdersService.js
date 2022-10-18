const { STRINGS } = require("../constants/StringConstants");
const {
  createErrorResult,
  createSuccessResult,
} = require("../helpers/methods");
const OrdersRepository = require("./OrdersRepository");

class OrdersService {
  static async getOrderItems(restaurantId, itemIds) {
    try {
      const response = await OrdersRepository.fetchOrderItems(
        restaurantId,
        itemIds
      );
      return createSuccessResult({ items: response });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async getAllItems(itemIds) {
    try {
      const response = await OrdersRepository.fetchAllItems(itemIds);
      return createSuccessResult({ items: response });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async getCustomerOrders(customerId) {
    try {
      const response = await OrdersRepository.fetchOrdersCustomer(customerId);
      return createSuccessResult({ orders: response });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async getRestaurantOrders(restaurantId) {
    try {
      const response = await OrdersRepository.fetchOrdersRestaurant(
        restaurantId
      );
      return createSuccessResult({ orders: response });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async insertOrder(restaurantId, customerId, deliveryMode, items, userDate) {
    try {
      const response = await OrdersRepository.insertOrder(
        restaurantId,
        customerId,
        deliveryMode,
        items,
        userDate
      );
      return createSuccessResult({ message: "Order added succesfully" });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async updateOrder(orderId, orderStatus) {
    try {
      const response = await OrdersRepository.updateOrder(orderId, orderStatus);
      return createSuccessResult({ message: "Order updated succesfully", response });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }
}

module.exports = OrdersService;
