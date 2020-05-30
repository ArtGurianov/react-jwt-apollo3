import { navigate, RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";

const Register: React.FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await register({ variables: { email, password } });

        navigate("/");
        console.log(response);
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
