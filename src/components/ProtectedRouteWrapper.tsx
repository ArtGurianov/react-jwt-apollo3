import { Redirect } from "@reach/router";
import React, { useContext } from "react";
import { authContext } from "../App";

const ProtectedRouteWrapper: React.FC = ({ children }) => {
  const {
    auth: { isLoggedIn },
  } = useContext(authContext);
  return <>{isLoggedIn ? { children } : <Redirect to="/login" noThrow />}</>;
};

export default ProtectedRouteWrapper;
