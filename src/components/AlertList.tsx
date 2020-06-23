import React, { useContext } from "react";
import { AlertContext } from "../context/AlertContext";
import useTimeout from "./../hooks/useTimeout";

const AlertList = () => {
  const { alertList, removeAlert } = useContext(AlertContext);
  const containerStyles: React.CSSProperties = {
    display: "flex",
    //flexFlow: "column",
    //flexWrap: "wrap",
    //justifyContent: "space-between",
    flexDirection: "column",
    //justifyContent: "center",
    //background: "yellow",
    position: "fixed",
    boxSizing: "border-box",
    bottom: "12px",
    right: "80px",
    width: "300px",
    height: "auto",
    maxHeight: "100%",
    zIndex: 1000,
  };
  return (
    <div style={containerStyles}>
      {alertList.map((alert) => {
        return (
          <AlertWrapper key={alert.id} active={alert.active} type={alert.type}>
            {alert.active && (
              <AlertTimer removeAlert={removeAlert} id={alert.id} />
            )}
            <p>{alert.text}</p>
          </AlertWrapper>
        );
      })}
    </div>
  );
};

type TimerProps = {
  id: string;
  removeAlert: (_: string) => void;
};

const AlertTimer = ({ removeAlert, id }: TimerProps) => {
  useTimeout(() => {
    removeAlert(id);
  }, 1000);
  return null;
};

type Props = {
  active: boolean;
  type: string;
};

const AlertWrapper: React.FC<Props> = ({ children, active, type }) => {
  const styles: React.CSSProperties = {
    display: "inline-block",
    flexGrow: active ? 1 : 0.00001,
    position: "relative",
    overflow: "hidden",
    background: type === "error" ? "#6a0dad" : "#008080",
    color: type === "error" ? "white" : "#6a0dad",
    width: "100%",
    textAlign: "center",
    opacity: active ? "1" : "0",
    pointerEvents: active ? "all" : "none",
    //transform: active ? "translate(100px, 0)" : "translate(0, 0)",
    padding: "30px",
    margin: "0 0 6px",
    marginBottom: "15px",
    transition: "all 2s ease-in-out",
    borderRadius: "5px",
    boxShadow: active
      ? "15px 24px 18px 6px rgba(0,0,0,0.6)"
      : "10px 16px 12px 4px rgba(0,0,0,0.3)",
  };

  return <div style={styles}>{children}</div>;
};

export default AlertList;
