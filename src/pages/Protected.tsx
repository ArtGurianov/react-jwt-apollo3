import React from "react";
import { useProtectedQuery } from "../generated/graphql";

export const Protected: React.FC = () => {
  const { loading, data, error } = useProtectedQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
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
