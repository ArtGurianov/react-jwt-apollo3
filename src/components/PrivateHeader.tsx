import { Link, navigate, RouteComponentProps } from "@reach/router";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { User } from "../generated/graphql";

const PrivateHeader: React.FC<RouteComponentProps> = () => {
  const user: User | null = useUser();
  const { logout } = useAuth();

  if (!user) {
    navigate("/login");
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
      </div>
      <div>You are logged in as: {user!.email}</div>
    </header>
  );
};

export default PrivateHeader;
