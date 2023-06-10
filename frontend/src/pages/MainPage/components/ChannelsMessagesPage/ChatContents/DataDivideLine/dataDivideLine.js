import styled from "styled-components";

const DivideLineStyle = styled.div`
  margin: 1rem 0;
  position: relative;
  text-align: center;
  width: 100%;
  font-size: 14px;
  text-align: center;
  ::before {
    content: "";
    left: 0;
    position: absolute;
    height: 1px;
    width: 100%;
    top: 50%;
    background-color: #eeeeee;
    overflow: hidden;
  }
`;

const MessageDate = styled.span`
  background-color: #eeeeee;
  color: #5a078b;
  font-size: 13px;
  padding: 4px 20px;
  border-radius: 3px;
  display: inline-block;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 600;
  position: relative;

  @media screen and (min-width: 800px) and (max-width: 960px) {
    font-size: 10px;
  }

  @media screen and (max-width: 560px) {
    font-size: 10px;
  }

  @media screen and (max-width: 420px) {
    font-size: 9px;
  }
`;

const DivideLine = ({ date }) => {
  const displayDate = (date) => {
    const today = Date.parse(new Date());
    const msgDate = Date.parse(date);
    const diffDate = Math.floor((today - msgDate) / (60 * 60 * 24 * 1000));
    return { 0: "Today", 1: "Yesterday" }[diffDate] || date;
  };

  return (
    <DivideLineStyle>
      <MessageDate> {displayDate(date)} </MessageDate>
    </DivideLineStyle>
  );
};

export default DivideLine;
