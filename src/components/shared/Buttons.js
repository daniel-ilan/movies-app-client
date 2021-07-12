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

export const PrimaryButton = styled.button`
  background-color: darkblue;
  border: 1px solid #08084c;
  color: whitesmoke;
  padding: 10px 15px;
  border-radius: 10px;
  transition: 0.2s all;
  font-size: 1.1rem;
  font-weight: 600;

  &:hover {
    background-color: #08084c;
    border-color: #01011d;
    box-shadow: 0px 0px 3px 0px hsl(240deg 56% 58% / 70%);
  }
  &:active {
    background-color: #08084c;
    border-color: #01011d;
    box-shadow: 0px 0px 3px 0px hsl(240deg 56% 58% / 70%);
  }
  &:focus {
    background-color: #08084c;
    border-color: #01011d;
    box-shadow: 0px 0px 3px 0px hsl(240deg 56% 58% / 70%);
  }
`;
