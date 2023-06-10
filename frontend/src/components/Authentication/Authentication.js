import React from "react";
import { verifyToken } from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";

const AuthenticationContext = React.createContext();

const AuthenticationProvider = ({ children }) => {
  const token =
    sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  const [loading, setLoading] = useState(!!token);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    verifyToken()
      .then((res) => {
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log(new Error("Authentication"));
        setAuthenticated(false);
      })
      .finally(() => setLoading(false))
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ loading, authenticated, setAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
