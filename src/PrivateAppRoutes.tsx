import React from "react";
import { Route } from "react-router-dom";
import ProtectedPage from "./pages/ProtectedPage";

const PrivateAppRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/protected" component={ProtectedPage} />
    </>
  );
};

export default PrivateAppRoutes;
