import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Auth = {
  isLoggedIn: boolean;
};

interface AuthInterface {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<{ isLoggedIn: boolean }>>;
}

export const initialAuthValue: AuthInterface = {
  auth: {
    isLoggedIn: false,
  },
  setAuth: () => {},
};

export const AuthContext = createContext(initialAuthValue);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const allAuth = useContext(AuthContext);
  return {
    ...allAuth,
  };
};
