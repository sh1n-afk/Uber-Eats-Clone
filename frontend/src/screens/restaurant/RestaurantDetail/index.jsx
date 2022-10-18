import { Button, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRestaurantId } from "../../customer/customerSlice";
import CategoryMenu from "../MenuView/CategoryMenu";
import {
  fetchCategories,
  fetchItems,
  fetchRestaurantInfo,
} from "../restaurantService";
import { ArrowLeftOutlined } from "@ant-design/icons";
import history from "../../../utils/history";
import URLS from "../../../global/constants/UrlConstants";
import DeliveryModeSwitch from "../../../global/components/DeliveryModeSwitch";
import OrderCart from "../../customer/OrderCart";

const fullLayout = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
};

function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const restaurantId = useSelector(selectRestaurantId);

  useEffect(() => {
    loadRestaurantAndItems();
  }, []);

  const loadRestaurantAndItems = async () => {
    const [restaurant, categories, items] = await Promise.all([
      fetchRestaurantInfo(restaurantId),
      fetchCategories(restaurantId),
      fetchItems(restaurantId),
    ]);
    setRestaurant(restaurant.data.restaurant);
    setCategories(categories.data.categories);
    setItems(items.data.items);
    setLoading(false);
  };

  const handleCategorySelect = (value, categoryJson) => {
    document.getElementById(categoryJson.data.category_id).scrollIntoView();
  };

  const getRestaurantDetail = () => {
    return (
      <>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
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
        <Row>
          <Col {...fullLayout}>
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              onClick={() => history.push(URLS.homePath)}
              size="large"
            />
          </Col>
        </Row>
        <Row>
          <Col {...fullLayout}>
            <Typography.Title level={2}>{restaurant.name}</Typography.Title>
          </Col>
          <Col {...fullLayout}>
            <Typography.Text type="secondary" strong>{restaurant.location.addressLine1}, {restaurant.location.addressLine2}</Typography.Text>
            <Typography.Text type="secondary" strong>{restaurant.location.city}, {restaurant.location.state}, {restaurant.location.country} - {restaurant.location.zipCode}</Typography.Text>
          </Col>
        </Row>
      </>
    );
  };

  const getMenu = () => {
    return (
      <>
        <Row>
          <Typography.Title level={2}>Menu</Typography.Title>
        </Row>
        <CategoryMenu
          categories={categories}
          items={items}
          handleCategorySelect={handleCategorySelect}
          allowCart={true}
          refreshItems={(items) => {
            console.log(items)
            setItems(items)}}
        />
      </>
    );
  };

  const getBody = () => {
    return (
      !loading && (
        <>
          {getRestaurantDetail()}
          {getMenu()}
        </>
      )
    );
  };

  return <>{getBody()}</>;
}

export default RestaurantDetail;
