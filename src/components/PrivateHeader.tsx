import { Link, navigate, RouteComponentProps } from "@reach/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

const PrivateHeader: React.FC<RouteComponentProps> = () => {
  const { data, logout } = useAuth();

  let body: any = null;

  if (data?.me.__typename === "User") {
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
        {data?.me.__typename === "User" && (
          <button
            onClick={async () => {
              //gotta logout after unmount for safe exit.
              //login page will be not found due to suspended switch of app, so logic described at NotFound.tsx
              await logout();
              navigate("/login", { state: { action: "logout" } });
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
