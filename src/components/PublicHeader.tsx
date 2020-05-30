import { Link, RouteComponentProps } from "@reach/router";
import React from "react";

const PublicHeader: React.FC<RouteComponentProps> = () => {
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
    </header>
  );
};

export default PublicHeader;
