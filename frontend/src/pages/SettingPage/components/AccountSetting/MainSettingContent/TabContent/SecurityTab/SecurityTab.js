import styled from "styled-components"
import { changePassword } from "../../../../../../../api/api";
import validator from "validator"
import useTouchedState from "../../../../../hooks/useTouchedState/useTouchedState";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
`
const Title = styled.div`
  padding: 15px;
  background: #F9F9F9;
  border-radius: 4px;
`
const H5 = styled.h5`
  color: #5A078B;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 7px;
  margin-top: 0;
  line-height: 1.2;
  margin: 0 0 7px;
`
const P = styled.p`
  color: #949494;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 0;
`
const Form = styled.form`
  padding: 20px;
`
const Label = styled.label`
  display: flex;
  font-weight: 600;
  color: #464646;
  margin: 12px 0 6px 0;

  &:first-child {
    margin-top: 0;
    }
`

const Input = styled.input`
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #EDE2FF;
  height: 49px;
  width: 80%;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  border-radius: 2px;
`
const Button = styled.button`
  background-color: #420BA1;
  border: 1px solid #420BA1;
  color: #fff;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  width: auto;
  display: inline-flex;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  margin-right: 15px;

  :hover {
    background-color: #fff;
    color: #420BA1;
  }

  &:disabled {
    cursor: not-allowed;
    :hover{
      background-color: #420BA1;
      color: #fff;
    }
  }
`

const CancelButton = styled.input`
  color: #B7B7B7; 
  font-size: 14px; 
  font-weight: 500; 
  border: none; 
  cursor: pointer; 
  background: none;
`

const ErrMessage = styled.p`
  color: red;
  margin: 0;
  padding: 0;
`

const SecurityTab = ({
  userInfo,
  setUserInfo,
  currentUser,
}) => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useTouchedState();
  const [newPassword, setNewPassword] = useTouchedState();
  const [confirmPassword, setConfirmPassword] = useTouchedState();
  const [updateErrorMessage, setUpdateErrorMessage] = useState("")
  const emptyCurrentPasswordError = validator.isEmpty(currentPassword.value) && 'Please input your current password'
  const emptyNewPasswordError = validator.isEmpty(newPassword.value) && 'Please input your  new password'
  const emptyRepeatPasswordError = validator.isEmpty(confirmPassword.value) && 'Please repeat your new password'
  const notMatchPasswordError = newPassword.value !== confirmPassword.value && 'Confirm password does not match to your new password'
  const samePasswordError = currentPassword.value === newPassword.value && 'New password is the same with current password'

  const updatePassword = () => {
    changePassword(currentPassword.value, newPassword.value).then((response) => {
      navigate("/login");
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("currentUser");
    }).catch((error) => {
      setUpdateErrorMessage("Invalid current password. Please try again.");
    })
  }
  useEffect(() => {
    setUpdateErrorMessage("");
  }, [currentPassword.value, newPassword.value, confirmPassword.value]);

  const clearState = () => {
    setNewPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
  }

  return (
    <Wrapper>
      <Title>
        <H5>Change your password</H5>
        <P>We will back to the login page after when changing your password.</P>
      </Title>
      <Form onSubmit={(e) => {
        e.preventDefault();
        updatePassword();
      }}>
        <ErrMessage>{updateErrorMessage}</ErrMessage>
        <Label forHTML="currentPassword">Current Password</Label>
        <Input
          type="password"
          value={currentPassword.value}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <ErrMessage>{currentPassword.touched && emptyCurrentPasswordError}</ErrMessage>
        <Label forHTML="newPassword">New Password</Label>
        <Input
          type="password"
          value={newPassword.value}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <ErrMessage>{newPassword.touched && (emptyNewPasswordError || samePasswordError)}</ErrMessage>
        <Label forHTML="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          value={confirmPassword.value}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <ErrMessage>{confirmPassword.touched && (emptyRepeatPasswordError || notMatchPasswordError)}</ErrMessage>

        <div style={{ marginTop: '20px' }}>
          <Button disabled={emptyCurrentPasswordError || emptyNewPasswordError || emptyRepeatPasswordError || notMatchPasswordError || samePasswordError} type="submit">Update Password</Button>
          <CancelButton type="reset" value="Cancel" onClick={clearState} />
        </div>
      </Form>
    </Wrapper>
  )
}
export default SecurityTab