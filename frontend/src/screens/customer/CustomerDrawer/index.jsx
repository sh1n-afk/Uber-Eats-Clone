import React from "react";
import URLS from "../../../global/constants/UrlConstants";
import history from "../../../utils/history";
import {
  UserOutlined,
  FileDoneOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import CustomMenu from "../../../global/components/CustomMenu";

const menuItems = [
  {
    key: URLS.customerProfilePath,
    icon: <UserOutlined />,
    text: "Profile",
    onClick: () => history.push(URLS.customerProfilePath),
  },
  {
    key: URLS.customerOrdersPath,
    icon: <FileDoneOutlined />,
    text: "Orders",
    onClick: () => history.push(URLS.customerOrdersPath),
  },
];

function CustomerDrawer() {
  return <CustomMenu menuItems={menuItems} />;
}

export default CustomerDrawer;
