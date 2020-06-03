import { Redirect } from "@reach/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteWrapper: React.FC = ({ children }) => {
  const { data } = useAuth();
  return (
    <>
      {data?.me.__typename === "User" ? (
        { children }
      ) : (
        <Redirect to="/login" noThrow />
      )}
    </>
  );
};

export default ProtectedRouteWrapper;
