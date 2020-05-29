import React from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export const Header: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null; //from Ben if there is 3 or more states

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
        <Link to="/register">Register page</Link>
      </div>
      <div>
        <Link to="/login">Login page</Link>
      </div>
      <div>
        <Link to="/protected">Protected page</Link>
      </div>
      <div>
        {!loading && data && data.me && (
          <button
            onClick={async () => {
              await logout();
              setAccessToken("");
              await client!.resetStore();
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
