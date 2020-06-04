import { useApolloClient } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { USERS_QUERY } from "../graphql/users";

const Home: React.FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState([] as any);
  const client = useApolloClient();
  client.query({ query: USERS_QUERY }).then((result) => {
    setUsers(result.data?.users);
  });
  if (users.length) {
    return (
      <div>
        <div>users:</div>
        <ul>
          {users.map((user: any) => {
            return (
              <li key={user.id}>
                {user.email}, {user.id}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else return <div>No users so far :( Wanna be the first one?</div>;
};

export default Home;
