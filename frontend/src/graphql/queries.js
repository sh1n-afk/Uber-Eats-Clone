import { gql } from "@apollo/client";

export const LOAD_RESTAURANT = gql`
  query getRestaurant($id: String!) {
    getRestaurant(id: $id) {
      restaurant_image
      name
      location {
        addressType
        addressLine1
        addressLine2
        city
        state
        country
        zipCode
      }
      description
      phone_number
      email
    }
  }
`;

export const LOAD_COUNTRIES = gql`
  query {
    getCountries {
      country_id
      name
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders($id: String!) {
    getOrders(id: $id) {
      order_id
      restaurant_id
      customer_id
      order_mode
      order_status
      items
    }
  }
`;
