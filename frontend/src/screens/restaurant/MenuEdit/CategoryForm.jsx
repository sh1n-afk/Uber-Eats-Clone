import React from "react";
import CustomForm from "../../../global/components/CustomForm";
import { Form, Button, Input } from "antd";
import { insertCategory } from "../restaurantService";
import { selectMemberId } from "../../shared/auth/authSlice";
import { useSelector } from "react-redux";

const formItems = [
  {
    id: "categoryName",
    name: "categoryName",
    label: "Category Name",
    rules: [
      {
        required: true,
        message: "Please input your Category Name!",
      },
    ],
    children: <Input placeholder="Category Name" />,
  },
  {
    id: "category-form-button",
    children: (
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    ),
  },
];

function CategoryForm(props) {
  const [categoryForm] = Form.useForm();
  const restaurantId = useSelector(selectMemberId);

  const onFinish = async (values) => {
    const response = await insertCategory(restaurantId, values.categoryName);
    props.refreshCategories(response.data.categories);
    props.closeForm();
  };

  return (
    <CustomForm
      name="categoryForm"
      layout="vertical"
      form={categoryForm}
      onFinish={onFinish}
      formItems={formItems}
    />
  );
}

export default CategoryForm;
