import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

export interface ExtendedRouteComponentProps
  extends RouteComponentProps<{
    location: { state: { action: string } };
  }> {}

const NotFound: React.FC<ExtendedRouteComponentProps> = (
  props: ExtendedRouteComponentProps
) => {
  const { logout } = useAuth();

  if (props?.location?.state?.action === "logout") {
    logout();
    props.location.state.action = "";
  }

  // useEffect(() => {
  //   (async () => {
  //     if (props?.location?.state?.action === "logout") {
  //       await logout();
  //       props.location.state.action = "";
  //     }
  //   })();
  // }, [props, logout]);

  return <div>Nothing here :(</div>;
};

export default NotFound;
