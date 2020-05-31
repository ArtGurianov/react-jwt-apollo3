import { Router } from "@reach/router";
import React from "react";
import NotFound from "./pages/NotFound";
import ProtectedPage from "./pages/ProtectedPage";

const PrivateAppRoutes: React.FC = () => {
  return (
    <Router>
      <ProtectedPage path="/protected" />
      <NotFound default />
    </Router>
  );
};

export default PrivateAppRoutes;
