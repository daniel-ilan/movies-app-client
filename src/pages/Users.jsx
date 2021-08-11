import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import AllUsers from '../components/Users/AllUsers/AllUsers';
import AddUser from '../components/Users/AddUser';
import EditUser from '../components/Users/EditUser';
import { InnerNav } from '../components/shared/InnerNav';
import { StyledLink } from '../components/shared/Buttons';
import PrivateRoute from '../components/Auth/PrivateRoute';

const Users = () => {
  const { path, url } = useRouteMatch();
  const { authDetails } = useAuth();
  const [users, setUsers] = useState(null);
  return (
    <>
      <InnerNav>
        <StyledLink to={`${url}`} activeClassName='active' exact>
          All users
        </StyledLink>
        <StyledLink to={`${url}/add-user`} activeClassName='active'>
          Add user
        </StyledLink>
      </InnerNav>
      <Switch>
        <PrivateRoute path={path} exact>
          <AllUsers
            token={authDetails.token}
            users={users}
            setUsers={setUsers}
          />
        </PrivateRoute>
        <PrivateRoute path={`${path}/edit-user/:userIndex`}>
          <EditUser token={authDetails.token} users={users} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/add-user`}>
          <AddUser token={authDetails.token} />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default Users;
