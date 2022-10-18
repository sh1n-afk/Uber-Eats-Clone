import React, { useState } from "react";
import CustomForm from "../../../global/components/CustomForm";
import { Button, Col, Form, Input, InputNumber, Row, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { generateOptionsJson } from "../../../helpers/methods";
import CustomSelect from "../../../global/components/CustomSelect";
import CustomAvatar from "../../../global/components/CustomAvatar";
import "./MenuEdit.css";
import { insertImage, insertItem } from "../restaurantService";
import { useSelector } from "react-redux";
import { selectMemberId } from "../../shared/auth/authSlice";
import { DropzoneArea } from "material-ui-dropzone";

const itemTypes = [
  {
    name: "Veg",
    id: "1",
  },
  {
    name: "Non-Veg",
    id: "2",
  },
  {
    name: "Vegan",
    id: "3",
  },
];

function ItemForm(props) {
  const [itemForm] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const restaurantId = useSelector(selectMemberId);

  const intialValues =
    props.item && props.edit ? { initialValues: { item: props.item } } : {};

  const getCategoriesOptions = () => {
    const result = generateOptionsJson(
      props.categories,
      "category_name",
      "category_name",
      "category_id"
    );
    return result;
  };

  const getItemTypeOptions = () => {
    const result = generateOptionsJson(itemTypes, "name", "name", "id");
    return result;
  };

  const handleCategoryChange = (category, categoryJson) => {
    setSelectedCategory(categoryJson.data.category_id);
  };

  const handleFileUpload = async (files) => {
    if (files.length === 0) {
      return;
    } else {
      const res = await insertImage(files[0]);
      setNewImageUrl(res.data.image);
    }
  };

  const formItems = [
    {
      id: "itemName",
      name: ["item", "itemName"],
      label: "Item Name",
      rules: [
        {
          required: true,
          message: "Please input your Item Name!",
        },
      ],
      children: <Input placeholder="Item Name" />,
    },
    {
      id: "itemDescription",
      name: ["item", "itemDescription"],
      label: "Item Description",
      rules: [
        {
          required: true,
          message: "Please input your Item Description!",
        },
      ],
      children: (
        <Input.TextArea rows={4} placeholder="Crispy shell filled with ..." />
      ),
    },
    {
      id: "itemIngridients",
      name: ["item", "itemIngridients"],
      label: "Item Ingridients",
      rules: [
        {
          required: true,
          message: "Please select your Item Ingridients!",
        },
      ],
      children: (
        <Input.TextArea
          rows={4}
          placeholder="Mozarella Cheese, Red Pepper ..."
        />
      ),
    },
    {
      id: "itemCategory",
      name: ["item", "itemCategory"],
      label: "Item Category",
      rules: [
        {
          required: true,
          message: "Please select your Item Category!",
        },
      ],
      children: (
        <CustomSelect
          placeholder="Select a Category"
          selectOptions={getCategoriesOptions()}
          onChange={handleCategoryChange}
        />
      ),
    },
    {
      id: "itemType",
      name: ["item", "itemType"],
      label: "Item Type",
      rules: [
        {
          required: true,
          message: "Please select your Item Type!",
        },
      ],
      children: (
        <CustomSelect
          placeholder="Select Item Type"
          selectOptions={getItemTypeOptions()}
        />
      ),
    },
    {
      id: "itemPrice",
      name: ["item", "itemPrice"],
      label: "Item Price",
      rules: [
        {
          required: true,
          message: "Please select your Item Name!",
        },
      ],
      children: (
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      ),
    },
    {
      id: "item-form-button",
      children: (
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      ),
    },
  ];

  // const handleFileUpload = async (info) => {
  //   const formData = new FormData();
  //   formData.append("image", info.file);
  //   formData.append("restaurantId", restaurantId);
  //   await insertRestaurantImage(formData);
  // };

  const onFinish = async (values) => {
    const newItemImage = newImageUrl ? { itemImage: newImageUrl } : {};
    const item = { ...values.item, categoryId: selectedCategory, ...newItemImage };
    const response = await insertItem(restaurantId, item);
    props.refreshItems(response.data.items);
    props.closeForm();
  };

  return (
    <>
      <Row>
        <Col>
          <Button
            onClick={() => props.closeForm()}
            type="text"
            size="large"
            icon={<ArrowLeftOutlined />}
          />
        </Col>
        <Col>
          <Typography.Title level={2}>Add an Item</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col flex={1} className="centerItem">
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag and drop an image here or click"}
            filesLimit={1}
            onChange={(files) => handleFileUpload(files)}
            dropzoneClass="label-margin-zone"
            showAlerts={false}
          />
          {/* <CustomAvatar avatar="" /> */}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={8} lg={8}>
          <CustomForm
            name="itemForm"
            layout="vertical"
            {...intialValues}
            form={itemForm}
            onFinish={onFinish}
            formItems={formItems}
          />
        </Col>
        <Col xs={12} sm={12} md={16} lg={16}></Col>
      </Row>
    </>
  );
}

export default ItemForm;
