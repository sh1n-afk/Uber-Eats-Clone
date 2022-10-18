import React, { useEffect } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Col, Layout, Row, Space, Typography } from "antd";
import "../CustomLayout.css";
import { useSelector } from "react-redux";
import {
  resetAuth,
  selectIsAuthenticated,
  selectMemberName,
} from "../../auth/authSlice";
import Auth from "../../auth";
import { useDispatch } from "react-redux";

const { Header } = Layout;

function LayoutHeader(props) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const memberName = useSelector(selectMemberName);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetAuth());
  };

  const getDrawerIcon = () => {
    return (
      <div className="trigger-container">
        {props.isDrawerOpen ? (
          <MenuUnfoldOutlined
            className="trigger"
            onClick={props.toggleSlider}
          />
        ) : (
          <MenuFoldOutlined className="trigger" onClick={props.toggleSlider} />
        )}
      </div>
    );
  };

  const getTitle = () => {
    return (
      <div className="title-container">
        <Typography className="title-second">tap</Typography>
        <Typography className="title-first">N</Typography>
        <Typography className="title-second">eat</Typography>
      </div>
    );
  };

  const getLogoutButton = () => {
    return (
      <div className="logout-container">
        <Space size={4}>
          {isAuthenticated && (
            <div className="welcome-text">Hi, {memberName}</div>
          )}
          {isAuthenticated ? (
            <LogoutOutlined className="trigger" onClick={handleLogout} />
          ) : (
            <div className="padded-container">
              <Auth />
            </div>
          )}
        </Space>
      </div>
    );
  };

  return (
    <Header className="site-layout-header-background" style={{ padding: 0 }}>
      <Row>
        <Col flex={1}>{getDrawerIcon()}</Col>
        <Col flex={1}>{getTitle()}</Col>
        <Col flex={1}>{getLogoutButton()}</Col>
      </Row>
    </Header>
  );
}

export default LayoutHeader;
