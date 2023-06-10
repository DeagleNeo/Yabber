import styled from "styled-components"

const UserMenuLinkWrapper = styled.a`
  color: #fff;
  font-size: 14px;
  line-height: 58px;
  padding: 0 15px;
  height: 60px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${({show}) => show ? "rgba(0, 0, 0, 0.2)" : "transparent"};

  :hover, :focus {
    background-color: rgba(0, 0, 0, 0.2);
    outline: none;
    text-decoration: none;
  }

  ::after {
    border-top: 0;
    border-left: 0;
    border-bottom: 2px solid #680a83;
    border-right: 2px solid #680a83;
    content: '';
    height: 8px;
    display: inline-block;
    pointer-events: none;
    transition: all 0.15s ease-in-out;
    width: 8px;
    vertical-align: 2px;
    transform: ${({show}) => show ? "rotate(-135deg)" : "rotate(45deg)"};
  }
`;

const UserAvatar = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  margin-right: 7px;
  border-radius: 10px;
  overflow: hidden;
  /* display: flex;
  align-items: center; */
`;

const UserMenuLink = ({show, setShow}) => {
  const onClickHandler = (event) => {
    event.preventDefault();
    setShow((prev) => !prev);
  }

  return (
    <UserMenuLinkWrapper show={show} onClick={onClickHandler}>
      <UserAvatar>
        <img alt="user avatar" src="https://dreamschat.dreamguystech.com/template/admin-template/assets/img/profiles/avatar-01.jpg" width="35px" />
      </UserAvatar>
    </UserMenuLinkWrapper>
  )
}

export default UserMenuLink;