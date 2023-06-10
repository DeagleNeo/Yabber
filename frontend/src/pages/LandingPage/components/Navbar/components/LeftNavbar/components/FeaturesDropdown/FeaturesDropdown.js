import styled from "styled-components";
import { Link as LinkScroll } from "react-scroll";

const FeaturesDropdownContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 110px;
  padding: 10px;
  width: 210px;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  color: #1d1c1d;
  text-align: center;
`;

const FeaturesDropdownItem = styled.div`
  padding: 7px 0;
  font-size: 14px;
  font-weight: 500;
`;

const FeaturesDropdownBtn = styled.div`
  margin-top: 5px;
  padding: 10px;
  border-top: 1px solid #d3d3d3;

  &:hover {
    background-color: #4a154b;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const FeaturesDropdownLink = styled(LinkScroll)`
  font-weight: 900;
  @media screen and (max-width: 960px) {
    border-bottom: 2px solid #4a154b;
  }
`;

const FeaturesDropdown = ({ toggleFeaturesHandler, closeFeaturesHandler }) => {
  return (
    <FeaturesDropdownContainer onMouseLeave={toggleFeaturesHandler}>
      <FeaturesDropdownItem children="Create account | Login" />
      <FeaturesDropdownItem children="Create | Join Organizations" />
      <FeaturesDropdownItem children="Create | Join channels" />
      <FeaturesDropdownItem children="Direct messages" />
      <FeaturesDropdownItem children="Group Messages" />
      <FeaturesDropdownBtn>
        <FeaturesDropdownLink
          to="features"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
          offset={-80}
          onClick={closeFeaturesHandler}
        >
          See More
        </FeaturesDropdownLink>
      </FeaturesDropdownBtn>
    </FeaturesDropdownContainer>
  );
};

export default FeaturesDropdown;
