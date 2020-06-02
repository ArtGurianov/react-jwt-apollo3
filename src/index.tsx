import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import introspectionResult from "./generated/introspection";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      if (message === "Unauthorized") {
        console.log("Logged out");
      } else {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      }
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);

  //DISABLING NASTY ERRORS//
  // if (response && response.errors) {
  //   console.log(response.errors);
  //   response.errors = undefined;
  // }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    });
  }

  return forward(operation);
});

//hits on every request
const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return true; //means we not gonna request refresh token
    }
    try {
      const { exp } = jwtDecode(accessToken);
      //hit if expiring after 5 minutes SLIDING
      if (Date.now() + 300000 >= exp * 1000) {
        localStorage.removeItem("accessToken");
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
  },
  // handleResponse: (operation, accessTokenField) => (response) => {
  //   // here you can parse response, handle errors, prepare returned token to
  //   // further operations
  //   // returned object should be like this:
  //   // {
  //   //    access_token: 'token string here'
  //   // }
  // },
  handleError: () => {
    //console.log(err);
    // your custom action here
    //user.logout();
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    possibleTypes: introspectionResult.possibleTypes,
  }),
  credentials: "include",
  link: concat(
    refreshLink,
    concat(errorLink, concat(authMiddleware, httpLink))
  ),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
