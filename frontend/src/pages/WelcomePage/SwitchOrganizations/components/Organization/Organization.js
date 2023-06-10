import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../utils/letterAvatar";

const OrgContainer = styled.div`
  background-color: #f9f9f9;
  min-width: 300px;
  min-height: 50px;
  margin: 10px 20px;
  padding: 20px 30px;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  border-radius: 50px;
  box-shadow: 0px 4px 4px #f5f8ff;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #5a078b;
    /* border-left: 5px solid #ffa977; */
    cursor: pointer;

    div {
      color: #fff;
    }
  }

  @media screen and (max-width: 520px) {
    min-width: 270px;
    min-height: 30px;
    padding: 10px 20px;
  }
`;

const OrgName = styled.div`
  margin-left: 10px;
  color: #4b0973;
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 520px) {
    font-size: 1rem;
  }
`;

const Organization = ({ id, avatar, name }) => {
  const navigate = useNavigate();

  const onClickHandler = (e) => {
    sessionStorage.setItem("currentOrg", id);
    navigate("/main");
  };

  return (
    <OrgContainer onClick={onClickHandler}>
      <Avatar
        alt={name}
        src={avatar}
        sx={[
          {
            bgcolor: stringToColor(name),
          },
          {
            width: 35,
            height: 35,
            "@media screen and (max-width: 520px)": { width: 25, height: 25 },
          },
          {
            fontSize: 20,
            "@media screen and (max-width: 520px)": { fontSize: 14 },
          },
        ]}
      >
        {getInitialLetter(name)}
      </Avatar>
      <OrgName children={name} />
    </OrgContainer>
  );
};

export default Organization;
