const { createId } = require("../helpers/methods");
const Database = require("../database");
const customerModel = require("../models/CustomerModel");
const restaurantModel = require("../models/RestaurantModel");
const worldModel = require("../models/WorldModel");

class AuthRepository {
  static async findCustomer(email, password) {
    const results = await customerModel.find({
      email: email,
      password: password,
    });
    return results;
    const sql = "SELECT * FROM customers WHERE email = ? and password = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [email, password], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async findCustomerByEmail(email) {
    const results = await customerModel.find({ email: email });
    return results;
    // const sql = "SELECT * FROM customers WHERE email = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [email], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async findRestaurant(email, password) {
    const results = restaurantModel.find({ email: email, password: password });
    return results;
    // const sql = "SELECT * FROM restaurants WHERE email = ? and password = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [email, password], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async findRestaurantByEmail(email) {
    const results = await restaurantModel.find({ email: email });
    return results;
    // const sql = "SELECT * FROM restaurants WHERE email = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [email], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async insertCustomer(email, password, name) {
    customerModel.create(
      { customer_id: createId(), email: email, password: password, name: name },
      (err, customer) => {
        if (err) {
          throw err;
        }
      }
    );
    // const sql =
    //   "INSERT INTO customers (customer_id, email, password, name) VALUES ?";
    // const values = [[createId(), email, password, name]];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [values], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async insertRestaurant(email, password, name, location) {
    restaurantModel.create(
      {
        restaurant_id: createId(),
        email: email,
        password: password,
        name: name,
        location: location,
      },
      (err, restaurant) => {
        if (err) {
          throw err;
        }
      }
    );
    // const sql =
    //   "INSERT INTO restaurants (restaurant_id, email, password, name, location) VALUES ?";
    // const values = [
    //   [createId(), email, password, name, JSON.stringify(location)],
    // ];

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [values], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchCountries() {
    const results = await worldModel
      .find({}, { country_id: 1, name: 1 })
      .sort({ name: 1 });
    return results;
    // const sql = "SELECT * FROM countries ORDER BY name";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchStates(countryId) {
    let results = await worldModel.findOne({ country_id: countryId });
    results = results["states"].map((state) => ({
      state_id: state.state_id,
      name: state.name,
    }));
    return results;
    // const sql = "SELECT * FROM states where country_id = ? ORDER BY name";
    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [countryId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async fetchCities(stateId, countryId) {
    let results = await worldModel.aggregate([
      { $match: { country_id: countryId } },
      {
        $project: {
          states: {
            $filter: {
              input: "$states",
              as: "states",
              cond: { $eq: ["$$states.state_id", stateId] },
            },
          },
        },
      },
    ]);
    results = results[0]["states"][0].cities;
    return results;
    //   const sql =
    //     "SELECT * FROM cities where state_id = ? and country_id = ? ORDER BY name";
    //   return new Promise((resolve, reject) => {
    //     Database.pool.query(sql, [stateId, countryId], (err, result) => {
    //       if (err) reject(err);
    //       resolve(result);
    //     });
    //   });
    // }
  }
}

module.exports = AuthRepository;
