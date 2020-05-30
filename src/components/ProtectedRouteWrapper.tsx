import { Redirect } from "@reach/router";
import React from "react";

const ProtectedRouteWrapper: React.FC = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return (
    <>
      {token && token.length ? { children } : <Redirect to="/login" noThrow />}
    </>
  );
};

export default ProtectedRouteWrapper;
