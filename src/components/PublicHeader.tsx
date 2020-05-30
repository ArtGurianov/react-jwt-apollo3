import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

const PublicHeader: React.FC<RouteComponentProps> = ({ history }) => {
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

export default withRouter(PublicHeader);
