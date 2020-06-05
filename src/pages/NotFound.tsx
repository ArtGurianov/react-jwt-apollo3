import { useApolloClient } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export interface ExtendedRouteComponentProps
  extends RouteComponentProps<{
    location: { state: { action: string } };
  }> {}

const NotFound: React.FC<ExtendedRouteComponentProps> = (
  props: ExtendedRouteComponentProps
) => {
  //const { logout } = useAuth();
  const client = useApolloClient();

  if (props?.location?.state?.action === "logout") {
    client.resetStore();
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
