import { navigate, RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";

const Login: React.FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { sendAlert } = useAlert();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result?.login?.__typename === "LoginResponse") {
          sendAlert("Logged in!");
          navigate("/");
        }
      }}
    >
      <div>
        <input
          value={email}
          placeholder="email"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
