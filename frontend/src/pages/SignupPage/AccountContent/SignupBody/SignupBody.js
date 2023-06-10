import { useState, useEffect } from "react";
import Intro from "../../../../components/SignInSignUp/Intro";
import InputElement from "../../../../components/SignInSignUp/InputElement/InputElement";
import SubmitButton from "../../../../components/SignInSignUp/SubmitButton";
import Prompt from "../../../../components/SignInSignUp/Prompt";
import FullWidthElementContainer from "../../../../components/SignInSignUp/FullWidthElementContainer";
import RedirectLink from "../../../../components/SignInSignUp/RedirectLink";
import styled from "styled-components";
import { register, isEmailAvailable } from "../../../../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../../../components/Authentication";

const SignupBodyWrapper = styled.div`
  position: relative;
  top: -25px;
`;

const SignupBody = () => {
  const navigate = useNavigate();
  const authentication = useContext(AuthenticationContext);


  const [buttonText, setButtonText] = useState("Create Account");
  const [enableButton, setEnabledButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    firstName: "none",
    lastName: "none",
    email: "none",
    password: "none",
    confirmPassword: "none",
  });

  const handleInput = (e) => {
    setErrorMessage("");
    setButtonText("Create Account");
    setEnabledButton(true);
    const element = e.target.id;
    setInputValue({ ...inputValue, [element]: e.target.value });
    setValidation({ ...validation, [element]: "none" }); // when user is inputing, do not validate
  };

  const generalInputValidation = (e) => {
    const element = e.target.id;
    if (e.target.value === "") {
      return setValidation({ ...validation, [element]: "fail" });
    }
    return setValidation({ ...validation, [element]: "success" });
  };

  const validateEmail = () => {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const isValidEmail =
      inputValue.email.search(emailRegex) === -1 ? false : true;
    if (!isValidEmail) {
      setValidation({ ...validation, email: "fail" });
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    //verifying if email has been registered
    setValidation((prev) => {
      return { ...prev, email: "verifying" };
    });
    isEmailAvailable(inputValue.email)
      .then((response) => {
        if (response.status === 200) {
          setValidation((prev) => {
            return { ...prev, email: "success" };
          });
        }
      })
      .catch((error) => {
        setValidation((prev) => {
          return { ...prev, email: "fail" };
        });
        if (error.response.status === 409) {
          return setErrorMessage("Email already registered.");
        }
        return setErrorMessage("Cannot verify this email.");
      });
  };

  // validate repeat password when user inputs
  useEffect(() => {
    if (inputValue.confirmPassword === "") return;

    if (inputValue.password !== inputValue.confirmPassword) {
      return setValidation((prev) => {
        return { ...prev, confirmPassword: "fail" };
      });
    }

    setValidation((prev) => {
      return { ...prev, confirmPassword: "success" };
    });
  }, [inputValue.confirmPassword, inputValue.password]);

  const submitSignup = () => {
    const validationValues = Object.values(validation);
    if (!validationValues.every((value) => value === "success")) {
      setButtonText("Please signup with valid information");
      setErrorMessage("Please signup with valid information");
      setEnabledButton(false);
      return;
    }

    setButtonText("Creating Account...");
    const { email, password, firstName, lastName } = inputValue;
    register(email, password, firstName, lastName)
      .then((response) => {
        if (response.status === 201) {
          sessionStorage.setItem("authToken", response.data.data.token);
          sessionStorage.setItem("currentUser",JSON.stringify(response.data.data.user))
          authentication.setAuthenticated(true);
          // navigate("/main");
          navigate("/welcome");
        }
      })
      .catch((error) => {
        console.log(new Error("Cannot create user"));
        setErrorMessage("cannot create account now. Please try again later.");
      })
      .finally(() => setButtonText("Create Account"));
  };

  useEffect(() => {
    if (!errorMessage) return;
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
    });
  }, [errorMessage]);

  const elementList = [
    {
      id: "firstName",
      label: "First Name",
      onChange: handleInput,
      value: inputValue.firstName,
      icon: validation.firstName,
      required: true,
      onBlur: generalInputValidation,
    },
    {
      id: "lastName",
      label: "Last Name",
      onChange: handleInput,
      value: inputValue.lastName,
      icon: validation.lastName,
      required: true,
      onBlur: (e) => generalInputValidation(e),
    },
    {
      id: "email",
      label: "Email",
      onChange: handleInput,
      value: inputValue.email,
      required: true,
      type: "email",
      icon: validation.email,
      onBlur: () => validateEmail(),
    },
    {
      id: "password",
      label: "Password",
      onChange: handleInput,
      value: inputValue.password,
      required: true,
      type: "password",
      icon: validation.password,
      onBlur: generalInputValidation,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      onChange: handleInput,
      value: inputValue.confirmPassword,
      required: true,
      type: "password",
      icon: validation.confirmPassword,
    },
  ];

  const signupInputElements = elementList.map(
    ({
      id,
      label,
      onChange,
      value,
      required,
      type,
      onBlur,
      forwardRef,
      icon,
    }) => {
      return (
        <InputElement
          key={id}
          id={id}
          label={label}
          onChange={onChange}
          value={value}
          required={required}
          type={type}
          onBlur={onBlur}
          forwardRef={forwardRef}
          icon={icon}
        />
      );
    }
  );

  return (
    <SignupBodyWrapper>
      <Intro
        title="Sign up"
        content="Let's get you all setup so you can experience all the amazing features of Yabber."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSignup();
        }}
      >
        {signupInputElements}

        <SubmitButton disabled={!enableButton} text={buttonText} />
      </form>

      <FullWidthElementContainer>
        <Prompt>Already have an Account? &nbsp;</Prompt>
        <RedirectLink href="/login">Login</RedirectLink>
      </FullWidthElementContainer>
      <ToastContainer />
    </SignupBodyWrapper>
  );
};

export default SignupBody;
