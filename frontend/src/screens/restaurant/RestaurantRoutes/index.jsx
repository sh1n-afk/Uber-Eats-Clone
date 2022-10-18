import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { selectIsAuthenticated } from "../../shared/auth/authSlice";
import PrivateRoute from "../../../global/components/PrivateRoute";
import URLS from "../../../global/constants/UrlConstants";
import RestaurantProfile from "../RestaurantProfile.jsx";
import MenuView from "../MenuView";
import RestaurantOrders from "../RestaurantOrders";

function RestaurantRoutes() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Switch>
      <PrivateRoute
        exact
        isAuthenticated={isAuthenticated}
        path={URLS.restaurantProfilePath}
        component={RestaurantProfile}
      />
      <PrivateRoute
        exact
        isAuthenticated={isAuthenticated}
        path={URLS.restaurantOrdersPath}
        component={RestaurantOrders}
      />
      <PrivateRoute
        exact
        isAuthenticated={isAuthenticated}
        path={URLS.restaurantMenuViewPath}
        component={MenuView}
      />
    </Switch>
  );
}

export default RestaurantRoutes;
