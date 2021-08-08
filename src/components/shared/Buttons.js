import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const outlineCss = css`
  text-decoration: none !important;
  padding: 8px;
  background-color: transparent;
  border: 1px solid ${(props) => props.BColor || '#27273d6b'};
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: 0.2s all;
  font-weight: 500;
  font-size: 1.1rem;
  gap: 5px;
  height: 40px;
  color: ${(props) => props.color || '#b3b3b3'};
  &:hover {
    background-color: ${(props) => (props.BColor ? props.BColor : '#27273d6b')};
    color: #b3b3b3;
  }
  &:active {
    background-color: #3333337d;
    color: #b3b3b3;
  }
  &:focus {
    background-color: #3333337d;
    color: #b3b3b3;
  }
`;

const linkButtonCss = css`
  text-decoration: none !important;
  padding: 10px 15px;
  color: #e5e5e5;
  transition: all 0.1s;
  border-radius: 8px;
  &:hover {
    box-shadow: 0px 0px 15px 0px #000000;
    color: darkcyan;
  }
  &:focus {
    box-shadow: 0px 0px 15px 0px #000000;
    color: darkcyan;
  }
  &:active {
    box-shadow: 0px 0px 15px 0px #000000;
    color: darkcyan;
  }
  &.${(props) => props.activeClassName} {
    box-shadow: 0px 0px 15px 0px #000000;
    color: darkcyan;
  }
`;

export const StyledLink = styled(NavLink)`
  ${linkButtonCss}
`;

export const StyledLinkButton = styled.button`
  ${linkButtonCss}
  background-color: transparent;
  border: none;
  font-size: ${(props) => (props.fontSmall ? '0.8rem' : '1rem')};
  color: darkcyan;
  padding: 8px 10px;
  position: relative;
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
  &:disabled,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    pointer-events: none;
  }
`;

export const OutLineButton = styled.button`
  ${outlineCss}
`;

export const OutLineButtonLink = styled(NavLink)`
  ${outlineCss}
  &.${(props) => props.activeClassName} {
    box-shadow: 0px 0px 15px 0px #000000;
    color: darkcyan;
  }
`;
