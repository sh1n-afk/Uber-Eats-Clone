import {
  Input,
  TimePicker,
  Form,
  Row,
  Col,
  DatePicker,
  Button,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import STRINGS from "../../../global/constants/StringConstants";
import { selectMemberId } from "../../shared/auth/authSlice";
import {
  fetchRestaurantInfo,
  insertImage,
  updateRestaurant,
} from "../restaurantService";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import CustomAddress from "../../../global/components/CustomAddress";
import CustomAvatar from "../../../global/components/CustomAvatar";
import CustomForm from "../../../global/components/CustomForm";
import moment from "moment-timezone";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOAD_RESTAURANT } from "../../../graphql/queries";
import { DropzoneArea } from "material-ui-dropzone";

function RestaurantProfile() {
  const [formData, setFormData] = useState({ data: null, formItems: [] });
  const [newImageUrl, setNewImageUrl] = useState("");
  const restaurantId = useSelector(selectMemberId);
  const [restaurantProfileForm] = Form.useForm();
  const [loadRest, { loading, error, data: newData }] = useLazyQuery(
    LOAD_RESTAURANT,
    { variables: { id: restaurantId } }
  );

  useEffect(() => {
    loadRest();
  }, []);

  useEffect(() => {
    if (newData) {
      loadRestaurantInfo(newData);
    }
  }, [newData]);

  const loadRestaurantInfo = async (newData) => {
    // const response = await fetchRestaurantInfo(restaurantId);
    const data = {
      restaurant: {
        ...newData.getRestaurant,
        restaurantImage: newData.getRestaurant.restaurant_image,
        phoneNumber: newData.getRestaurant.phone_number,
      },
      address: newData.getRestaurant.location,
    };
    // data.restaurant.timings[0] = moment(data.restaurant.timings[0]);
    // data.restaurant.timings[1] = moment(data.restaurant.timings[1]);

    const formItemsrestaurant = [
      {
        id: "email",
        name: ["restaurant", "email"],
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
        name: ["restaurant", "name"],
        label: "Name",
        children: <Input placeholder="Name" />,
      },
      {
        id: "description",
        name: ["restaurant", "description"],
        label: "Description",
        children: <Input.TextArea rows={4} placeholder="Description" />,
      },
      {
        id: "dateOfBirth",
        name: ["restaurant", "dateOfBirth"],
        label: "Date of Birth",
        children: <DatePicker format="MM-DD-YYYY" allowClear />,
      },
      {
        id: "phoneNumber",
        name: ["restaurant", "phoneNumber"],
        label: "Phone Number",
        children: (
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="(123) 456-7890"
          />
        ),
      },
      {
        id: "restaurantTimings",
        name: ["restaurant", "timings"],
        label: "Restaurant Timings",
        children: <TimePicker.RangePicker format={"HH:mm"} />,
      },
      {
        id: "address",
        children: <CustomAddress />,
      },
      {
        id: "restaurant-update-form-button",
        children: (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ),
      },
    ];
    setFormData({ data: data, formItems: formItemsrestaurant });
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
    const newRestImage = newImageUrl ? { restaurantImage: newImageUrl } : {};
    let restaurant = {
      ...values.restaurant,
      location: { ...values.address },
      ...newRestImage,
    };
    // restaurant.openTime = restaurant.timings[0];
    // restaurant.closeTime = restaurant.timings[1];

    const res = await updateRestaurant(restaurantId, restaurant);
    loadRest();
    notification.success({
      message: "Success",
      description: res.data.message,
    });
  };

  return (
    <Row>
      {/* <Col xs={24} sm={24} md={8} lg={4}>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Drag and drop an image here or click"}
          filesLimit={1}
          onChange={(files) => handleFileUpload(files)}
          dropzoneClass="label-margin-zone"
          showAlerts={false}
        /> */}
        {/* <CustomAvatar
          avatar={formData.data?.restaurant.restaurantImage}
          onChange={handleFileUpload}
        /> */}
      {/* </Col> */}
      &nbsp;&nbsp;&nbsp;
      <Col xs={24} sm={24} md={16} lg={16}>
        {formData.formItems.length > 0 && (
          <CustomForm
            name="restaurant_profile_form"
            layout="vertical"
            initialValues={formData.data}
            form={restaurantProfileForm}
            onFinish={onFinish}
            formItems={formData.formItems}
          />
        )}
      </Col>
      &nbsp;&nbsp;&nbsp;
      <Col xs={24} sm={24} md={8} lg={6}>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Drag and drop an image here or click"}
          filesLimit={1}
          onChange={(files) => handleFileUpload(files)}
          dropzoneClass="label-margin-zone"
          showAlerts={false}
        />
        {/* <CustomAvatar
          avatar={formData.data?.restaurant.restaurantImage}
          onChange={handleFileUpload}
        /> */}
      </Col>
    </Row>
  );
}

export default RestaurantProfile;
