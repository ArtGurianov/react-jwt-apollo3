import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useProtectedQuery } from "../generated/graphql";

//terrorizing server even at trying to normally reach endpoint
//WITHOUT onError. it just crashed and stopped
//WITH onError. it keeps reloading
//onError prevents throwing
const ProtectedPage: React.FC<RouteComponentProps> = () => {
  const { loading, data, error } = useProtectedQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return (
      <div>
        {error.graphQLErrors.map((e, index) => {
          return <div key={index}>{e.message}</div>;
        })}
      </div>
    );
  }
  if (!data) {
    return null;
  }
  return (
    <div>
      <div>protected GQL endpoint:</div>
      <div>{data.protectedGqlEndpoint}</div>
    </div>
  );
};

export default ProtectedPage;
