import styled from "styled-components";
import { useFormik } from "formik";
import { updateUserInfo } from "../../../../../../../api/api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";
import { PickerOverlay } from "filestack-react";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import timezone from "../../../../../../../assets/timezone.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
`;
const Title = styled.div`
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
`;
const H5 = styled.h5`
  color: #5a078b;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 7px;
  margin-top: 0;
  line-height: 1.2;
  margin: 0 0 7px;
`;
const P = styled.p`
  color: #949494;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 0;
`;

const Form = styled.form`
  padding: 20px;
  display: grid;
  grid-column-gap: 10px;
  @media (max-width: 380px) {
    padding: 10px;
  }
`;

const FormElementContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;
const FormElement = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledElement = styled.div`
  display: grid;
  grid-column-gap: 10px;
  /* @media (min-width: 992px) { */
  @media (min-width: 1050px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #464646;
  padding: 0 1px;
  margin: 0 0 6px;
`;

const AvatarContainer = styled.div`
  @media (min-width: 1200px) {
    margin-left: 100px;
  }
  @media (min-width: 1050px) {
    margin-left: 60px;
  }
  margin: 0;
`;
const AvatarDisplay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1050px) {
    flex-direction: row;
    gap: 20px;
    margin-top: 10px;
  }
  & img {
    border-radius: 50%;
    width: 160px;
    height: 160px;
  }
  & div {
    color: #666666;
    font-weight: bold;
    border: 3px dotted #666666;
    padding: 70px 35px;
  }
`;
const Input = styled.input`
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ede2ff;
  height: 49px;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  border-radius: 2px;
  margin: 0 0 18px;
`;

const Select = styled.select`
  height: 49px;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ede2ff;
  border-radius: 2px;
  margin: 0 0 18px;
  @media (max-width: 480px) {
    width: 350px;
  }
`;

const UploadLabel = styled.label`
  cursor: pointer;
  align-self: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  margin-top: 10px;
  display: flex;
  gap: 5px;
  border: 1px solid #420ba1;
  border-radius: 8px;
  background-color: #420ba1;
  color: #fff;
  padding: 10px 12px;
  @media (max-width: 1050px) {
    margin-top: 0;
    align-self: flex-start;
  }
  :hover {
    background-color: #fff;
    color: #420ba1;
  }
`;

const ButtonWrap = styled.div`
  grid-column-start: 1;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background-color: #420ba1;
  border: 1px solid #420ba1;
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
    color: #420ba1;
  }
`;

const CancelButton = styled.button`
  color: #b7b7b7;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background: none;
`;
const ImagePiker = styled.div``;

const timez = new Date().getTimezoneOffset()/(-60) + ''

const localTimeZoneIndex = timezone.findIndex(ele => ele.value === timez)

const GeneralSettingsTab = ({ userInfo, setUserInfo, currentUser }) => {
  const [isPicker, setIsPicker] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (image !== "") {
      formik.values.avatar = image && image.filesUploaded[0].url;
    }
  });

  const formik = useFormik({
    initialValues: {
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      avatar: userInfo.avatar,
      department: userInfo.department,
      jobTitle: userInfo.jobTitle,
      timezone: userInfo.timezone || localTimeZoneIndex,
      city: userInfo.city,
      country: userInfo.country,
    },
    onSubmit: (values) => {
      const userUpdate = {
        email: values.email,
        firstName: values.firstName.replace(/\s+/g, ""),
        lastName: values.lastName.replace(/\s+/g, ""),
        avatar: values.avatar,
        department: values.department,
        jobTitle: values.jobTitle,
        // timezone: timezone[values.timezone].value,
        timezone: values.timezone,
        city: values.city,
        country: values.country,
      };
      // setUserInfo(userUpdate)
      // console.log(userInfo.timezone);
      updateUserInfo(userUpdate).then(async (response) => {
        // localStorage.setItem("currentUser", JSON.stringify(response.data.data.user));
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(response.data.data.user)
        );
        setUserInfo(await response.data.data.user);
      });

      toast.success("Update Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        hideProgressBa: true,
        progress: undefined,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    },
  });

  return (
    <Wrapper>
      <Title>
        <H5>Account Settings</H5>
        <P>Update your avatar and personal details</P>
      </Title>
      <Form onSubmit={formik.handleSubmit}>
        <FormElementContainer>
          <FormElement>
            <StyledElement>
              <Item>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </Item>

              <Item>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </Item>
              <Item>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Item>
            </StyledElement>
            <StyledElement>
              <Item>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                />
              </Item>
              <Item>
                <Label htmlFor="jobTitle">Position</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                />
              </Item>
              <Item>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </Item>
              <Item>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                />
              </Item>
            </StyledElement>
            <Item>
              <Label htmlFor="timezone">Time Zone</Label>
              {/* <Input
            id="timezone"
            name="timezone"
            type="text"
            value={formik.values.timezone}
            onChange={formik.handleChange}
          /> */}
              <Select
                name="timezone"
                id="timezone"
                value={formik.values.timezone}
                onChange={formik.handleChange}
              >
                {timezone.map((zone, index) => {
                  return (
                    <option
                      key={index}
                      value={index}
                      label={zone.text}
                    ></option>
                  );
                })}
              </Select>
            </Item>
          </FormElement>
          <AvatarContainer>
            <Item>
              <Label htmlFor="avatar">Avatar</Label>
              <AvatarDisplay>
                {image ? (
                  <img
                    src={image && image.filesUploaded[0].url}
                    alt="imageUploaded"
                  />
                ) : (
                  // <img src={currentUser.avatar} alt="No Avatar Uploaded" />
                  <div>Choose Image</div>
                )}

                <Input
                  style={{ display: "none" }}
                  id="avatar"
                  name="avatar"
                  type="text"
                  value={formik.values.avatar}
                  onChange={formik.handleChange}
                />
                <UploadLabel
                  onClick={() =>
                    isPicker ? setIsPicker(false) : setIsPicker(true)
                  }
                >
                  <CloudUploadIcon />
                  Upload File
                </UploadLabel>
              </AvatarDisplay>
            </Item>
          </AvatarContainer>
        </FormElementContainer>

        <ButtonWrap>
          <SubmitButton type="submit">Update Settings</SubmitButton>
          <CancelButton onClick={formik.handleReset}>Cancel</CancelButton>
        </ButtonWrap>
        <ImagePiker>
          {isPicker && (
            <PickerOverlay
              apikey={process.env.REACT_APP_FILESTACK_API_KEY}
              onSuccess={(res) => {
                setImage(res);
                setIsPicker(false);
                // console.log(res);
              }}
              onError={(res) => alert(res)}
              pickerOptions={{
                maxFiles: 1,
                accept: "image/jpeg",
                errorsTimeout: 2000,
                imageMax: [200, 200],
                onClose: () => {
                  setIsPicker(false);
                },
              }}
            />
          )}
        </ImagePiker>
      </Form>
      <ToastContainer />
    </Wrapper>
  );
};

export default GeneralSettingsTab;
