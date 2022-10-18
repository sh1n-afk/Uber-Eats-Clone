import { Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import { generateOptionsJson } from "../../../helpers/methods";
import STRINGS from "../../constants/StringConstants";
import CustomSelect from "../CustomSelect";
import { getCities, getCountries, getStates } from "./customAddressService";

function CustomAddress(props) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    const response = await getCountries();
    const countriesJson = generateOptionsJson(response, "name", "name", "country_id");
    setCountries(countriesJson);
  };

  const handleCountryChange = async (country, countryJson) => {
    const response = await getStates(countryJson.data["country_id"]);
    const statesJson = generateOptionsJson(response, "name", "name", "state_id");
    setSelectedCountry(countryJson.data["country_id"]);
    setStates(statesJson);
  };

  const handleStateChange = async (state, stateJson) => {
    const response = await getCities(stateJson.data["state_id"], selectedCountry);
    const citiesJson = generateOptionsJson(response, "name", "name", "city_id");
    setCities(citiesJson);
  };

  const getAddressComponents = () => {
    return (
      <>
        <Form.Item
          name={["address", "addressType"]}
          label="Name"
          rules={[
            {
              required: props.required,
              message: "Please input the name of your address",
            },
          ]}
        >
          <Input placeholder="Home" />
        </Form.Item>
        <Form.Item
          name={["address", "addressLine1"]}
          label="Address Line 1"
          rules={[
            { required: props.required, message: "Please input your address" },
          ]}
        >
          <Input placeholder="Address Line 1" />
        </Form.Item>
        <Form.Item name={["address", "addressLine2"]} label="Address Line 2">
          <Input placeholder="Address Line 2" />
        </Form.Item>
      </>
    );
  };

  const getLocationDropdowns = () => {
    return (
      <>
        <Form.Item noStyle>
          <Form.Item
            name={["address", "country"]}
            label="Country"
            rules={[
              {
                required: props.required,
                message: "Please select your country",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              padding: "0 5px",
            }}
          >
            <CustomSelect
              placeholder="Select a Country"
              selectOptions={countries}
              onChange={handleCountryChange}
            />
          </Form.Item>
          <Form.Item
            name={["address", "state"]}
            label="State"
            rules={[
              { required: props.required, message: "Please select your state" },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              padding: "0 5px",
            }}
          >
            <CustomSelect
              placeholder="Select a State"
              selectOptions={states}
              onChange={handleStateChange}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item noStyle>
          <Form.Item
            name={["address", "city"]}
            label="City"
            rules={[
              { required: props.required, message: "Please select your city" },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              padding: "0 5px",
            }}
          >
            <CustomSelect placeholder="Select a City" selectOptions={cities} />
          </Form.Item>
          <Form.Item
            name={["address", "zipCode"]}
            label="Zip Code"
            rules={[
              {
                required: props.required,
                message: "Please enter your zip code",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              padding: "0 5px",
            }}
          >
            <Input placeholder="Zip Code" />
          </Form.Item>
        </Form.Item>
      </>
    );
  };

  return (
    <>
      {getAddressComponents()}
      {getLocationDropdowns()}
    </>
  );
}

export default CustomAddress;
