import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  InputNumber,
  Typography,
  Input,
  Space,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { converPriceToDollarFormat } from "../../../../helpers/methods";

function AddItemModal(props) {
  const [itemsQty, setItemsQty] = useState(1);
  const [description, setDescription] = useState("");
  const [itemPrice, setItemPrice] = useState(props.item.item_price);

  useEffect(() => {
    setItemPrice(itemsQty * props.item.item_price);
  }, [itemsQty]);

  const reduceValue = () => {
    if (itemsQty > 1) {
      setItemsQty(itemsQty - 1);
    }
  };

  const addValue = () => {
    setItemsQty(itemsQty + 1);
  };

  const handleAddToOrder = () => {
    const item = {
      itemId: props.item.item_id,
      itemPrice: props.item.item_price,
      restaurantId: props.item.restaurant_id,
      qty: itemsQty,
      specialInstruction: description,
    };
    props.handleSubmit(item);
  };

  const getNumPicker = () => {
    return (
      <>
        <Button type="primary" icon={<MinusOutlined />} onClick={reduceValue} />
        <InputNumber
          min={1}
          value={itemsQty}
          onChange={(value) => setItemsQty(value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={addValue} />
      </>
    );
  };

  const getItemModal = () => {
    return (
      <Modal
        visible={props.visible}
        title={props.item.item_name}
        onOk={props.handleSubmit}
        onCancel={props.handleCancel}
        footer={[
          getNumPicker(),
          <Button key="submit" type="primary" onClick={handleAddToOrder}>
            <Space>
              Add to Order
              <Typography.Text style={{ color: "white" }}>
                {converPriceToDollarFormat(itemPrice)}
              </Typography.Text>
            </Space>
          </Button>,
        ]}
      >
        <Typography.Title level={4}>Special Instructions</Typography.Title>
        <Input.TextArea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Modal>
    );
  };

  return <>{getItemModal()}</>;
}

export default AddItemModal;
