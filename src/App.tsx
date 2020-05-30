import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import ProtectedHeader from "./components/ProtectedHeader";
import { Home } from "./pages/Home";
import ProtectedAppRoutes from "./ProtectedAppRoutes";

// const Header = React.lazy(() => import("./components/Header"));
// const ProtectedHeader = React.lazy(() =>
//   import("./components/ProtectedHeader")
// );
// const ProtectedAppRoutes = React.lazy(() => import("./ProtectedAppRoutes"));
// const AppRoutes = React.lazy(() => import("./AppRoutes"));

export const authContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (v: boolean) => {},
});

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

  // useEffect(() => {
  //   console.log(`IsLoggedIn: ${isLoggedIn}`);
  // }, [isLoggedIn]);

  if (loading) {
    return <div>loading...</div>;
  }
  // return (
  //   <BrowserRouter>
  //     <Suspense fallback={<div>loading header</div>}>
  //       {isLoggedIn ? <ProtectedHeader /> : <Header />}
  //     </Suspense>

  //     <Switch>
  //       <Route exact path="/" component={Home} />
  //       <Suspense fallback={<div>loading routes</div>}>
  //         {isLoggedIn ? <ProtectedAppRoutes /> : <AppRoutes />}
  //       </Suspense>
  //     </Switch>
  //   </BrowserRouter>
  // );

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        {isLoggedIn ? <ProtectedHeader /> : <Header />}

        <Switch>
          <Route exact path="/" component={Home} />
          {isLoggedIn ? <ProtectedAppRoutes /> : <AppRoutes />}
        </Switch>
      </BrowserRouter>
    </authContext.Provider>
  );
};
