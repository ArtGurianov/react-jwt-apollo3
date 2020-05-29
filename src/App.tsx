import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./tokenStore";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return <Routes />;
};
