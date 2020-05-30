import React, {
  createContext,
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";

const AppRoutes = React.lazy(() => import("./AppRoutes"));
const ProtectedAppRoutes = React.lazy(() => import("./ProtectedAppRoutes"));
const Header = React.lazy(() => import("./components/Header"));
const ProtectedHeader = React.lazy(() =>
  import("./components/ProtectedHeader")
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
    <authContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Suspense fallback={<div>loading header</div>}>
          {auth.isLoggedIn ? <ProtectedHeader /> : <Header />}
        </Suspense>
        <Switch>
          <Route exact path="/" component={Home} />
          <Suspense fallback={<div>loading routes</div>}>
            {auth.isLoggedIn ? <ProtectedAppRoutes /> : <AppRoutes />}
          </Suspense>
        </Switch>
      </BrowserRouter>
    </authContext.Provider>
  );
};
