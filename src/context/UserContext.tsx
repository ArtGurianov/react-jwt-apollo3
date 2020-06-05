import React, { createContext } from "react";
import { User } from "../generated/graphql";
import { useAuth } from "./AuthContext";

const initialUserValue: User | null = null;

const UserContext = createContext(initialUserValue);

const UserProvider = (props: any) => {
  const { data } = useAuth();
  return (
    <UserContext.Provider
      value={data.me.__typename === "User" ? (data.me as User) : null}
      {...props}
    />
  );
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
