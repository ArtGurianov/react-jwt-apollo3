import React, { useContext } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { authContext } from "../App";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const ProtectedHeader: React.FC<RouteComponentProps> = ({ history }) => {
  const { setAuth } = useContext(authContext);
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
        <Link to="/protected">Protected page</Link>
      </div>
      <div>
        {!loading && data && data.me && (
          <button
            onClick={async () => {
              await logout();
              localStorage.removeItem("accessToken");
              await client!.resetStore();
              setAuth((prevState) => ({ ...prevState, isLoggedIn: false }));
              history.push("/login");
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

export default withRouter(ProtectedHeader);
