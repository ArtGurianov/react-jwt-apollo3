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

const initialMeData = {
  me: {
    errors: [{ property: "auth", errorMessages: ["logged out"] }],
  },
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
    // CAUSES ENDLESS LOOP
    // onCompleted: (data) => {
    //   console.log("ME QUERY SUCCESSFUL AUTHCONTEXT");
    //   console.log(data);
    // },
    // onError: (e) => {
    //   console.log("ME QUERY THROWN FROM AUTH CONTEXT");
    //   console.log(e);
    // },
    errorPolicy: "ignore",
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
        refetch(); //WE RECEIVE USER OBJECT FROM LOGIN SO CAN JUST WRITEQUERY AT LOGIN
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

  const [logoutMutation, { client }] = useLogoutMutation({
    onError: (e: ApolloError) => {
      e.graphQLErrors.map((err) => sendError(err.message));
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
      // update: (cache, { data }) => {
      //   if (data?.login?.__typename === "LoginResponse") {
      //     cache.writeQuery<MeQuery>({
      //       //make sure that ME and LOGIN query return same fields. Apollo
      //       query: MeDocument,
      //       data: {
      //         me: (data.login as LoginResponse).user,
      //       },
      //     });
      //   }
      // },
    });
    return result?.data;
  };

  const register = async (email: string, password: string) => {
    const result = await registerMutation({ variables: { email, password } });
    return result?.data;
  };

  const logout = async () => {
    const result = await logoutMutation();
    localStorage.removeItem("accessToken");
    client!.clearStore();
    //refetch(); //me query refetching
    return result?.data;
  };

  if (isLoading || loading) {
    return <p>Loading</p>;
  }

  return (
    <AuthContext.Provider
      value={{ data, login, logout, register }}
      {...props}
    />
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
