import { ApolloError } from "@apollo/client";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useState } from "react";
import {
  CustomErrorsResult,
  LoginResponse,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "../generated/graphql";
import { AuthContext } from "../utils/AuthContext";

const Login: React.FC<RouteComponentProps> = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation({
    onError: (e: ApolloError) => {
      e.graphQLErrors.map((err) => console.log(err.message));
    },
    onCompleted: (data) => {
      const typename = data.login.__typename;
      if (typename === "CustomErrorsResult") {
        console.log((data.login as CustomErrorsResult).errors);
      }
      if (typename === "LoginResponse") {
        localStorage.setItem(
          "accessToken",
          (data.login as LoginResponse).accessToken
        );
        setAuth((prevState) => ({ ...prevState, isLoggedIn: true }));
        navigate("/");
      }
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await login({
          variables: { email, password },
          update: (cache, { data }) => {
            if (data && data.login.__typename === "LoginResponse") {
              cache.writeQuery<MeQuery>({
                //make sure that ME and LOGIN query return same fiels. Apollo
                query: MeDocument,
                data: {
                  me: (data.login as LoginResponse).user,
                },
              });
            }
          },
        });
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
