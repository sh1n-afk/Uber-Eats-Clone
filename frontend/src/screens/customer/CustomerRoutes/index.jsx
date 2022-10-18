import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../../global/components/PrivateRoute";
import URLS from "../../../global/constants/UrlConstants";
import { selectIsAuthenticated } from "../../shared/auth/authSlice";
import CustomerOrders from "../CustomerOrders";
import CustomerProfile from "../CustomerProfile";

function CustomerRoutes() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Switch>
      <PrivateRoute
        exact
        isAuthenticated={isAuthenticated}
        path={URLS.customerProfilePath}
        component={CustomerProfile}
      />
      <PrivateRoute
        exact
        path={URLS.customerOrdersPath}
        component={CustomerOrders}
        isAuthenticated={isAuthenticated}
      />
    </Switch>
  );
}

export default CustomerRoutes;
