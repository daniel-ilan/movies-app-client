import React from 'react';
import { InnerNav } from '../components/shared/InnerNav';
import { StyledLink } from '../components/shared/Buttons';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/Auth/PrivateRoute';
import AllMembers from '../components/Members/all-members/AllMembers';
import AddMember from '../components/Members/AddMember';
import { useAuth } from '../context/UserContext';

const Members = () => {
  const { path, url } = useRouteMatch();
  const { authDetails } = useAuth();

  return (
    <>
      <InnerNav>
        <StyledLink to={`${url}`} activeClassName='active' exact>
          All Members
        </StyledLink>
        {authDetails.permissions.includes('createSubscriptions') && (
          <StyledLink to={`${url}/add-member`} activeClassName='active'>
            Add Member
          </StyledLink>
        )}
      </InnerNav>
      <Switch>
        <PrivateRoute path={path} exact>
          <AllMembers />
        </PrivateRoute>
        {authDetails.permissions.includes('createSubscriptions') && (
          <PrivateRoute path={`${path}/add-member`}>
            <AddMember />
          </PrivateRoute>
        )}
      </Switch>
    </>
  );
};

export default Members;
