import React, { createContext } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

const UserProvider = (props: any) => {
  const { data } = useAuth();
  return (
    <UserContext.Provider
      value={data.me.__typename === "User" ? data : null}
      {...props}
    />
  );
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
