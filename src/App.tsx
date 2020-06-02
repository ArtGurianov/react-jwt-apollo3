import { Router } from "@reach/router";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import { AlertProvider } from "./utils/AlertContext";
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

export interface AuthInterface {
  auth: { isLoggedIn: boolean };
  setAuth: Dispatch<SetStateAction<{ isLoggedIn: boolean }>>;
}

export const initialAuthValue: AuthInterface = {
  auth: { isLoggedIn: false },
  setAuth: () => {},
};

export const authContext = createContext(initialAuthValue);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ isLoggedIn: false });

  //This UseEffect hits only on page reload
  useEffect(() => {
    fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const resultJson = await x.json();
      if (resultJson.accessToken) {
        localStorage.setItem("accessToken", resultJson.accessToken);
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
      <authContext.Provider value={{ auth, setAuth }}>
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
      </authContext.Provider>
      <Alert />
    </AlertProvider>
  );
};
