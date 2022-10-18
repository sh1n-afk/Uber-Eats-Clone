import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  const { component: Component, isAuthenticated, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: routeProps.location,
                search: routeProps.location.search,
              },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
