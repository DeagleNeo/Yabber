import { useState, useEffect } from "react";
import Intro from "../../../../components/SignInSignUp/Intro";
import InputElement from "../../../../components/SignInSignUp/InputElement/InputElement";
import SubmitButton from "../../../../components/SignInSignUp/SubmitButton";
import Checkbox from "../../../../components/SignInSignUp/Checkbox";
import Prompt from "../../../../components/SignInSignUp/Prompt";
import FullWidthElementContainer from "../../../../components/SignInSignUp/FullWidthElementContainer";
import RedirectLink from "../../../../components/SignInSignUp/RedirectLink";
import ErrorMessage from "../../../../components/SignInSignUp/ErrorMessage";
import styled from "styled-components";
import { login } from "../../../../api/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../../../components/Authentication";

const LoginBodyWrapper = styled.div`
  position: relative;
`;

const LoginBody = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const navigate = useNavigate();
  const authentication = useContext(AuthenticationContext);

  const submitLogin = () => {
    setButtonText("Verifying...");

    login(email, password, keepLogin)
      .then((response) => {
        authentication.setAuthenticated(true);
        // navigate("/main");
        navigate("/welcome");
        if (keepLogin) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(response.data.data.user)
          );
          return localStorage.setItem("authToken", response.data.data.token);
        }
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(response.data.data.user)
        );
        return sessionStorage.setItem("authToken", response.data.data.token);
      })
      .catch((error) => {
        console.log(new Error("Cannot login"));
        return setErrorMessage("invalid email or password");
      })
      .finally(() => setButtonText("Login"));
  };

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, keepLogin]);

  return (
    <LoginBodyWrapper>
      <Intro
        title="Log in"
        content="Login with the email you used for registration."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitLogin();
          setEmail("");
          setPassword("");
        }}
      >
        <InputElement
          id="email"
          label="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <InputElement
          id="password"
          label="Password"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Checkbox
          text="Keep me logged in"
          onChange={(e) => setKeepLogin(e.target.checked)}
          checked={keepLogin}
        />
        <SubmitButton text={buttonText} />
      </form>

      <FullWidthElementContainer>
        <Prompt>Don't have an account? &nbsp;</Prompt>
        <RedirectLink href="/signup">Signup</RedirectLink>
      </FullWidthElementContainer>

      <FullWidthElementContainer>
        <RedirectLink href="/forget">Forgot Password?</RedirectLink>
      </FullWidthElementContainer>

      <FullWidthElementContainer>
        <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      </FullWidthElementContainer>
    </LoginBodyWrapper>
  );
};

export default LoginBody;
