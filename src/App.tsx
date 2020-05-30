import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";

const Header = React.lazy(() => import("./components/Header"));
const ProtectedHeader = React.lazy(() =>
  import("./components/ProtectedHeader")
);
const ProtectedAppRoutes = React.lazy(() => import("./ProtectedAppRoutes"));
const AppRoutes = React.lazy(() => import("./AppRoutes"));

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      localStorage.setItem("accessToken", accessToken);
      setLoading(false);
      accessToken && accessToken.length && setIsLoggedIn(true);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading header</div>}>
        {isLoggedIn ? <ProtectedHeader /> : <Header />}
      </Suspense>

      <Switch>
        <Route exact path="/" component={Home} />
        <Suspense fallback={<div>loading routes</div>}>
          {isLoggedIn ? <ProtectedAppRoutes /> : <AppRoutes />}
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};
