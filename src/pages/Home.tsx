import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useUsersQuery } from "../generated/graphql";

const Home: React.FC<RouteComponentProps> = () => {
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
    </div>
  );
};

export default Home;
