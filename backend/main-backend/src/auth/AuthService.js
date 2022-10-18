const { STRINGS } = require("../constants/StringConstants");
const {
  encryptPassword,
  comparePasswords,
  createErrorResult,
  createSuccessResult,
} = require("../helpers/methods");
const AuthRepository = require("./AuthRepository");

class AuthService {
  static async loginCustomer(email, password, memberType) {
    const result = await AuthRepository.findCustomerByEmail(email);

    if (result.length === 0) {
      return createErrorResult(`The user with email ${email} doesnot exist`, {
        isAuthenticated: false,
      });
    }
    const validatePassword = await comparePasswords(
      password,
      result[0]["password"]
    );

    if (validatePassword) {
      return createSuccessResult({
        member_id: result[0]["customer_id"],
        member_name: result[0]["name"],
        member_type: STRINGS.customer,
        isAuthenticated: true,
      });
    } else {
      return createErrorResult("Entered password is incorrect", {
        isAuthenticated: false,
      });
    }
  }

  static async loginRestaurant(email, password, memberType) {
    const result = await AuthRepository.findRestaurantByEmail(email);

    if (result.length === 0) {
      return createErrorResult(`The user with email ${email} doesnot exist`, {
        isAuthenticated: false,
      });
    }

    const validatePassword = await comparePasswords(
      password,
      result[0]["password"]
    );

    if (validatePassword) {
      return createSuccessResult({
        member_id: result[0]["restaurant_id"],
        member_name: result[0]["name"],
        member_type: STRINGS.restaurant,
        isAuthenticated: true,
      });
    } else {
      return createErrorResult("Entered password is incorrect", {
        isAuthenticated: false,
      });
    }
  }

  static async registerCustomer(email, password, name) {
    const customers = await AuthRepository.findCustomerByEmail(email);

    if (customers.length > 0) {
      return createErrorResult(`The user with email ${email} already exists`);
    }

    const encryptedPassword = await encryptPassword(password);
    AuthRepository.insertCustomer(email, encryptedPassword, name);
  }

  static async registerRestaurant(email, password, name, location) {
    const restaurants = await AuthRepository.findRestaurantByEmail(email);

    if (restaurants.length > 0) {
      return createErrorResult(`The user with email ${email} already exists`);
    }

    const encryptedPassword = await encryptPassword(password);
    AuthRepository.insertRestaurant(email, encryptedPassword, name, location);
  }

  static async getCountries() {
    const countries = await AuthRepository.fetchCountries();
    return createSuccessResult({ countries });
  }

  static async getStates(countryId) {
    const states = await AuthRepository.fetchStates(countryId);
    return createSuccessResult({ states });
  }

  static async getCities(stateId, countryId) {
    const cities = await AuthRepository.fetchCities(stateId, countryId);
    return createSuccessResult({ cities });
  }
}

module.exports = AuthService;
