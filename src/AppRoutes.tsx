import React from "react";
import { Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </>
  );
};

export default AppRoutes;
