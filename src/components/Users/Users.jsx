import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import AllUsers from './AllUsers/AllUsers';
import AddUser from './AddUser';
import { StyledLinkButton } from '../shared/Buttons';
import * as S from './styled';

import PrivateRoute from '../PrivateRoute';

const Users = () => {
  const { path, url } = useRouteMatch();
  const { authDetails } = useAuth();
  return (
    <S.UsersWrapper>
      <nav>
        <StyledLinkButton to={`${url}`}>All users</StyledLinkButton>
        <StyledLinkButton to={`${url}/add-user`}>Add User</StyledLinkButton>
      </nav>
      <Switch>
        <PrivateRoute path={path} exact>
          <AllUsers token={authDetails.token} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/add-user`}>
          <AddUser token={authDetails.token} />
        </PrivateRoute>
      </Switch>
    </S.UsersWrapper>
  );
};

export default Users;
