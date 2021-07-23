import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import AllUsers from '../components/Users/AllUsers/AllUsers';
import AddUser from '../components/Users/AddUser';
import EditUser from '../components/Users/EditUser';
import InnerNav from '../components/shared/InnerNav';

import PrivateRoute from '../components/PrivateRoute';

const Users = () => {
  const { path } = useRouteMatch();
  const { authDetails } = useAuth();
  const [users, setUsers] = useState(null);
  return (
    <>
      <InnerNav linkUrl='add-user' linkText='Add User' homeText='All users' />
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
