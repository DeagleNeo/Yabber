import styled from "styled-components";
import breakpoints from "../../../config/breakpoints";

const Image = styled.div`
  width: 60%;
  background-image: url(${({ src }) => src});
  background-color: #4b0973;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;

  @media only screen and (max-width: ${breakpoints.large}) {
    width: 50%;
  }

  @media only screen and (max-width: ${breakpoints.medium}) {
    display: none;
    margin-bottom: 40px;
  }
`;

export default Image;
