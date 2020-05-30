import { ApolloError } from "@apollo/client";
import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { authContext } from "../App";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { setAuth } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation({
    onError: (e: ApolloError) => {
      e.graphQLErrors.map((err) => console.log(err.message));
    },
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await login({
          variables: { email, password },
          update: (cache, { data }) => {
            if (!data) return null;
            cache.writeQuery<MeQuery>({
              //make sure that ME and LOGIN query return same fiels. Apollo
              query: MeDocument,
              data: {
                me: data.login.user,
              },
            });
          },
        });

        if (response && response.data) {
          localStorage.setItem("accessToken", response.data.login.accessToken);
          setAuth((prevState) => ({ ...prevState, isLoggedIn: true }));
          history.push("/");
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
