const Database = require("../database");
const { createId } = require("../helpers/methods");
const itemModel = require("../models/ItemModel");
const orderModel = require("../models/OrderModel");

class OrdersRepository {
  static async fetchOrdersCustomer(customerId) {
    let res = await orderModel.aggregate([
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurant_id",
          foreignField: "restaurant_id",
          as: "restaurants",
        },
      },
      { $unwind: "$restaurants" },
      { $match: { customer_id: customerId } },
      { $sort: { created: -1 } },
    ]);
    res = res.map((order) => ({ ...order, ...order.restaurants }));
    return res;
    // const sql =
    //   "SELECT * FROM orders INNER JOIN restaurants ON orders.restaurant_id = restaurants.restaurant_id WHERE customer_id = ? ORDER BY created DESC";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [customerId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchOrdersRestaurant(restaurantId) {
    const res = await orderModel.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customers",
        },
      },
      { $match: { restaurant_id: restaurantId } },
      { $sort: { created: -1 } },
    ]);
    return res;
    // const sql =
    //   "SELECT * FROM orders INNER JOIN customers ON orders.customer_id = customers.customer_id WHERE restaurant_id = ? ORDER BY created DESC";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [restaurantId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchOrderItems(restaurantId, itemIds) {
    const res = await itemModel.find({
      restaurant_id: restaurantId,
      item_id: { $in: itemIds },
    });
    return res;
    // const sql =
    //   "SELECT * FROM items WHERE restaurant_id = ? and item_id IN (?)";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [restaurantId, itemIds], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchAllItems(itemIds) {
    const res = await itemModel.find({ item_id: { $in: itemIds } });
    return res;
    // const sql = "SELECT * FROM items WHERE item_id IN (?)";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [itemIds], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async insertOrder(
    restaurantId,
    customerId,
    deliveryMode,
    items,
    userDate
  ) {
    orderModel.create(
      {
        order_id: createId(),
        restaurant_id: restaurantId,
        customer_id: customerId,
        order_mode: deliveryMode,
        order_status: "Received",
        created: userDate,
        items: items,
      },
      (err, order) => {
        if (err) {
          throw err;
        }
      }
    );
    // const sql =
    //   "INSERT INTO orders (order_id, restaurant_id, customer_id, order_mode, order_status, created, items) VALUES ?";
    // const values = [
    //   [
    //     createId(),
    //     restaurantId,
    //     customerId,
    //     deliveryMode,
    //     "Received",
    //     userDate,
    //     JSON.stringify(items),
    //   ],
    // ];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [values], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async updateOrder(orderId, orderStatus) {
    const res = await orderModel.updateMany(
      { order_id: orderId },
      { $set: { order_status: orderStatus } }
    );
    return res;
    // const sql = "UPDATE orders SET order_status = ? WHERE order_id = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [orderStatus, orderId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }
}

module.exports = OrdersRepository;
