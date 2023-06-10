import styled from "styled-components";
import react from "../../../../../../../../assets/react.png";
import html from "../../../../../../../../assets/html.png";
import css from "../../../../../../../../assets/css.png";
import js from "../../../../../../../../assets/js.png";
import styled_components from "../../../../../../../../assets/styled-components.png";
import mui from "../../../../../../../../assets/mui.png";
import axios from "../../../../../../../../assets/axios.png";
import formik from "../../../../../../../../assets/formik.png";
import nodejs from "../../../../../../../../assets/nodejs.png";
import express from "../../../../../../../../assets/express.png";
import mongodb from "../../../../../../../../assets/mongodb.png";
import socketIo from "../../../../../../../../assets/socket.io.png";

const TechIconsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TechIconItem = styled.img`
  margin: 2.5rem;
  width: 8rem;
  height: 8rem;
  @media screen and (max-width: 1200px) {
    width: 7rem;
    height: 7rem;
  }
  @media screen and (max-width: 768px) {
    margin: 1.5rem;
    width: 6.5rem;
    height: 6.5rem;
  }
  @media screen and (max-width: 540px) {
    margin: 1rem;
    width: 5rem;
    height: 5rem;
  }
  @media screen and (max-width: 414px) {
    margin: 1rem;
    width: 4.5rem;
    height: 4.5rem;
  }
`;

const TechIcons = () => {
  return (
    <TechIconsGroup>
      <TechIconItem src={react} />
      <TechIconItem src={html} />
      <TechIconItem src={css} />
      <TechIconItem src={js} />
      <TechIconItem src={styled_components} />
      <TechIconItem src={mui} />
      <TechIconItem src={axios} />
      <TechIconItem src={formik} />
      <TechIconItem src={nodejs} />
      <TechIconItem src={express} />
      <TechIconItem src={mongodb} />
      <TechIconItem src={socketIo} />
    </TechIconsGroup>
  );
};

export default TechIcons;
