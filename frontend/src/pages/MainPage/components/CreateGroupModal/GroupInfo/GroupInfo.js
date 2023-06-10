import styled from "styled-components";
// import FormElement from "../components/FormElement";
// import AddMember from "../components/FormElement/AddMember";
// import UploadBtn from "../components/FormElement/UploadBtn";
import Input from "../components/Input";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { PickerOverlay } from "filestack-react";
import UploadIcon from '@mui/icons-material/Upload';

 

// const Header = styled.div`
//   text-align: center;
//   padding: 0 24px;
//   margin-bottom: 18px;
// `;
const SubTitle = styled.p`
  line-height: 5px;
  color: #666666;
  font-weight: 900;
  font-size: 15px;
`;

const RadioInput = styled.input`
  margin-top: 10px;
`;
const FormWrapper = styled.div`
  background-color: #fafbff;
  height: 90%;
  padding: 15px;
`;
const AvatarDisplay = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  /* align-items: flex-start; */
  & img {
    border-radius: 50%;
    width: 160px;
    height: 160px;
    position: absolute;
    left:15%;
    bottom: 15%;
  }
  & div {
    color:#666666;
    font-weight: bold;
    position: absolute;
    left:15%;
    bottom: 14%;
    border: 3px dotted #666666;
    padding: 70px 35px;
  }
`;
const UploadLabel = styled.label`
  cursor: pointer;
  align-self: left;
  /* position:absolute;
  bottom: 20%;
  left: 10%; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  margin-top: 10px;
  margin-left: 40px;
  display: flex;
  gap: 5px;
`;
// it used to have an "Add Member" button but later being removed
// const addMemberButtonStyle = {
//   position: "absolute",
//   bottom: "25px",
//   right: "25px",
// };
const uploadButtonStyle = {
  position: "absolute",
  bottom: "22%",
  right: "15%",
};

const ImagePiker = styled.div``;

const GroupInfo = ({ changeTab, setFormData, formData }) => {
  const [isPicker, setIsPicker] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if(image!==""){
      formik.values.avatar = image && image.filesUploaded[0].url;
    }

  });

  const formik = useFormik({
    initialValues: formData
      ? {
          groupName: formData.groupName,
          description: formData.description,
          type: formData.type,
          avatar: formData.avatar,
        }
      : { groupName: "", description: "", type: "", avatar: "" },
  });
  useEffect(() => {
    setFormData((prev) => formik.values);
  }, [formik.values,setFormData]);

  return (
    <FormWrapper>
      <h2>Create Group</h2>
      <form>
        <SubTitle>Group Name</SubTitle>
        <Input
          id="groupName"
          name="groupName"
          onChange={formik.handleChange}
          value={formik.values.groupName}
        />

        <SubTitle>Description</SubTitle>
        <Input
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />

        <RadioInput
          type="radio"
          id="private"
          name="groupType"
          value="private"
          onChange={() => formik.setFieldValue("type", "private")}
          checked={formik.values.type === "private"}
        />
        <label htmlFor="private">Private Group</label>
        <RadioInput
          type="radio"
          id="public"
          name="groupType"
          value="public"
          onChange={() => formik.setFieldValue("type", "public")}
          checked={formik.values.type === "public"}
        />
        <label htmlFor="public">Public Group</label>

        <SubTitle sx={"mt = 50px"}>Choose Group Picture</SubTitle>
        <AvatarDisplay>
          {image ? (
            <img
              src={image && image.filesUploaded[0].url}
              alt="imageUploaded"
            />
          ) : (
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
          <UploadLabel>
            {/* <input style={{ display: 'none' }} type="file" accept="image/png, image/jpeg" onChange={loadFile} /> */}
            {/* <CloudUploadIcon
              onClick={() =>
                isPicker ? setIsPicker(false) : setIsPicker(true)
              }
            />
            Upload File */}
            <Button
              variant="contained"
              size="small"
              sx={uploadButtonStyle}
              onClick={() =>
                isPicker ? setIsPicker(false) : setIsPicker(true)
              }
              startIcon={<UploadIcon/>}
            >
              Choose File
            </Button>
          </UploadLabel>
        </AvatarDisplay>
      </form>
      {/* <Button
        sx={addMemberButtonStyle}
        onClick={() => changeTab(1)}
        variant="contained"
        size="large"
      >
        Add Members
      </Button> */}

      <ImagePiker>
        {isPicker && (
          <PickerOverlay
            apikey={process.env.REACT_APP_FILESTACK_API_KEY}
            onSuccess={(res) => {
              setImage(res);
              setIsPicker(false);
              console.log(res);
            }}
            onError={(res) => alert(res)}
            pickerOptions={{
              maxFiles: 1,
              accept: "image/jpeg",
              errorsTimeout: 2000,
              imageMax: [200, 200],
              onClose:()=>{
                setIsPicker(false)
              }
            }}

          />
        )}
      </ImagePiker>
    </FormWrapper>
  );
};

export default GroupInfo;
