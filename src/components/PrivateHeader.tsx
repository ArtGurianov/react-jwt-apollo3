import { ApolloError } from "@apollo/client";
import { Link, navigate, RouteComponentProps } from "@reach/router";
import React, { useContext } from "react";
import { authContext } from "../App";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const PrivateHeader: React.FC<RouteComponentProps> = () => {
  const { setAuth } = useContext(authContext);
  const { data, loading } = useMeQuery({
    onError: (e: ApolloError) => {
      e.graphQLErrors.map((err) => console.log(err.message));
    },
  });
  const [logout, { client }] = useLogoutMutation({
    onError: (e: ApolloError) => {
      e.graphQLErrors.map((err) => console.log(err.message));
    },
    onCompleted: () => {},
  });

  let body: any = null;

  if (loading) {
    body = <div>loading...</div>;
  } else if (data && data.me) {
    body = <div>You are logged in as: {data.me.email} </div>;
  } else {
    body = <div>Not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/protected">Protected page</Link>
      </div>
      <div>
        {!loading && data && data.me && (
          <button
            onClick={async () => {
              await logout();
              localStorage.removeItem("accessToken");
              //Clearing store here would be BAD because there is watched ME query. Better solution is to navigate away, then clear store.
              await client!.clearStore();
              setAuth((prevState) => ({ ...prevState, isLoggedIn: false }));
              navigate("/login");
            }}
          >
            logout
          </button>
        )}
      </div>
      {body}
    </header>
  );
};

export default PrivateHeader;
