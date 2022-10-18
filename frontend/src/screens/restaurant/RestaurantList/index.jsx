import { Card, Col, Empty, Row } from "antd";
import React from "react";
import { getImageURL } from "../../../helpers/methods";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import history from "../../../utils/history";
import URLS from "../../../global/constants/UrlConstants";
import { setRestaurantId } from "../../customer/customerSlice";

function RestaurantList(props) {
  const dispatch = useDispatch();

  const getFavIcon = (restaurantId) => {
    if (props.customer) {
      if (props.customer.favourites.includes(restaurantId)) {
        return (
          <StarFilled
            style={{ color: "#fadb14" }}
            onClick={(event) => {
              event.stopPropagation();
              props.handleFavouriteRemove(restaurantId);
            }}
          />
        );
      } else {
        return (
          <StarOutlined
            onClick={(event) => {
              event.stopPropagation();
              props.handleFavouriteClick(restaurantId);
            }}
          />
        );
      }
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    dispatch(setRestaurantId({ restaurantId }));
    history.push(URLS.itemsViewPath);
  };

  const getRestaurantCard = (restaurant) => {
    const address = restaurant.location;

    return (
      <Col key={restaurant.restaurant_id} style={{padding: "5px"}}>
        <Card
          style={{ width: 300, cursor: "pointer" }}
          cover={
            <img
              width="100%"
              height="200px"
              style={{ objectFit: "cover" }}
              alt="example"
              src={getImageURL(restaurant.restaurant_image)}
            />
          }
          actions={[getFavIcon(restaurant.restaurant_id)]}
          onClick={() => handleRestaurantClick(restaurant.restaurant_id)}
        >
          <Card.Meta
            title={restaurant.name}
            description={`${address.addressLine1} ${address.addressLine2} \n ${address.city}, ${address.state}, ${address.country} - ${address.zipCode}`}
          />
        </Card>
      </Col>
    );
  };

  return (
    <>
      {props.restaurants.length > 0 ? (
        <Row>
          {props.restaurants.map((restaurant) => getRestaurantCard(restaurant))}
        </Row>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
}
export default RestaurantList;
