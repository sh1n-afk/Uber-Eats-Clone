import { Input, Button, Form, Space, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import "../Auth.css";
import CustomForm from "../../../../global/components/CustomForm";
import STRINGS from "../../../../global/constants/StringConstants";
import { NavLink } from "react-router-dom";
import CustomAddress from "../../../../global/components/CustomAddress";
import { registerCustomer, registerRestaurant } from "../authService";
import { useMutation } from "@apollo/client";
import { REGISTER_CUSTOMER } from "../../../../graphql/mutations";

function SignUp(props) {
  const [registrationForm] = Form.useForm();
  const [createCustomer, { error }] = useMutation(REGISTER_CUSTOMER);

  const commonFormItems = [
    {
      id: "name",
      name: "name",
      label: "Name",
      rules: [
        {
          required: true,
          message: "Please input your Name!",
        },
      ],
      children: (
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
        />
      ),
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      rules: [
        {
          required: true,
          message: "Please input your Email!",
        },
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
      id: "password",
      name: "password",
      label: "Password",
      rules: [
        {
          required: true,
          message: "Please input your Password!",
        },
        {
          pattern: STRINGS.passwordRegex,
          message:
            "Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number",
        },
      ],
      children: (
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      ),
    },
    {
      id: "confirm_password",
      name: "confirm_password",
      label: "Confirm Password",
      rules: [
        {
          required: true,
          message: "Please input your Password again!",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject("Passwords do not match!");
          },
        }),
      ],
      children: (
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      ),
    },
  ];

  const customerFormItems = [
    ...commonFormItems,
    {
      id: "registration-form-button",
      children: (
        <Space direction="vertical" size={15} className="space-container">
          <Button type="primary" htmlType="submit" className="auth-form-button">
            Register
          </Button>
          <Typography>
            To login{" "}
            <NavLink to="#" onClick={() => props.setDisplayLogin(true)}>
              Click Here
            </NavLink>
          </Typography>
        </Space>
      ),
    },
  ];

  const restaurantFormItems = [
    ...commonFormItems,
    {
      id: "address",
      children: <CustomAddress required />,
    },
    {
      id: "registration-form-button",
      children: (
        <Space direction="vertical" size={15} className="space-container">
          <Button type="primary" htmlType="submit" className="auth-form-button">
            Register
          </Button>
          <Typography>
            If you are already a registered member{" "}
            <NavLink to="#" onClick={() => props.setDisplayLogin(true)}>
              Click Here
            </NavLink>
          </Typography>
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    if (props.memberType === STRINGS.customer) {
      createCustomer({
        variables: {
          email: values.email,
          password: values.password,
          name: values.name,
        },
      });
      if(error){
        console.log(error)
      }
      // registerCustomer(values.email, values.password, values.name);
    }
    if (props.memberType === STRINGS.restaurant) {
      registerRestaurant(values.email, values.password, values.name, {
        ...values.address,
      });
    }
    registrationForm.resetFields();
    props.setDisplayLogin(true);
  };

  const getSignUpForm = () => {
    if (props.memberType === STRINGS.restaurant) {
      registrationForm.setFieldsValue({
        address: { addressType: STRINGS.defaultAddress },
      });
    }

    return (
      <CustomForm
        name="registration_form"
        layout="vertical"
        form={registrationForm}
        onFinish={onFinish}
        formItems={
          props.memberType === STRINGS.customer
            ? customerFormItems
            : restaurantFormItems
        }
      />
    );
  };

  return <>{getSignUpForm()}</>;
}

export default SignUp;
