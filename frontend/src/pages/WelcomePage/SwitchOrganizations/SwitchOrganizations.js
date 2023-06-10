import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getUserOrganizations } from "../../../api/api";
import Organization from "./components/Organization";

const SwitchOrgWrapper = styled.div`
  margin: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const EmptyOrg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 1.7rem;
    color: #9c9393;
    margin: 1rem 2rem;

    @media screen and (max-width: 520px) {
      font-size: 1.3rem;
    }

    @media screen and (max-width: 420px) {
      font-size: 1.1rem;
    }
  }
`;

const SwitchOrganizations = () => {
  const [orgList, setOrgList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getUserOrganizations().then(async (res) => {
      setOrgList(await res.data.data);
    });
    setRefresh(true);
  }, []);

  useEffect(() => {
    refresh && setRefresh(false);
  }, [refresh]);

  return (
    <SwitchOrgWrapper>
      {
        orgList.length === 0 ? (
          <EmptyOrg><p>You haven't joined any organization yet.</p></EmptyOrg>
        ) : (
          orgList.map(({ _id, avatar, name }) => {
            return (
              <Organization key={_id} id={_id} avatar={avatar} name={name} />
            );
          })
        )
      }
    </SwitchOrgWrapper>
  );
};

export default SwitchOrganizations;
