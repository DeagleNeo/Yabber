import styled from "styled-components";

const UserHeaderWrapper = styled.div`
  background-color: #f4eef6;
  display: flex;
  padding: 10px 15px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  border-radius: 10px;
  overflow: hidden;
`;

const UserText = styled.div`
  margin-left: 5px;
`;

const UserName = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const UserRole = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #757575;
`;

const UserHeader = () => {
  return (
    <UserHeaderWrapper>
    <UserAvatar>
      <img alt="user avatar" src="https://dreamschat.dreamguystech.com/template/admin-template/assets/img/profiles/avatar-01.jpg" width="40px" />
    </UserAvatar>
    <UserText>
      <UserName>User Name</UserName>
      <UserRole>Administrator</UserRole>
    </UserText>
    </UserHeaderWrapper>
  )
}

export default UserHeader;