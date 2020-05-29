import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./pages/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Protected } from "./pages/Protected";
import { Register } from "./pages/Register";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/protected" component={Protected} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
