import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledLinkButton = styled(NavLink)`
  text-decoration: none;
  padding: 10px 15px;
  color: #e5e5e5;
  transition: all 0.1s;
  border-radius: 8px;
  &:hover {
    box-shadow: 0px 0px 15px 0px #000000;
  }
  &:focus {
    box-shadow: 0px 0px 15px 0px #000000;
  }
  &:active {
    box-shadow: 0px 0px 15px 0px #000000;
  }
`;
