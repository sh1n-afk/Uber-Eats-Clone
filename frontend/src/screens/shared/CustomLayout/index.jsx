import React, { useState } from "react";
import { Layout } from "antd";
import LayoutDrawer from "./LayoutDrawer";
import LayoutHeader from "./LayoutHeader";
import LayoutContent from "./LayoutContent";
import "./CustomLayout.css";
import history from "../../../utils/history";
import URLS from "../../../global/constants/UrlConstants";

function CustomLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleSlider = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Layout className="site-layout-container">
      <LayoutDrawer isDrawerOpen={isDrawerOpen} />
      <Layout className="site-layout">
        <LayoutHeader isDrawerOpen={isDrawerOpen} toggleSlider={toggleSlider} />
        <LayoutContent />
      </Layout>
    </Layout>
  );
}

export default CustomLayout;
