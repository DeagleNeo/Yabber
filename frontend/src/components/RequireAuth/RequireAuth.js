import { useContext } from "react";
import { AuthenticationContext } from "../Authentication";
import { Navigate } from "react-router-dom";
import Loading from "../Loading";

const RequireAuth = ({ children }) => {
  const {loading, authenticated} = useContext(AuthenticationContext);

  if (loading) {
    return <Loading />;
  }
  if (!authenticated) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default RequireAuth;
