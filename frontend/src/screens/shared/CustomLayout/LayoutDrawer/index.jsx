import React from "react";
import { Layout } from "antd";
import "../CustomLayout.css";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectMemberType } from "../../auth/authSlice";
import STRINGS from "../../../../global/constants/StringConstants";
import CustomerDrawer from "../../../customer/CustomerDrawer";
import RestaurantDrawer from "../../../restaurant/RestaurantDrawer";
import CustomMenu from "../../../../global/components/CustomMenu";
import URLS from "../../../../global/constants/UrlConstants";
import { HomeOutlined } from "@ant-design/icons";
import history from "../../../../utils/history";

const { Sider } = Layout;

const menuItems = [
  {
    key: URLS.homePath,
    icon: <HomeOutlined />,
    text: "Dashboard",
    onClick: () => history.push(URLS.homePath),
  },
];

function LayoutDrawer(props) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const memberType = useSelector(selectMemberType);

  return (
    <Sider trigger={null} collapsible collapsed={props.isDrawerOpen}>
      {/* <div className="logo" /> */}
      <CustomMenu menuItems={menuItems} />
      {isAuthenticated &&
        (memberType === STRINGS.customer ? (
          <CustomerDrawer />
        ) : (
          <RestaurantDrawer />
        ))}
    </Sider>
  );
}

export default LayoutDrawer;
