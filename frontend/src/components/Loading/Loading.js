import styled, { keyframes } from "styled-components";

const dotsize = "20px";
const LoaderWidth = "250px";

const Conatiner = styled.div`
  height: 100vh;
  width: 100vw;
`;

const loader = keyframes`
    15% {transform: translateX(0)}
    45% {transform: translateX( calc(${LoaderWidth} - ${dotsize} ))}
    65% {transform: translateX( calc(${LoaderWidth} - ${dotsize} ))}
    95% {transform: translateX(0)}

`;

const Loader = styled.div`
  height: ${dotsize};
  width: ${LoaderWidth};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Dot = styled.div`
  animation: ${loader};
  animation-timing-function: ease-in-out;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  height: ${dotsize};
  width: ${dotsize};
  border-radius: 100%;
  background-color: black;
  position: absolute;
  border: 2px solid white;

  &:first-child {
    background-color: #8cc759;
    animation-delay: 0.5s;
  }

  &:nth-child(2) {
    background-color: #8c6daf;
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    background-color: #ef5d74;
    animation-delay: 0.3s;
  }

  &:nth-child(4) {
    background-color: #f9a74b;
    animation-delay: 0.2s;
  }

  &:nth-child(5) {
    background-color: #60beeb;
    animation-delay: 0.1s;
  }

  &:nth-child(6) {
    background-color: #fbef5a;
    animation-delay: 0s;
  }
`;

const loadingText = keyframes`
    0% {content:"Loading"}
    25% {content:"Loading."}
    50% {content:"Loading.."}
    75% {content:"Loading..."}
    `;

const Text = styled.div`
  position: absolute;
  top: 200%;
  left: 0;
  right: 0;
  width: 4rem;
  margin: auto;

  &:after {
    content: "Loading";
    font-weight: bold;
    animation-name: ${loadingText};
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }
`;

const Loading = () => {
  return (
    <Conatiner>
      <Loader>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Text />
      </Loader>
    </Conatiner>
  );
};

export default Loading;
