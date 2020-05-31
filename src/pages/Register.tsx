import { ApolloError } from "@apollo/client";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { RegistrationError, useRegisterMutation } from "../generated/graphql";

const Register: React.FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation({
    onError: (e: ApolloError) => {
      e.graphQLErrors.map((err) => console.log(err.message));
    },
    onCompleted: (data) => {
      const typename = data.register.__typename;
      if (typename === "BooleanResponse") {
        navigate("/");
      }
      if (typename === "RegistrationError") {
        console.log((data.register as RegistrationError).errorMessage);
      }
    },
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await register({ variables: { email, password } });
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
