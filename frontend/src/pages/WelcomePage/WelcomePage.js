import { useState, useEffect } from "react";
import styled from "styled-components";
import { getInvitations } from "../../api/api";
import welcome from "../../assets/welcome.png";
import AcceptInvitation from "./AcceptInvitation/AcceptInvitation";
import CreateOrganization from "./CreateOrganization";
import Loading from "../../components/Loading";
import SwitchOrganizations from "./SwitchOrganizations";

const PageWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, #fbebe7, #5a078b);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  width: 768px;
  min-height: 768px;
  margin: 5rem;
  background-color: #fcfcfc;
  border-radius: 15px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #fcfcfc;
    border-radius: 0;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  /* width: 600px; */
  max-height: 400px;
  margin: 20px;
  overflow: hidden;
  /* background-image: url(${welcome});
  background-size: cover; */
  /* margin: auto; */
  /* align-self: center; */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #040404;
  text-align: center;
  padding: 0 0.2rem;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 0.5rem;
  } 

  @media screen and (max-width: 520px) {
    font-size: 2rem;
    margin-top: 0.5rem;
  } 
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
`;

const Tab = styled.button`
  margin: 0 1rem;
  background: transparent;
  width: 12rem;
  height: 4rem;
  border-radius: 20px 20px 0 0;
  font-size: 1.3rem;
  font-weight: bold;
  border: 1px solid #d9d9d9;
  border-bottom: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#5a078b" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#858585")};

  @media screen and (max-width: 768px) {
    margin: 0 0.75rem;
    width: 10rem;
  }

  @media screen and (max-width: 520px) {
    margin: 0 0.5rem;
    width: 8rem;
    height: 3rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 420px) {
    margin: 0 0.25rem;
    width: 6rem;
    height: 2rem;
    font-size: 0.75rem;
    border-radius: 10px 10px 0 0;
  }
`;

const Notification = styled.span`
  display: inline-block;
  min-width: 1.5rem;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #ff0404;
  margin-left: 10px;

  @media screen and (max-width: 520px) {
    min-width: 1.1rem;
    font-size: 0.9rem;
    margin-left: 5px;
  }

  @media screen and (max-width: 420px) {
    min-width: 0.8rem;
    font-size: 0.65rem;
    margin-left: 5px;
  }
`;

const ContentWrapper = styled.div`
  border-top: 1px solid #d9d9d9;
`;

const WelcomePage = () => {
  const [activeTab, setActiveTab] = useState("switch");
  const [invitations, setInvitations] = useState();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [notification, setNotification] = useState();

  useEffect(() => {
    getInvitations()
      .then((res) => {
        const { firstName, lastName, invitations } = res.data.data;
        setInvitations(invitations);
        setName(firstName + " " + lastName);
        setNotification(invitations.length);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (e) => {
    setActiveTab(e.target.id);
  };

  if (loading) return <Loading />;

  return (
    <PageWrapper>
      <CardWrapper>
        <ImageContainer>
          <Image alt="greeting" src={welcome} />
        </ImageContainer>
        <Title>Welcome, {name}</Title>
        <TabContainer>
          <Tab
            id="create"
            active={activeTab === "create"}
            onClick={handleClick}
          >
            CREATE
          </Tab>
          <Tab
            id="accept"
            active={activeTab === "accept"}
            onClick={handleClick}
          >
            ACCEPT
            {notification !== 0 && <Notification>{notification}</Notification>}
          </Tab>
          <Tab
            id="switch"
            active={activeTab === "switch"}
            onClick={handleClick}
          >
            SWITCH
          </Tab>
        </TabContainer>
        <ContentWrapper>
          {activeTab === "create" && <CreateOrganization />}
          {activeTab === "accept" && (
            <AcceptInvitation
              invitations={invitations}
              setInvitations={setInvitations}
              setNotification={setNotification}
              notification={notification}
            />
          )}
          {activeTab === "switch" && <SwitchOrganizations />}        
        </ContentWrapper>
      </CardWrapper>
    </PageWrapper>
  );
};

export default WelcomePage;
