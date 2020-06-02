import React, { useContext } from "react";
import { AlertContext } from "../utils/AlertContext";
import useTimeout from "./../hooks/useTimeout";

const Alert = () => {
  const { alert, resetAlert } = useContext(AlertContext);
  return (
    <AlertWrapper active={alert.active} type={alert.type}>
      {alert.active && <AlertTimer resetAlert={resetAlert} />}
      <p>{alert.text}</p>
    </AlertWrapper>
  );
};

type TimerProps = {
  resetAlert: () => void;
};

const AlertTimer = ({ resetAlert }: TimerProps) => {
  useTimeout(() => {
    resetAlert();
  }, 4000);
  return null;
};

type Props = {
  active: boolean;
  type: string;
};

const AlertWrapper: React.FC<Props> = ({ children, active, type }) => {
  const styles: React.CSSProperties = {
    position: "fixed",
    zIndex: 1000,
    background: type === "error" ? "#6a0dad" : "#008080",
    color: type === "error" ? "white" : "#6a0dad",
    width: "90%",
    top: "0",
    left: "50%",
    textAlign: "center",
    opacity: active ? "1" : "0",
    pointerEvents: active ? "all" : "none",
    transform: active
      ? "translate3d(-50%, 10px, 0)"
      : "translate3d(-50%, -100px, 0)",
    padding: "20px",
    margin: "0 auto",
    transition: "0.2s ease-out",
    borderRadius: "5px",
    boxShadow: active
      ? "15px 24px 18px 6px rgba(0,0,0,0.6)"
      : "10px 16px 12px 4px rgba(0,0,0,0.3)",
  };

  return <div style={styles}>{children}</div>;
};

export default Alert;
