import { getNoAuthCallParams, makeCall } from "../../../utils/services";
import STRINGS from "../../constants/StringConstants";
import URLS from "../../constants/UrlConstants";

export const getCountries = async () => {
  const body = {};
  const callParams = getNoAuthCallParams(body);
  const response = await makeCall(URLS.fetchCounties, callParams);

  if (response.error) {
    console.log(
      "🚀 ~ file: customAddressService.js ~ line 12 ~ getCountries ~ response",
      response
    );
    return [];
  }

  return response.data.countries;
};

export const getStates = async (countryId) => {
  const body = { countryId };
  const callParams = getNoAuthCallParams(body);
  const response = await makeCall(URLS.fetchStates, callParams);

  if (response.error) {
    console.log(
      "🚀 ~ file: customAddressService.js ~ line 18 ~ getStates ~ response",
      response
    );
    return [];
  }

  return response.data.states;
};

export const getCities = async (stateId, countryId) => {
  const body = { stateId, countryId };
  const callParams = getNoAuthCallParams(body);

  const response = await makeCall(URLS.fetchCities, callParams);

  if (response.error) {
    console.log(
      "🚀 ~ file: customAddressService.js ~ line 23 ~ getCities ~ response",
      response
    );
    return [];
  }

  return response.data.cities;
};
