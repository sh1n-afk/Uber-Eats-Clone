const Database = require("../database");
const { createId } = require("../helpers/methods");
const categoryModel = require("../models/CategoryModel");
const itemModel = require("../models/ItemModel");
const restaurantModel = require("../models/RestaurantModel");

class RestaurantRepository {
  static async fetchRestaurants() {
    const results = await restaurantModel.find({});
    return results;
  }

  static async searchRestaurants(searchStr) {
    const results = await restaurantModel.aggregate([
      {
        $lookup: {
          from: "items",
          localField: "restaurant_id",
          foreignField: "restaurant_id",
          as: "items",
        },
      },
      {
        $match: {
          $or: [
            { "items.item_name": { $regex: searchStr, $options: "i" } },
            { "items.item_category": { $regex: searchStr, $options: "i" } },
            { "location.city": { $regex: searchStr, $options: "i" } },
          ],
        },
      },
      { $group: { _id: "$restaurant_id", doc: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$doc" } },
    ]);
    // const sql =
    //   "SELECT * FROM restaurants r INNER JOIN items i ON r.restaurant_id = i.restaurant_id WHERE i.item_name LIKE ? OR i.item_category LIKE ? OR r.location LIKE ? GROUP BY i.restaurant_id";
    return results;

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(
    //     sql,
    //     ["%" + searchStr + "%", "%" + searchStr + "%", "%" + searchStr + "%"],
    //     (err, result) => {
    //       if (err) reject(err);
    //       resolve(result);
    //     }
    //   );
    // });
  }

  static async fetchRestaurantInfo(restaurantId) {
    const sql = "SELECT * FROM restaurants WHERE restaurant_id = ?";
    const results = await restaurantModel.find({ restaurant_id: restaurantId });
    return results;

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [restaurantId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchRestaurantCategories(restaurantId) {
    const results = await categoryModel
      .find({ restaurant_id: restaurantId })
      .sort({ category_name: 1 });

    return results;
    // const sql =
    //   "SELECT * FROM categories WHERE restaurant_id = ? ORDER BY category_name";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [restaurantId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async insertCategory(restaurantId, categoryName) {
    categoryModel.create(
      {
        category_id: createId(),
        category_name: categoryName,
        restaurant_id: restaurantId,
      },
      (err, category) => {
        if (err) {
          throw err;
        }
        // saved!
      }
    );
    // const sql =
    //   "INSERT INTO categories (category_id,restaurant_id, category_name) VALUES ?";
    // const values = [[createId(), restaurantId, categoryName]];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [values], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchRestaurantItems(restaurantId) {
    const results = await itemModel.find({ restaurant_id: restaurantId });
    return results;
    // const sql = "SELECT * FROM items WHERE restaurant_id = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [restaurantId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async insertItem(restaurantId, item) {
    itemModel.create(
      {
        item_id: createId(),
        item_image: item.itemImage,
        item_name: item.itemName,
        item_description: item.itemDescription,
        item_ingridients: item.itemIngridients,
        item_category: item.itemCategory,
        item_type: item.itemType,
        item_price: item.itemPrice,
        category_id: item.categoryId,
        restaurant_id: restaurantId,
      },
      (err, item) => {
        if (err) {
          throw err;
        }
        // saved!
      }
    );
    // const sql =
    //   "INSERT INTO items (item_id, item_name, item_description, item_ingridients, item_category, item_type, item_price, category_id, restaurant_id) VALUES ?";
    // const values = [
    //   [
    //     createId(),
    //     item.itemName,
    //     item.itemDescription,
    //     item.itemIngridients,
    //     item.itemCategory,
    //     item.itemType,
    //     item.itemPrice,
    //     item.categoryId,
    //     restaurantId,
    //   ],
    // ];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [values], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async updateItem(restaurantId, item) {
    const res = await itemModel.updateMany(
      { restaurant_id: restaurantId, item_id: item.itemId },
      {
        $set: {
          item_image: item.itemImage,
          item_name: item.itemName,
          item_description: item.itemDescription,
          item_ingridients: item.itemIngridients,
          item_category: item.itemCategory,
          item_type: item.itemType,
          item_price: item.itemPrice,
          category_id: item.categoryId,
        },
      }
    );
    return res;
    // const sql =
    //   "UPDATE items SET item_name = ?, item_description = ?, item_ingridients = ?, item_category = ?, item_type = ?, item_price = ?, category_id = ? WHERE restaurant_id = ? and item_id = ?";
    // const values = [
    //   item.itemName,
    //   item.itemDescription,
    //   item.itemIngridients,
    //   item.itemCategory,
    //   item.itemType,
    //   item.itemPrice,
    //   item.categoryId,
    //   restaurantId,
    //   item.itemId,
    // ];
    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, values, (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async insertRestaurantImage(restaurantId, restaurantImage) {
    const res = await restaurantModel.updateMany(
      { restaurant_id: restaurantId },
      { $set: { restaurant_image: restaurantImage } }
    );
    return res;
    // const sql =
    //   "UPDATE restaurants SET restaurant_image = ? WHERE restaurant_id = ?";
    // const values = [restaurantImage, restaurantId];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, values, (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async insertItemImage(restaurantId, itemId, itemImage) {
    const res = await itemModel.updateMany(
      { item_id: itemId, restaurant_id: restaurantId },
      { $set: { item_image: itemImage } }
    );
    return res;
    // const sql =
    //   "UPDATE items SET item_image = ? WHERE restaurant_id = ? and item_id = ?";
    // const values = [itemImage, restaurantId, itemId];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, values, (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async updateRestaurant(restaurantId, restaurant) {
    const res = await restaurantModel.updateMany(
      { restaurant_id: restaurantId },
      {
        $set: {
          restaurant_image: restaurant.restaurantImage,
          name: restaurant.name,
          email: restaurant.email,
          description: restaurant.description,
          phone_number: restaurant.phoneNumber,
          // open_time: restaurant.timings.openTime,
          // close_time: restaurant.timings.closeTime,
          location: restaurant.location,
          restaurant_image: restaurant.restaurantImage,
        },
      }
    );
    return res;
    // const sql =
    //   "UPDATE restaurants SET name = ?, email = ?, description = ?, phone_number = ?, open_time = ?, close+time = ?, location = ? WHERE restaurant_id = ?";
    // const values = [
    //   restaurant.name,
    //   restaurant.email,
    //   restaurant.description,
    //   restaurant.phoneNumber,
    //   restaurant.timings.openTime,
    //   restaurant.timings.closeTime,
    //   JSON.stringify(restaurant.location),
    //   restaurantId,
    // ];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, values, (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }
}

module.exports = RestaurantRepository;
