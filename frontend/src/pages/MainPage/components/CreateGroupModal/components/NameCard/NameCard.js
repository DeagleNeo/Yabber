import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getInitialLetter } from "../../../../../../utils/letterAvatar";
import AvatarWithStatus from "../../../AvatarWithStatus";

const CardContainer = styled.div`
  width: 100%;
  padding: 14px;
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  box-shadow: 0px 4px 4px #f5f8ff;
  margin-bottom: 4px;
  &:hover{
    background-color: #fafbff;
  }
`;

const NameEmailContainer = styled.div`
  margin-right: auto;
  padding-left: 20px;
`;

const Name = styled.div`
  color: #4b0973;
  font-weight: 600;
`;
const Email = styled.div`
  color: grey;
`;

const NameCard = ({
  name,
  email,
  id,
  avatar,
  selectUser,
  selectedUsers,
  status,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(() => selectedUsers.find((user) => user === id));
  }, [selectedUsers, id]);

  const handleClick = () => {
    selectUser(id);
  };

  const handleChange = () => {};
  //checkbox status is determined by the selectedUser array, this empty function
  // is to avoid the annoying console warning

  return (
    <CardContainer onClick={handleClick}>
      <AvatarWithStatus name={name} avatar={avatar} status={status}>
        {getInitialLetter(name)}
      </AvatarWithStatus>
      <NameEmailContainer>
        <Name children={name} />
        <Email children={email} />
      </NameEmailContainer>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={handleChange}
        style={{width:"20px",height:"20px"}}
      />
    </CardContainer>
  );
};

export default NameCard;
