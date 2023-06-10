import styled from "styled-components";
import thumbsup from "../../../../../../../assets/thumbsup.svg";
import { useContext } from "react";
import ModalsContext from "../../../../ModalsContext";

const Wrapper = styled.span`
  position: relative;
  top: -1.7rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  min-width: 70px;
`;

const Content = styled.span`
  margin: 0 8px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 12px;
  background-color: #eeeeee;
  padding: 1px 8px;
  border: 1px solid white;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 3px;

  &:before {
    display: inline-block;
    content: "";
    background-size: 100%;
    background-image: url(${thumbsup});
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
    position: relative;
    top: 2px;
    margin-right: 5px;
  }
  &:hover {
    border: 1px solid #aaaaaa;
  }
  &:hover + span {
    visibility: visible;
  }
`;

const PopupMenu = styled.span`
  visibility: hidden;
  cursor: pointer;
  color: white;
  background-color: #8d8d8d;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 5px;
  border: 1px solid white;
  transition-property: visibility;
  transition-duration: 2s;
  transition-delay: 1s;
  transition-timing-function: ease-in-out;
`;

const Reaction = ({ msgId, list, toggleReactionForCurrentMsg }) => {
  const {
    setReactionListDialogOpen,
    setReactionMsgId,
  } = useContext(ModalsContext);


  const openDialog = () => {
    setReactionMsgId(msgId);
    setReactionListDialogOpen(true);
  };

  return (
    <Wrapper>
      <Content onClick={toggleReactionForCurrentMsg}>
        <span>{list.length}</span>
      </Content>
      <PopupMenu onClick={openDialog}>VIEW LIST</PopupMenu>
    </Wrapper>
  );
};

export default Reaction;
