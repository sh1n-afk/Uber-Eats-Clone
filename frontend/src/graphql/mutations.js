import { gql } from "@apollo/client";

export const REGISTER_CUSTOMER = gql`
  mutation createCustomer(
      $email: String! 
      $password: String! 
      $name: String!
    ) {
        createCustomer(
            email: $email 
            password: $password 
            name: $name
            ) {
                name
            }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder(
      $order_id: String! 
      $order_status: String!
    ) {
        updateOrder(
            order_id: $order_id 
            order_status: $order_status 
            ) {
              order_status
            }
  }
`;
