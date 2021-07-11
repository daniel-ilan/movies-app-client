import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { StyledLinkButton } from '../shared/Buttons';
import * as S from './styled';

const MainNavbar = () => {
  let { url } = useRouteMatch();
  return (
    <div>
      <S.Title>Welcome to Shows / subscription WebApp</S.Title>
      <S.Nav>
        <S.Links>
          <S.LinkItem>
            <StyledLinkButton to={`${url}/shows`}>Shows</StyledLinkButton>
          </S.LinkItem>
          <S.LinkItem>
            <StyledLinkButton to={`${url}/subscriptions`}>Subscriptions</StyledLinkButton>
          </S.LinkItem>
          <S.LinkItem>
            <StyledLinkButton to={`${url}/users`}>User Managment</StyledLinkButton>
          </S.LinkItem>
          <S.LinkItem>
            <StyledLinkButton to={`${url}/logout`}>Logout</StyledLinkButton>
          </S.LinkItem>
        </S.Links>
      </S.Nav>
    </div>
  );
};

export default MainNavbar;
