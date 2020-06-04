import { useApolloClient } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { PROTECTED_QUERY } from "../graphql/protected";

const ProtectedPage: React.FC<RouteComponentProps> = () => {
  const [content, setContent] = useState("");
  const client = useApolloClient();
  client.query({ query: PROTECTED_QUERY }).then((result) => {
    setContent(result.data?.protectedGqlEndpoint);
  });

  if (content.length) {
    return (
      <div>
        <div>got protected message for ya:</div>
        <div>{content}</div>
      </div>
    );
  } else
    return (
      <div>can't read that protected data. Maybe too much of protection ^^</div>
    );
};

export default ProtectedPage;
