import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useUsersQuery } from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";

const Home: React.FC<RouteComponentProps> = () => {
  const { sendAlert, sendError } = useAlert();
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>users:</div>
      <ul>
        {data?.users.map((x) => {
          return (
            <li key={x.id}>
              {x.email}, {x.id}
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          sendAlert("ALERT MESSAGE HERE");
        }}
      >
        Alert!
      </button>
      <button
        onClick={() => {
          sendError("ERROR MESSAGE HERE");
        }}
      >
        Error!
      </button>
    </div>
  );
};

export default Home;
