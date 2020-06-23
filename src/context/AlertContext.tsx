import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Alert = {
  id: string;
  text: string;
  type: string;
  active: boolean;
};

interface AlertInterface {
  alertList: Alert[];
  setAlertList: Dispatch<SetStateAction<Alert[]>>;
  sendAlert: (_: string) => void;
  sendError: (_: string) => void;
  removeAlert: (_: string) => void;
}

const initialAlertValue: AlertInterface = {
  alertList: [],
  setAlertList: () => {},
  sendAlert: (_: string) => {},
  sendError: (_: string) => {},
  removeAlert: (_: string) => {},
};

export const AlertContext = createContext(initialAlertValue);

export const AlertProvider: React.FC = ({ children }) => {
  const [alertList, setAlertList] = useState<Alert[]>([]);

  const removeAlert = (id: string) => {
    setAlertList((prevState) => {
      return prevState.filter((alert) => {
        return alert.id !== id;
      });
    });
  };

  const sendAlert = async (text: string) => {
    setAlertList((prevState) => {
      const newId = prevState.length
        ? parseInt(prevState.slice(-1)[0].id) + 1
        : 1;
      return [
        ...prevState,
        { id: newId.toString(), text, type: "success", active: true },
      ];
    });
  };

  const sendError = async (text: string) => {
    setAlertList((prevState) => {
      const newId = prevState.length
        ? parseInt(prevState.slice(-1)[0].id) + 1
        : 1;
      return [
        ...prevState,
        { id: newId.toString(), text, type: "error", active: true },
      ];
    });
  };

  return (
    <AlertContext.Provider
      value={{ alertList, setAlertList, sendAlert, sendError, removeAlert }}
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
