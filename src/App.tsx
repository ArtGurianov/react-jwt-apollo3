import { Router } from "@reach/router";
import React, { useEffect } from "react";
import Alert from "./components/Alert";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import { createLazyRoute } from "./utils/createLazyRoute";

const PublicHeader = createLazyRoute(
  React.lazy(() => import("./components/PublicHeader"))
);
const PrivateHeader = createLazyRoute(
  React.lazy(() => import("./components/PrivateHeader"))
);
const PrivateAppRoutes = createLazyRoute(
  React.lazy(() => import("./PrivateAppRoutes"))
);
const PublicAppRoutes = createLazyRoute(
  React.lazy(() => import("./PublicAppRoutes"))
);

export const App: React.FC = () => {
  const { data } = useAuth();

  useEffect(() => {
    console.log("rerender");
  });

  return (
    <>
      {data?.me.__typename === "User" ? (
        <PrivateHeader path="/" />
      ) : (
        <PublicHeader path="/" />
      )}
      <Router>
        <Home path="/" />
        {data?.me.__typename === "User" ? (
          <PrivateAppRoutes path="/*" />
        ) : (
          <PublicAppRoutes path="/*" />
        )}
      </Router>
      <Alert />
    </>
  );
};
