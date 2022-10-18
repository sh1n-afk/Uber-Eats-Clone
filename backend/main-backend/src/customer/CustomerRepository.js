const Database = require("../database");
const customerModel = require("../models/CustomerModel");

class CustomerRepository {
  static async fetchCustomerInfo(customerId) {
    const results = await customerModel.find({ customer_id: customerId });
    return results;
    // const sql = "SELECT * FROM customers WHERE customer_id = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(sql, [customerId], (err, result) => {
    //     if (err) reject(err);
    //     resolve(result);
    //   });
    // });
  }

  static async updateFavorites(customerId, favorites) {
    const res = await customerModel.updateMany(
      { customer_id: customerId },
      { $set: { favourites: favorites } }
    );
    return res;
    // const sql = "UPDATE customers SET favourites = ? WHERE customer_id = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(
    //     sql,
    //     [JSON.stringify(favorites), customerId],
    //     (err, result) => {
    //       if (err) reject(err);
    //       resolve(result);
    //     }
    //   );
    // });
  }

  static async updateCustomer(customerId, customer) {
    const pushObj =
      Object.entries(customer.address).length > 0
        ? { $push: { addresses: customer.address } }
        : {};
    const res = await customerModel.updateMany(
      { customer_id: customerId },
      {
        $set: {
          email: customer.email,
          customer_image: customer.customerImage,
          phone_number: customer.phoneNumber,
          name: customer.name,
          nickname: customer.nickName,
          date_of_birth: customer.dateOfBirth,
        },
        ...pushObj,
      }
    );
    // const sql =
    //   "UPDATE customers SET email = ?, phone_number = ?, name = ?, date_of_birth = ? WHERE customer_id = ?";

    // return new Promise((resolve, reject) => {
    //   Database.pool.query(
    //     sql,
    //     [
    //       customer.email,
    //       customer.phoneNumber,
    //       customer.name,
    //       customer.dateOfBirth,
    //       customerId,
    //     ],
    //     (err, result) => {
    //       if (err) reject(err);
    //       resolve(result);
    //     }
    //   );
    // });
  }
}

module.exports = CustomerRepository;
