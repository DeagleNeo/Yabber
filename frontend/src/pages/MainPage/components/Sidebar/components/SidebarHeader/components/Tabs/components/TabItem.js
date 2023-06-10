import styled, { css } from "styled-components";

const withChange = css`
  color: #ffa977;
  font-weight: bolder;
`;

const TabItem = styled.a`
  background: transparent;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  text-decoration: none;
  cursor: pointer;

  ${({ active }) => active && withChange}
`;

export default TabItem;
