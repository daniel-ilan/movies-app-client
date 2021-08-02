import React from 'react';
import InnerNav from '../components/shared/InnerNav';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AllMembers from '../components/Members/all-members/AllMembers';
import AddMember from '../components/Members/AddMember';

const Members = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <InnerNav
        linkUrl='add-member'
        linkText='Add Member'
        homeText='All Members'
      />
      <Switch>
        <PrivateRoute path={path} exact>
          <AllMembers />
        </PrivateRoute>
        <PrivateRoute path={`${path}/add-member`}>
          <AddMember />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default Members;
