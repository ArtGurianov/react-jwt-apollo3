import { RouteComponentProps, Router } from "@reach/router";
import React from "react";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

const PublicAppRoutes: React.FC<RouteComponentProps> = () => {
  return (
    <Router>
      <Register path="/register" />
      <Login path="/login" />
      <NotFound default />
    </Router>
  );
};

export default PublicAppRoutes;
