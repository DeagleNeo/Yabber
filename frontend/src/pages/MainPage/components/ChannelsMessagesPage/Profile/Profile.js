import styled from "styled-components";
import * as React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import breakpoints from "../../../../../config/breakpoints";


const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
`;
const Panel = styled.div`
  position: relative;
  height: 100%;
  border: 1px solid #f4eeff;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  justify-content: flex-start;
  overflow: hidden;
  @media screen and (max-width: ${breakpoints.ml}) {
    width: 100vw;
  }
  @media screen and (min-width: ${breakpoints.ml}) {
    width: ${(props) => props.drawerWidth - 20}px;
  }
`;

const Profile = ({
  drawerWidth,
}) => {

  return (
    <Wrapper>
      <Panel drawerWidth={drawerWidth}>
        <ProfileHeader  />
        <ProfileContent />
      </Panel>
    </Wrapper>
  );
};

export default Profile;
