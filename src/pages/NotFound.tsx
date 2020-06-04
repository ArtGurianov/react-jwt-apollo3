import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";

export interface ExtendedRouteComponentProps
  extends RouteComponentProps<{
    location: { state: { action: string } };
  }> {}

const NotFound: React.FC<ExtendedRouteComponentProps> = (
  props: ExtendedRouteComponentProps
) => {
  const { logout } = useAuth();
  const { sendAlert } = useAlert();
  useEffect(() => {
    (async () => {
      if (props?.location?.state?.action === "logout") {
        await logout();
        sendAlert("Logged out ^^");
      }
    })();
  }, [props, logout, sendAlert]);

  return <div>Nothing here :(</div>;
};

export default NotFound;
