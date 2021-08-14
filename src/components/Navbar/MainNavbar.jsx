import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { StyledLink, StyledLinkButton } from '../shared/Buttons';
import * as S from './styled';

const MainNavbar = () => {
  let { url } = useRouteMatch();
  const { logout, authDetails } = useAuth();
  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.Title>Welcome to Shows / subscription WebApp</S.Title>
        <StyledLinkButton onClick={() => logout()}>Logout</StyledLinkButton>
      </S.HeaderWrapper>
      <S.Nav>
        <S.Links>
          <S.LinkItem>
            {authDetails.permissions.includes('viewMovies') && (
              <StyledLink to={`${url}/shows`} activeClassName='active'>
                Shows
              </StyledLink>
            )}
          </S.LinkItem>
          {authDetails.permissions.includes('viewSubscriptions') && (
            <S.LinkItem>
              <StyledLink to={`${url}/members`} activeClassName='active'>
                Members
              </StyledLink>
            </S.LinkItem>
          )}
          {authDetails.isAdmin && (
            <S.LinkItem>
              <StyledLink to={`${url}/users`} activeClassName='active'>
                User Managment
              </StyledLink>
            </S.LinkItem>
          )}
        </S.Links>
      </S.Nav>
    </S.Container>
  );
};

export default MainNavbar;
