import styled from "styled-components";
import { Avatar } from "@mui/material";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../utils/letterAvatar";
import { useEffect } from "react";
import { getOrgInfo } from "../../../../../../api/api";
import { useState } from "react";

const LogoWrapper = styled.div`
  background-color: #680a83;
  height: 60px;
  padding: 0 20px;
  width: ${({ sidebarDrawer }) => (sidebarDrawer ? "80px" : "240px")};
  transition: all 0.2s ease-in-out;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const OrgLink = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const OrgName = styled.span`
  color: #ffffff;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: bold;
  display: ${({ sidebarDrawer }) => (sidebarDrawer ? "none" : "inline")};
`;

const Logo = ({ sidebarDrawer }) => {
  const [org, setOrg] = useState({ name: "" });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const currentOrg = sessionStorage.getItem("currentOrg");
    getOrgInfo(currentOrg).then(async (res) => {
      setOrg(await res.data.data.org);
    });
    setRefresh(true);
  }, []); 

  useEffect(() => {
    refresh && setRefresh(false);
  }, [refresh]);

  return (
    <LogoWrapper sidebarDrawer={sidebarDrawer}>
      <OrgLink href="./main">
        {org && (
          <>
            <Avatar
              alt={org.name}
              src={org.name}
              sx={[
                { bgcolor: stringToColor(org.name) },
                { width: 45, height: 45 },
                { fontSize: 25 },
              ]}
            >
              {getInitialLetter(org.name)}
            </Avatar>
            <OrgName sidebarDrawer={sidebarDrawer}>{org.name}</OrgName>
          </>
        )}
      </OrgLink>
    </LogoWrapper>
  );
};

export default Logo;
