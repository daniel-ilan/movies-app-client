import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { StyledLink } from '../shared/Buttons';
import * as S from './styled';

const MainNavbar = () => {
  let { url } = useRouteMatch();
  return (
    <div>
      <S.Title>Welcome to Shows / subscription WebApp</S.Title>
      <S.Nav>
        <S.Links>
          <S.LinkItem>
            <StyledLink to={`${url}/shows`} activeClassName='active'>
              Shows
            </StyledLink>
          </S.LinkItem>
          <S.LinkItem>
            <StyledLink to={`${url}/members`} activeClassName='active'>
              Members
            </StyledLink>
          </S.LinkItem>
          <S.LinkItem>
            <StyledLink to={`${url}/users`} activeClassName='active'>
              User Managment
            </StyledLink>
          </S.LinkItem>
          <S.LinkItem>
            <StyledLink to={`${url}/logout`} activeClassName='active'>
              Logout
            </StyledLink>
          </S.LinkItem>
        </S.Links>
      </S.Nav>
    </div>
  );
};

export default MainNavbar;
