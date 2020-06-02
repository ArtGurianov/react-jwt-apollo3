import { Redirect } from "@reach/router";
import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

const ProtectedRouteWrapper: React.FC = ({ children }) => {
  const {
    auth: { isLoggedIn },
  } = useContext(AuthContext);
  return <>{isLoggedIn ? { children } : <Redirect to="/login" noThrow />}</>;
};

export default ProtectedRouteWrapper;
