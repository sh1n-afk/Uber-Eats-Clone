const { STRINGS } = require("../constants/StringConstants");
const {
  createErrorResult,
  createSuccessResult,
} = require("../helpers/methods");
const CustomerRepository = require("./CustomerRepository");

class CustomerService {
  static async getCustomerInfo(customerId) {
    try {
      let customer = await CustomerRepository.fetchCustomerInfo(customerId);
      if (customer.length === 0) {
        return createErrorResult("No customer with this id found");
      }
      customer = customer[0];
      const formattedCustomer = {
        customer: {
          email: customer.email,
          name: customer.name,
          nickName: customer.nickname,
          dateOfBirth: customer.date_of_birth,
          phoneNumber: customer.phone_number,
          favourites: customer.favourites,
          customerImage: customer.customer_image,
        },
        address:
          customer.addresses && customer.addresses.length > 0
            ? customer.addresses[0]
            : {},
      };
      return createSuccessResult(formattedCustomer);
    } catch (error) {
      console.log(error);
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async updateFavorites(customerId, favourites) {
    try {
      let customer = await CustomerRepository.fetchCustomerInfo(customerId);
      if (customer.length === 0) {
        return createErrorResult("No customer with this id found");
      }
      await CustomerRepository.updateFavorites(customerId, favourites);
      return createSuccessResult({ customer: formattedCustomer });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }

  static async updateCustomer(customerId, customer) {
    try {
      const result = await CustomerRepository.updateCustomer(
        customerId,
        customer
      );
      return createSuccessResult({ message: "Updated details successfully" });
    } catch (error) {
      return createErrorResult(STRINGS.GENERIC_ERROR);
    }
  }
}

module.exports = CustomerService;
