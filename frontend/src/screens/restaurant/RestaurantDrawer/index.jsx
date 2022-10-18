import React from "react";
import URLS from "../../../global/constants/UrlConstants";
import history from "../../../utils/history";
import {
  UserOutlined,
  FileDoneOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import CustomMenu from "../../../global/components/CustomMenu";

function RestaurantDrawer() {
  const menuItems = [
    {
      key: URLS.restaurantProfilePath,
      icon: <UserOutlined />,
      text: "Profile",
      onClick: () => history.push(URLS.restaurantProfilePath),
    },
    {
      key: URLS.restaurantOrdersPath,
      icon: <FileDoneOutlined />,
      text: "Orders",
      onClick: () => history.push(URLS.restaurantOrdersPath),
    },
    {
      key: URLS.restaurantMenuViewPath,
      icon: <ShopOutlined />,
      text: "Menu",
      onClick: () => history.push(URLS.restaurantMenuViewPath),
    },
  ];

  return <CustomMenu menuItems={menuItems} />;
}

export default RestaurantDrawer;
