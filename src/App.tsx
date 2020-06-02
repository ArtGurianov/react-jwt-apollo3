import { Router } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import { AlertProvider } from "./utils/AlertContext";
import { AuthContext, AuthProvider } from "./utils/AuthContext";
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
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);

  // const authCallback = useCallback(
  //   (value) => {
  //     setAuth(value);
  //   },
  //   [setAuth]
  // );

  //This UseEffect hits only on page reload
  useEffect(() => {
    fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const resultJson = await x.json();
      if (resultJson.accessToken) {
        localStorage.setItem("accessToken", resultJson.accessToken);
        //authCallback({ isLoggedIn: true });
        setAuth({ isLoggedIn: true });
      }
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <AlertProvider>
      <AuthProvider>
        {auth.isLoggedIn ? (
          <PrivateHeader path="/" />
        ) : (
          <PublicHeader path="/" />
        )}
        <Router>
          <Home path="/" />
          {auth.isLoggedIn ? (
            <PrivateAppRoutes path="/*" />
          ) : (
            <PublicAppRoutes path="/*" />
          )}
        </Router>
      </AuthProvider>
      <Alert />
    </AlertProvider>
  );
};
