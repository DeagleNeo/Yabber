import TabContentWrapper from "../components/TabContentWrapper";
import SubTitle from "../components/Subtitle/Subtitle";
import InvitationDisplay from "./InvitationDisplay/InvitationDisplay";
import { useEffect } from "react";

const AcceptInvitation = ({ invitations, setInvitations, setNotification }) => {
  useEffect(() => {
    setNotification(0);
  }, [setNotification]);
  const fullInvitationList = invitations.map(({ name, description, _id }) => {
    return (
      <InvitationDisplay
        key={_id}
        name={name}
        description={description}
        orgId={_id}
        setInvitations={setInvitations}
      />
    );
  });

  return (
    <TabContentWrapper>
      <SubTitle>
        {invitations.length === 0
          ? "Wait for your colleagues to send invitation"
          : ""}
      </SubTitle>
      {fullInvitationList}
    </TabContentWrapper>
  );
};

export default AcceptInvitation;
