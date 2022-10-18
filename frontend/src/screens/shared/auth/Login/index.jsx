import { Input, Button, Form, Space, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import "../Auth.css";
import CustomForm from "../../../../global/components/CustomForm";
import STRINGS from "../../../../global/constants/StringConstants";
import { NavLink } from "react-router-dom";
import { login } from "../authService";
import { openErrorNotification } from "../../../../helpers/methods";
import { useDispatch } from "react-redux";
import { setMember } from "../authSlice";
import history from "../../../../utils/history";
import URLS from "../../../../global/constants/UrlConstants";

function Login(props) {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();

  const formItems = [
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
      id: "login-form-button",
      children: (
        <Space direction="vertical" size={15} className="space-container">
          <Button type="primary" htmlType="submit" className="auth-form-button">
            Log in
          </Button>
          <Typography>
            To register as a new member{" "}
            <NavLink to="#" onClick={() => props.setDisplayLogin(false)}>
              Click Here
            </NavLink>
          </Typography>
        </Space>
      ),
    },
  ];

  const onFinish = async (values) => {
    const response = await login(
      values.email,
      values.password,
      props.memberType
    );
    if (response.error) {
      openErrorNotification(response.message);
    } else {
      const memberDetails = {
        isAuthenticated: response.data.isAuthenticated,
        memberId: response.data.member_id,
        memberName: response.data.member_name,
        memberType: response.data.member_type,
      };
      loginForm.resetFields();
      dispatch(setMember(memberDetails));
      memberDetails.memberType === STRINGS.customer
        ? history.push(URLS.customerProfilePath)
        : history.push(URLS.restaurantProfilePath);
    }
  };

  const getSignInForm = () => {
    return (
      <CustomForm
        name="login_form"
        layout="vertical"
        form={loginForm}
        onFinish={onFinish}
        formItems={formItems}
      />
    );
  };

  return <>{getSignInForm()}</>;
}

export default Login;
