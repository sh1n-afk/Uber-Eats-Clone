import { Menu } from "antd";
import React from "react";

function CustomMenu(props) {
  const defaultSelectedKeysObject = props.defaultSelectedKeys
    ? { defaultSelectedKeys: [props.defaultSelectedKeys] }
    : {};

  const selectedKeysObject = props.selectedKeys
    ? {
        selectedKeys: [props.selectedKeys],
      }
    : {};

  return (
    <Menu
      theme="dark"
      mode="inline"
      {...defaultSelectedKeysObject}
      {...selectedKeysObject}
    >
      {props.menuItems.map((menuItem) => (
        <Menu.Item
          key={menuItem.key}
          icon={menuItem.icon}
          onClick={() => menuItem.onClick()}
        >
          {menuItem.text}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default CustomMenu;
