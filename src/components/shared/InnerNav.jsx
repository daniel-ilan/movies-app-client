import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { StyledLink } from '../shared/Buttons';
import styled from 'styled-components';

const NavBar = styled.nav`
  align-self: center;
`;

const InnerNav = ({ linkUrl, linkText, homeText }) => {
  const { url } = useRouteMatch();
  return (
    <NavBar>
      <StyledLink to={`${url}`} activeClassName='active' exact>
        {homeText}
      </StyledLink>
      <StyledLink to={`${url}/${linkUrl}`} activeClassName='active'>
        {linkText}
      </StyledLink>
    </NavBar>
  );
};

export default InnerNav;
