import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectMemberId,
  selectMemberType,
} from "../../shared/auth/authSlice";
import {
  selectCartItems,
  selectDeliverySelected,
  selectRestaurantId,
  setCartItems,
} from "../customerSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import STRINGS from "../../../global/constants/StringConstants";
import { Badge, Button, Col, Modal, notification, Row } from "antd";
import { fetchCartItems, insertOrder } from "../customerService";
import ItemList from "../../restaurant/MenuView/ItemList";
import { converPriceToDollarFormat } from "../../../helpers/methods";
import moment from "moment-timezone";

function OrderCart() {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const memberType = useSelector(selectMemberType);
  const customerId = useSelector(selectMemberId);
  const restaurantId = useSelector(selectRestaurantId);
  const deliverySelected = useSelector(selectDeliverySelected);
  const dispatch = useDispatch();

  const handleCartClick = async () => {
    const itemIds = cartItems.map((item) => item.itemId);
    const response = await fetchCartItems(restaurantId, itemIds);
    setItems(response.data.items);
    setModalVisible(true);
  };

  const handlePlaceOrder = async () => {
    const deliveryMode = deliverySelected ? STRINGS.delivery : STRINGS.pickup;
    const response = await insertOrder(
      restaurantId,
      customerId,
      deliveryMode,
      cartItems,
      moment()
    );
    notification.success({
      message: "Success",
      description: response.data.message,
    });
    dispatch(setCartItems({ cartItems: [] }));
    setItems([]);
    setModalVisible(false);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      totalPrice = totalPrice + cartItem.itemPrice * cartItem.qty;
    });
    return converPriceToDollarFormat(totalPrice);
  };

  const getCart = () => {
    return (
      isAuthenticated &&
      memberType === STRINGS.customer &&
      cartItems.length > 0 && (
        <Badge count={cartItems.length}>
          <ShoppingCartOutlined
            style={{ fontSize: "24px" }}
            onClick={handleCartClick}
          />
        </Badge>
      )
    );
  };

  const getCartModal = () => {
    return (
      items.length > 0 &&
      cartItems.length > 0 && (
        <Modal
          visible={modalVisible}
          title="Cart"
          footer={[
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="center-item">
                  <Button type="primary" onClick={handlePlaceOrder}>
                    Place Order {getTotalPrice()}
                  </Button>
                </div>
              </Col>
            </Row>,
          ]}
          onOk={() => null}
          onCancel={() => setModalVisible(false)}
        >
          <ItemList fullWidth showQty allowCart={true} items={items} />
        </Modal>
      )
    );
  };

  return (
    <>
      {getCart()}
      {getCartModal()}
    </>
  );
}

export default OrderCart;
