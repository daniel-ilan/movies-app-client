import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { StyledLinkButton } from '../shared/Buttons';
import styled from 'styled-components';

const NavBar = styled.nav`
  align-self: center;
`;

const InnerNav = ({ linkUrl, linkText, homeText }) => {
  const { url } = useRouteMatch();
  return (
    <NavBar>
      <StyledLinkButton to={`${url}`} activeClassName='active' exact>
        {homeText}
      </StyledLinkButton>
      <StyledLinkButton to={`${url}/${linkUrl}`} activeClassName='active'>
        {linkText}
      </StyledLinkButton>
    </NavBar>
  );
};

export default InnerNav;
