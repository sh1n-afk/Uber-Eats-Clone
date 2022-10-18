import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Tabs,
  Typography,
  List,
  Pagination,
} from "antd";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../global/components/CustomSelect";
import STRINGS from "../../../global/constants/StringConstants";
import {
  converPriceToDollarFormat,
  generateOptionsJson,
} from "../../../helpers/methods";
import { updateOrderStatus } from "../../restaurant/restaurantService";
import {
  selectIsAuthenticated,
  selectMemberId,
  selectMemberType,
} from "../../shared/auth/authSlice";
import {
  fetchAllItems,
  fetchCartItems,
  fetchCustomerOrders,
} from "../customerService";

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

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);
  const [selectedKey, setSelectedKey] = useState(STRINGS.pickup);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const customerId = useSelector(selectMemberId);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const memberType = useSelector(selectMemberType);

  useEffect(() => {
    loadCustomerOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      handlePageChange(currentPage, currentPageSize);
    }
  }, [orders, selectedFilter]);

  useEffect(() => {
    handlePageChange(currentPage, currentPageSize);
  }, [selectedKey])
  

  const loadCustomerOrders = async () => {
    if (isAuthenticated && memberType === STRINGS.customer) {
      const response = await fetchCustomerOrders(customerId);
      await loadItems(response.data.orders);
      setOrders(response.data.orders);
    }
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

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
  };

  const handlePageChange = (page, pageSize) => {
    let filteredOrders = [];

    if (selectedFilter.trim() === "") {
      filteredOrders = orders.filter(
        (order) => order.order_mode === selectedKey
      );
    } else {
      filteredOrders = orders.filter(
        (order) =>
          order.order_mode === selectedKey &&
          order.order_status === selectedFilter
      );
    }

    filteredOrders = filteredOrders.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    setCurrentPageOrders(filteredOrders);
  };

  const cancelOrder = async (order) => {
    await updateOrderStatus(order.order_id, STRINGS.cancelled);
    loadCustomerOrders();
    setModalVisible(false);
  };

  const getItemsCount = (order) => {
    let count = 0;
    order.items.forEach((item) => {
      count = count + item.qty;
    });
    return count;
  };

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

  const getOrders = () => {
    return currentPageOrders.map((order) => (
      <React.Fragment key={order.order_id}>
        <Row>
          <Col>
            <Typography.Title level={3}>{order.name}</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography.Text type="secondary">
              {getItemsCount(order)} items for {getItemsPrice(order)} -{" "}
              {moment(order.created).format("MMMM Do YYYY, h:mm a")} -{" "}
              {order.order_status} -{" "}
            </Typography.Text>
            <Typography.Text
              strong
              underline
              onClick={() => {
                setSelectedOrder(order);
                setModalVisible(true);
              }}
            >
              View Receipt
            </Typography.Text>
          </Col>
        </Row>
        <Divider />
      </React.Fragment>
    ));
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

  const getCustomerOrders = () => {
    return (
      <Tabs activeKey={selectedKey} onChange={(key) => setSelectedKey(key)}>
        <Tabs.TabPane tab={STRINGS.pickup} key={STRINGS.pickup}>
          <Row>
            <Col xs={8} sm={8} md={8} lg={8}>
              <CustomSelect
                selectOptions={generateOptionsJson(
                  pickupOptions,
                  "value",
                  "value",
                  "key"
                )}
                onChange={handleFilterSelect}
              />
            </Col>
            <Col>
              <Button type="primary" onClick={() => setSelectedFilter("")}>
                Reset
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Space direction="vertical" className="full-width">
                {getOrders()}
              </Space>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab={STRINGS.delivery} key={STRINGS.delivery}>
          <Row>
            <Col xs={8} sm={8} md={8} lg={8}>
              <CustomSelect
                selectOptions={generateOptionsJson(
                  deliveryOptions,
                  "value",
                  "value",
                  "key"
                )}
                onChange={handleFilterSelect}
              />
            </Col>
            <Col>
              <Button type="primary" onClick={() => setSelectedFilter("")}>
                Reset
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              {getOrders()}
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    );
  };

  const getPaginationRow = () => {
    return (
      <Pagination
        showSizeChanger
        total={orders.length}
        pageSize={currentPageSize}
        pageSizeOptions={[2, 5, 10]}
        current={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: "5px" }}
      />
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
              {selectedOrder.order_status === STRINGS.received && (
                <Col flex={1} push>
                  <Button
                    type="primary"
                    onClick={() => cancelOrder(selectedOrder)}
                  >
                    Cancel Order
                  </Button>
                </Col>
              )}
            </Row>
          ),
        ]}
        title="Receipt"
        onCancel={handleModalClose}
      >
        {getReceiptContent()}
      </Modal>
    );
  };

  return (
    <>
      {getCustomerOrders()}
      {getPaginationRow()}
      {getModal()}
    </>
  );
}

export default CustomerOrders;
