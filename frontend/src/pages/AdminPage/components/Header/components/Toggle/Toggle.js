import styled from "styled-components";

const ToggleWrapper = styled.div`
  margin:10px;
  width:40px;
  height:40px;
  /* background-color: #f4f4fa;
  border-radius:45%; */
  display:block;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  :hover  {
    background-color:#5A078B;
  };
  :hover i{
    color: #f4f4fa;
  }
`;

const Icon = styled.i`
  transform: scale(var(--ggs,1.3));
`;

const Toggle = ({setSidebarDrawer}) => {
  const onClickHandler = (event) => {
    event.preventDefault();
    setSidebarDrawer((prev) => !prev);
  }

  return (
    <ToggleWrapper onClick={onClickHandler}>
      <a href='/admin'><Icon className="gg-format-left"></Icon></a>
    </ToggleWrapper>
  )
};

export default Toggle;