import { ApolloError } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CustomErrorsResult,
  LoginResponse,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  User,
  useRegisterMutation,
} from "../generated/graphql";
import { USERS_QUERY } from "../graphql/users";
import { useAlert } from "./AlertContext";

//   data: MeQueryHookResult["data"];
//   login: (email: string, password: string) => LoginMutationHookResult;
//   register: (email: string, password: string) => RegisterMutationHookResult;
//   logout: () => LogoutMutationHookResult;
interface AuthInterface {
  data: { me: User | CustomErrorsResult };
  login: any;
  register: any;
  logout: any;
}

export const initialMeData = {
  me: {
    __typename: "CustomErrorsResult",
    id: "4926e3d6-ac6e-41a0-b309-64747b443b0c",
    errors: [
      {
        __typename: "CustomError",
        id: "1d46728a-dbc3-4335-a98e-26f7aa8d3fc7",
        property: "auth",
        errorMessages: ["logged out"],
      },
    ],
  } as CustomErrorsResult,
};

const InitialAuthValue: AuthInterface = {
  data: initialMeData,
  login: () => null,
  register: () => null,
  logout: () => null,
};

const AuthContext = createContext(InitialAuthValue);

function AuthProvider(props: any) {
  const { sendAlert, sendError } = useAlert();
  const [isLoading, setIsLoading] = useState(true);

  const { loading, data, refetch } = useMeQuery({
    errorPolicy: "none",
    fetchPolicy: "cache-and-network",
  });

  const [loginMutation] = useLoginMutation({
    fetchPolicy: "no-cache",
    onError: (e: ApolloError) => {
      e.graphQLErrors.forEach((err) => sendError(err.message));
    },
    onCompleted: (data) => {
      const typename = data.login.__typename;
      if (typename === "CustomErrorsResult") {
        (data.login as CustomErrorsResult).errors.forEach((err) => {
          err.errorMessages.forEach((e) => {
            sendError(e);
          });
        });
      }
      if (typename === "LoginResponse") {
        localStorage.setItem(
          "accessToken",
          (data.login as LoginResponse).accessToken
        );
        sendAlert("logged in ^^");
      }
    },
  });

  const [registerMutation] = useRegisterMutation({
    fetchPolicy: "no-cache",
    onError: (e: ApolloError) => {
      e.graphQLErrors.forEach((err) => sendError(err.message));
    },
    onCompleted: (data) => {
      const typename = data.register.__typename;
      if (typename === "BooleanResponse") {
        sendAlert("register success");
      }
      if (typename === "CustomErrorsResult") {
        (data.register as CustomErrorsResult).errors.forEach((err) => {
          err.errorMessages.forEach((e) => {
            sendError(e);
          });
        });
      }
    },
  });

  const [logoutMutation] = useLogoutMutation({
    fetchPolicy: "no-cache",
    onError: (e: ApolloError) => {
      e.graphQLErrors.map((err) => sendError(err.message));
    },
    onCompleted: async (data) => {
      if (data.logout === true) {
        localStorage.removeItem("accessToken");
        sendAlert("logged out ^^");
      }
    },
  });

  //This UseEffect hits only on page reload
  useEffect(() => {
    fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const resultJson = await x.json();
      if (resultJson.accessToken) {
        localStorage.setItem("accessToken", resultJson.accessToken);
        //fetching ME query on every page reload if accessToken is present
        refetch();
      }
    });
    setIsLoading(false);
  }, [refetch]);

  const login = async (email: string, password: string) => {
    const result = await loginMutation({
      variables: { email, password },
    });
    result?.data?.login?.__typename === "LoginResponse" && refetch();
    return result.data;
  };

  const register = async (email: string, password: string) => {
    const result = await registerMutation({
      variables: { email, password },
      refetchQueries: [{ query: USERS_QUERY }],
    });
    return result.data;
  };

  const logout = async () => {
    const result = await logoutMutation();
    return result.data;
  };

  if (isLoading || loading) {
    return <p>Loading</p>;
  }

  return (
    <AuthContext.Provider
      value={{ data, register, login, logout }}
      {...props}
    />
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
