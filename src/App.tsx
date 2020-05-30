import { Router } from "@reach/router";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Home from "./pages/Home";
import { createLazyRoute } from "./utils/createLazyRoute";

const Register = createLazyRoute(React.lazy(() => import("./pages/Register")));
const Login = createLazyRoute(React.lazy(() => import("./pages/Login")));
const ProtectedPage = createLazyRoute(
  React.lazy(() => import("./pages/ProtectedPage"))
);
const PublicHeader = createLazyRoute(
  React.lazy(() => import("./components/PublicHeader"))
);
const PrivateHeader = createLazyRoute(
  React.lazy(() => import("./components/PrivateHeader"))
);

export interface ContextInterface {
  auth: { isLoggedIn: boolean };
  setAuth: Dispatch<SetStateAction<{ isLoggedIn: boolean }>>;
}

const initialContext: ContextInterface = {
  auth: { isLoggedIn: false },
  setAuth: () => {},
};

export const authContext = createContext(initialContext);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ isLoggedIn: false });

  useEffect(() => {
    fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      localStorage.setItem("accessToken", accessToken);
      setLoading(false);
      accessToken && accessToken.length && setAuth({ isLoggedIn: true });
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    // <authContext.Provider value={{ auth, setAuth }}>
    //   {auth.isLoggedIn ? <PrivateHeader /> : <PublicHeader />}
    //   <Router>
    //     <Home path="/" />
    //     {auth.isLoggedIn ? <PrivateAppRoutes /> : <PublicAppRoutes />}
    //   </Router>
    // </authContext.Provider>

    <authContext.Provider value={{ auth, setAuth }}>
      {auth.isLoggedIn ? <PrivateHeader /> : <PublicHeader />}
      <Router>
        <Home path="/" />
        {auth.isLoggedIn && <ProtectedPage path="/protected" />}
        {!auth.isLoggedIn && <Register path="/register" />}
        {!auth.isLoggedIn && <Login path="/login" />}
      </Router>
    </authContext.Provider>
  );
};
