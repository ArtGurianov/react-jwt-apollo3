import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useAlert } from "../context/AlertContext";
import { useUsersQuery } from "../generated/graphql";

const Home: React.FC<RouteComponentProps> = () => {
  const { sendAlert, sendError } = useAlert();
  const { data, loading, error } = useUsersQuery({
    // onError: () => {
    //   alert("error");
    // },
    //fetchPolicy: "network-only",
  });

  if (!data || loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
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
