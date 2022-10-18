import {
  Button,
  Col,
  List,
  Modal,
  notification,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../global/components/CustomSelect";
import STRINGS from "../../../global/constants/StringConstants";
import {
  converPriceToDollarFormat,
  generateOptionsJson,
} from "../../../helpers/methods";
import { fetchAllItems } from "../../customer/customerService";
import {
  selectIsAuthenticated,
  selectMemberId,
  selectMemberType,
} from "../../shared/auth/authSlice";
import { fetchRestaurantOrders, updateOrderStatus } from "../restaurantService";

const deliveryOptions = [
  {
    key: STRINGS.received,
    value: STRINGS.received,
  },
  {
    key: STRINGS.preparing,
    value: STRINGS.preparing,
  },
  {
    key: STRINGS.onTheWay,
    value: STRINGS.onTheWay,
  },
  {
    key: STRINGS.delivered,
    value: STRINGS.delivered,
  },
  {
    key: STRINGS.cancelled,
    value: STRINGS.cancelled,
  },
];

const pickupOptions = [
  {
    key: STRINGS.received,
    value: STRINGS.received,
  },
  {
    key: STRINGS.preparing,
    value: STRINGS.preparing,
  },
  {
    key: STRINGS.pickUpReady,
    value: STRINGS.pickUpReady,
  },
  {
    key: STRINGS.pickedUp,
    value: STRINGS.pickedUp,
  },
  {
    key: STRINGS.cancelled,
    value: STRINGS.cancelled,
  },
];

function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const [orderUpdateDetail, setOrderUpdateDetail] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const restaurantId = useSelector(selectMemberId);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const memberType = useSelector(selectMemberType);

  useEffect(() => {
    loadRestaurantOrders();
  }, []);

  const loadRestaurantOrders = async () => {
    const response = await fetchRestaurantOrders(restaurantId);
    await loadItems(response.data.orders);
    setOrders(response.data.orders);
  };

  const loadItems = async (orders) => {
    let itemIds = [];
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!itemIds.includes(item.itemId)) {
          itemIds.push(item.itemId);
        }
      });
    });
    const response = await fetchAllItems(itemIds);
    setItems(response.data.items);
    return;
  };

  const getMenuItems = (order) => {
    let dataSource =
      order.order_mode === STRINGS.pickup ? pickupOptions : deliveryOptions;
    if (
      [STRINGS.cancelled, STRINGS.pickedUp, STRINGS.delivered].includes(
        order.order_status
      )
    ) {
      return [];
    }
    return generateOptionsJson(dataSource, "value", "value", "key");
  };

  const updateOrderDetails = (value, order) => {
    let orderUpdateClone = [...orderUpdateDetail];
    const foundOrder = orderUpdateDetail.findIndex(
      (orderUpdate) => orderUpdate.orderId === order.order_id
    );
    if (foundOrder !== -1) {
      orderUpdateClone.splice(foundOrder, 1);
    }
    orderUpdateClone.push({ orderId: order.order_id, orderStatus: value });
    setOrderUpdateDetail(orderUpdateClone);
  };

  const updateOrder = async (order) => {
    const updateDetail = orderUpdateDetail.find(
      (orderDetail) => orderDetail.orderId === order.order_id
    );
    if (!updateDetail) {
      notification.warning({
        message: "Warning",
        description: "Please select a status first",
      });
      return;
    }
    const response = await updateOrderStatus(
      updateDetail.orderId,
      updateDetail.orderStatus
    );
    loadRestaurantOrders();
    notification.success({
      message: "Success",
      description: "Order updated successfully",
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "customers",
      key: "customers",
      render: (data) => data[0].name,
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm a"),
    },
    {
      title: "Order Mode",
      dataIndex: "order_mode",
      key: "order_mode",
      render: (text, record) => (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            {text + " ("}
            <Typography.Text
              strong
              underline
              onClick={() => {
                setSelectedOrder(record);
                setModalVisible(true);
              }}
            >
              View Order
            </Typography.Text>
            {")"}
          </Col>
        </Row>
      ),
    },
    {
      title: "Order Status",
      key: "order_status",
      dataIndex: "order_status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" className="full-width">
          <Row>
            <Col xs={24} sm={24} md={16} lg={16}>
              <CustomSelect
                selectOptions={getMenuItems(record)}
                onChange={(value) => updateOrderDetails(value, record)}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <Button type="primary" onClick={() => updateOrder(record)}>
                Update
              </Button>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  const getItemName = (orderItem) => {
    const foundItem = items.find((item) => item.item_id === orderItem.itemId);
    return foundItem.item_name;
  };

  const getItemPrice = (orderItem) => {
    return orderItem.itemPrice * orderItem.qty;
  };

  const getItemsPrice = (order) => {
    let price = 0;
    order.items.forEach((orderItem) => {
      price += getItemPrice(orderItem);
    });
    return converPriceToDollarFormat(price);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const getReceiptContent = () => {
    return (
      selectedOrder !== null && (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <List
              itemLayout="horizontal"
              dataSource={selectedOrder.items}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.qty}
                    title={getItemName(item)}
                    description={
                      item.specialInstruction !== "" && (
                        <div>{item.specialInstruction}</div>
                      )
                    }
                  />
                  <div>{converPriceToDollarFormat(getItemPrice(item))}</div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      )
    );
  };

  const getModal = () => {
    return (
      <Modal
        visible={modalVisible}
        footer={[
          selectedOrder !== null && (
            <Row>
              <Col>
                <Typography.Text strong>Total Price: </Typography.Text>
                <Typography.Text type="secondary" strong>
                  {getItemsPrice(selectedOrder)}
                </Typography.Text>
              </Col>
            </Row>
          ),
        ]}
        title="Order Details"
        onCancel={handleModalClose}
      >
        {getReceiptContent()}
      </Modal>
    );
  };

  const getOrderTable = () => {
    return <Table columns={columns} dataSource={orders} />;
  };

  return (
    <>
      {getOrderTable()}
      {getModal()}
    </>
  );
}

export default RestaurantOrders;
