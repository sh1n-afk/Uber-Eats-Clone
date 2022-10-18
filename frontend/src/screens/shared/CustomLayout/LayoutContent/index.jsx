import React from "react";
import { Layout } from "antd";
import CustomerRoutes from "../../../customer/CustomerRoutes";
import RestaurantRoutes from "../../../restaurant/RestaurantRoutes";
import Dashboard from "../../../customer/Dashboard";
import { Route, Switch } from "react-router-dom";
import URLS from "../../../../global/constants/UrlConstants";
import RestaurantDetail from "../../../restaurant/RestaurantDetail";

const { Content } = Layout;

function LayoutContent() {
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        minHeight: 280,
      }}
    >
      <RestaurantRoutes />
      <CustomerRoutes />
      <Switch>
        <Route exact path={URLS.homePath} component={Dashboard} />
        <Route exact path={URLS.itemsViewPath} component={RestaurantDetail} />
      </Switch>
    </Content>
  );
}

export default LayoutContent;
