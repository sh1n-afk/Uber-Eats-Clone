import { Button, Col, Input, Row, Switch, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeliveryModeSwitch from "../../../global/components/DeliveryModeSwitch";
import STRINGS from "../../../global/constants/StringConstants";
import RestaurantList from "../../restaurant/RestaurantList";
import {
  selectIsAuthenticated,
  selectMemberId,
  selectMemberType,
} from "../../shared/auth/authSlice";
import {
  addToFavourites,
  fetchCustomerInfo,
  getRestaurants,
  searchRestaurants,
} from "../customerService";
import { selectDeliverySelected } from "../customerSlice";
import OrderCart from "../OrderCart";

function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [customer, setCustomer] = useState(null);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const memberType = useSelector(selectMemberType);
  const customerId = useSelector(selectMemberId);

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (isAuthenticated && memberType === STRINGS.customer && customerId) {
      loadCustomer();
    }
  }, [customerId]);

  const loadRestaurants = async () => {
    const response = await getRestaurants();
    setRestaurants(response.data.restaurants);
  };

  const loadCustomer = async () => {
    const response = await fetchCustomerInfo(customerId);
    setCustomer(response.data.customer);
  };

  const handleSearch = async (searchStr) => {
    const response = await searchRestaurants(searchStr);
    console.log(response.data.restaurants)
    setRestaurants(response.data.restaurants);
  };

  const handleFavouriteClick = async (restaurantId) => {
    if (customer) {
      const favourites = customer.favourites;
      console.log(typeof favourites);
      if (!favourites.includes(restaurantId)) {
        favourites.push(restaurantId);
      }
      await addToFavourites(customerId, favourites);
      loadCustomer();
    }
  };

  const handleFavouriteRemove = async (restaurantId) => {
    if (customer) {
      const favourites = customer.favourites;
      const foundIndex = favourites.findIndex((fav) => fav === restaurantId);
      if (foundIndex !== -1) {
        favourites.splice(foundIndex, 1);
      }
      await addToFavourites(customerId, favourites);
      loadCustomer();
    }
  };

  const getFavorites = () => {
    if (customer && customer.favourites.length > 0) {
      const favRestaurants = restaurants.filter((restaurant) =>
        customer.favourites.includes(restaurant.restaurant_id)
      );

      return (
        <>
          <Row>
            <Typography.Title level={2}>Favourites</Typography.Title>
          </Row>
          <RestaurantList
            restaurants={favRestaurants}
            customer={customer}
            handleFavouriteClick={handleFavouriteClick}
            handleFavouriteRemove={handleFavouriteRemove}
          />
        </>
      );
    }
  };

  const getRestaurantsList = () => {
    return (
      <>
        <Row>
          <Typography.Title level={2}>Restaurants</Typography.Title>
        </Row>
        <RestaurantList
          restaurants={restaurants}
          customer={customer}
          handleFavouriteClick={handleFavouriteClick}
          handleFavouriteRemove={handleFavouriteRemove}
        />
      </>
    );
  };

  const getBody = () => {
    return (
      <>
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Input.Search
              placeholder="Espresso, Desserts etc"
              onSearch={(value) => handleSearch(value)}
              enterButton
              allowClear
            />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} />
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flex: 1 }}>
                <DeliveryModeSwitch />
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}
              >
                <OrderCart />
              </div>
            </div>
          </Col>
        </Row>
        {isAuthenticated && memberType === STRINGS.customer && getFavorites()}
        {getRestaurantsList()}
      </>
    );
  };

  return <>{getBody()}</>;
}

export default Dashboard;
