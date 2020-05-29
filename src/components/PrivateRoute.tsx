import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getAccessToken } from "../tokenStore";

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getAccessToken() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
