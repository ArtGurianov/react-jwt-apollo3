import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Alert = {
  text: string;
  type: string;
  active: boolean;
};

interface AlertInterface {
  alert: Alert;
  setAlert: Dispatch<
    SetStateAction<{ text: string; type: string; active: boolean }>
  >;
  sendAlert: (_: string) => void;
  sendError: (_: string) => void;
  resetAlert: () => void;
}

const initialAlertValue: AlertInterface = {
  alert: {
    text: "",
    type: "success",
    active: false,
  },
  setAlert: () => {},
  sendAlert: (_: string) => {},
  sendError: (_: string) => {},
  resetAlert: () => {},
};

export const AlertContext = createContext(initialAlertValue);

export const AlertProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState({
    text: "",
    type: "success",
    active: false,
  });
  const resetAlert = () => {
    setAlert({ text: "", type: "success", active: false });
  };
  const sendAlert = (text: string) => {
    setAlert({ text, type: "success", active: true });
  };
  const sendError = (text: string) => {
    setAlert({ text, type: "error", active: true });
  };

  return (
    <AlertContext.Provider
      value={{ alert, setAlert, sendAlert, sendError, resetAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const allAlert = useContext(AlertContext);
  return {
    ...allAlert,
  };
};
