import Loading from "../Loading";
import { getUserOrganizations } from "../../api/api";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const RequireOrganization = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userInOrganization, setUserInOrganization] = useState();
  const currentOrg = sessionStorage.getItem("currentOrg");

  getUserOrganizations()
    .then((res) => {
      const organizations = res.data.data;
      // organizations.length === 0
      //   ? setUserInOrganization(false)
      //   : setUserInOrganization(true);
      const orgs = [];
      if (organizations.length !== 0) {
        for (const org of organizations) {
          orgs.push(org._id.toString());
        }
      }
      if (orgs.length === 0 || !currentOrg || !orgs.includes(currentOrg)) {
        setUserInOrganization(false);
      } else {
        setUserInOrganization(true);
      }
    })
    .catch()
    .finally(() => setLoading(false));

  if (loading) return <Loading />;
  if (!userInOrganization) {
    return <Navigate to="/welcome"></Navigate>;
  }
  return children;
};

export default RequireOrganization;
