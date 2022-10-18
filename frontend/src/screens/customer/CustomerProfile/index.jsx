import { Col, Input, Row, Form, DatePicker, Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomAddress from "../../../global/components/CustomAddress";
import CustomAvatar from "../../../global/components/CustomAvatar";
import CustomForm from "../../../global/components/CustomForm";
import STRINGS from "../../../global/constants/StringConstants";
import { selectMemberId } from "../../shared/auth/authSlice";
import { fetchCustomerInfo, updateCustomer } from "../customerService";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { DropzoneArea } from "material-ui-dropzone";
import { insertImage } from "../../restaurant/restaurantService";

function CustomerProfile() {
  const [formData, setFormData] = useState({ data: null, formItems: [] });
  const [newImageUrl, setNewImageUrl] = useState("");
  const customerId = useSelector(selectMemberId);
  const [customerProfileForm] = Form.useForm();

  useEffect(() => {
    loadCustomerInfo();
  }, []);

  const loadCustomerInfo = async () => {
    const response = await fetchCustomerInfo(customerId);
    const data = response.data;
    const formItemsCustomer = [
      {
        id: "email",
        name: ["customer", "email"],
        label: "Email",
        rules: [
          {
            pattern: STRINGS.emailRegex,
            message: "Email should be of format xyz@abc.com",
          },
        ],
        children: (
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        ),
      },
      {
        id: "name",
        name: ["customer", "name"],
        label: "Name",
        children: <Input placeholder="Name" />,
      },
      {
        id: "nickName",
        name: ["customer", "nickName"],
        label: "Nick Name",
        children: <Input placeholder="Nick Name" />,
      },
      {
        id: "dateOfBirth",
        name: ["customer", "dateOfBirth"],
        label: "Date of Birth",
        children: <DatePicker />,
      },
      {
        id: "phoneNumber",
        name: ["customer", "phoneNumber"],
        label: "Phone Number",
        children: (
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        ),
      },
      {
        id: "address",
        children: <CustomAddress required />,
      },
      {
        id: "customer-update-form-button",
        children: (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ),
      },
    ];
    setFormData({ data: data, formItems: formItemsCustomer });
  };

  const handleFileUpload = async (files) => {
    if (files.length === 0) {
      return;
    } else {
      const res = await insertImage(files[0]);
      setNewImageUrl(res.data.image);
    }
  };

  const onFinish = async (values) => {
    const newCustImage = newImageUrl ? { customerImage: newImageUrl } : {};

    let customer = {
      ...values.customer,
      address: { ...values.address },
      ...newCustImage,
    };

    const res = await updateCustomer(customerId, customer);
    loadCustomerInfo();
    notification.success({
      message: "Success",
      description: res.data.message,
    });
  };

  return (
    <Row>

      <Col xs={24} sm={24} md={16} lg={16}>
        {formData.formItems.length > 0 && (
          <CustomForm
            name="customer_profile_form"
            layout="vertical"
            initialValues={formData.data}
            form={customerProfileForm}
            onFinish={onFinish}
            formItems={formData.formItems}
          />
        )}
      </Col>
      &nbsp;
      <Col xs={24} sm={24} md={8} lg={6}>
      <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Drag and drop an image here or click"}
          filesLimit={1}
          onChange={(files) => handleFileUpload(files)}
          dropzoneClass="label-margin-zone"
          showAlerts={false}
        />
        {/* <CustomAvatar avatar={formData.data?.customer.customerImage} /> */}
      </Col>
    </Row>
  );
}

export default CustomerProfile;
