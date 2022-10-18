import {
  Card,
  Col,
  Row,
  Typography,
  Image,
  Space,
  Empty,
  Modal,
  notification,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  converPriceToDollarFormat,
  getImageURL,
} from "../../../../helpers/methods";
import { selectCartItems, selectRestaurantId, setCartItems } from "../../../customer/customerSlice";
import ItemEditForm from "../../MenuEdit/itemEditForm";
import ItemForm from "../../MenuEdit/ItemForm";
import AddItemModal from "../AddItemModal";
import "../MenuView.css";

function ItemList(props) {
  const [addItemVisible, setAddItemVisible] = useState({
    visible: false,
    item: null,
  });
  const [editItemVisible, setEditItemVisible] = useState({
    visible: false,
    item: null,
  });
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const fullWidth = props.fullWidth ? 24 : 12;

  const handleCancel = () => {
    setAddItemVisible({visible: false, item: null});
  };

  const handleEditCancel = () => {
    setEditItemVisible({visible: false, item: null});
  };

  const handleAddItemSubmit = (item) => {
    let cartItemsClone = [...cartItems];
    if (cartItemsClone.length > 0 && cartItemsClone[0].restaurantId !== item.restaurantId) {
      notification.warning({
        message: "Warning",
        description:
          "You cannot add items from multiple restaurants in one cart. Please order separately",
      });
      handleCancel();
      return;
    }
    const foundItem = cartItemsClone.findIndex(
      (cartItem) => cartItem.itemId === item.itemId
    );
    if (foundItem !== -1) {
      cartItemsClone.splice(foundItem, 1);
    }
    cartItemsClone.push(item);
    dispatch(setCartItems({ cartItems: cartItemsClone }));
    handleCancel();
  };

  const getItemCard = (item) => {
    let qty;
    if (props.showQty) {
      qty = cartItems.find((cartItem) => cartItem.itemId === item.item_id).qty;
    }

    return (
      <Col xs={24} sm={24} md={fullWidth} lg={fullWidth} key={item.item_id}>
        <Row
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (props.allowCart) {
              setAddItemVisible({ visible: true, item: item });
            }
            if (props.editable) {
              setEditItemVisible({ visible: true, item: item });
            }
          }}
        >
          <Col xs={16} sm={16} md={16} lg={16}>
            <Card title={item.item_name} className="itemCard">
              <div className="itemCard-child">
                <Typography.Text type="secondary" strong>
                  {item.item_description}
                </Typography.Text>
              </div>
              <div className="item-price-container itemCard-child">
                <div>
                  <Typography.Text code strong>
                    Main Ingredients: {item.item_ingridients}
                  </Typography.Text>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flex: "1" }}>
                    <Typography.Text type="secondary" className="item-price">
                      {converPriceToDollarFormat(item.item_price)}
                    </Typography.Text>
                  </div>
                  {props.showQty && (
                    <div
                      style={{
                        display: "flex",
                        flex: "1",
                        justifyContent: "center",
                      }}
                    >
                      <Typography.Text type="secondary" className="item-price">
                        Quantity: {qty}
                      </Typography.Text>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Col>
          &nbsp; 
          <Col xs={8} sm={8} md={8} lg={6} className="item-image-container">
            <Image
              className="itemImage"
              src={getImageURL(item.item_image)}
              preview={false}
            />
          </Col>
        </Row>
      </Col>
    );
  };

  const getAddItemModal = () => {
    return (
      props.allowCart && addItemVisible.item && (
        <AddItemModal
          item={addItemVisible.item}
          visible={addItemVisible.visible}
          handleCancel={handleCancel}
          handleSubmit={handleAddItemSubmit}
        />
      )
    );
  };

  const getEditItemModal = () => {
    return (
      props.editable && editItemVisible.item && (
        <Modal
          title="Edit Item"
          onCancel={handleEditCancel}
          visible={editItemVisible.visible}
          footer={null}
        >
          <ItemEditForm
            item={editItemVisible.item}
            refreshItems={(items) => {
              console.log(items);
              props.refreshItems(items)}}
            categories={props.categories}
            closeForm={handleEditCancel}
          />
        </Modal>
      )
    );
  };

  return (
    <div className="item-list-container">
      <Row>
        {props.items.length > 0 ? (
          props.items.map((item) => getItemCard(item))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {getAddItemModal()}
        {getEditItemModal()}
      </Row>
    </div>
  );
}

export default ItemList;
