import { navigate, RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";

const Register: React.FC<RouteComponentProps> = () => {
  const { sendAlert } = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await register(email, password);
        if (result?.register?.__typename === "BooleanResponse") {
          sendAlert("registered!");
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
      <button type="submit">register</button>
    </form>
  );
};

export default Register;
