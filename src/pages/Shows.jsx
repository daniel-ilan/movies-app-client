import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AllShows from '../components/Shows/AllShows';
import AddShow from '../components/Shows/AddShow';
import EditShow from '../components/Shows/EditShow';
import InnerNav from '../components/shared/InnerNav';
import ShowDescription from '../components/Shows/ShowDescription/ShowDesciprtion';

const Shows = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <InnerNav
        linkUrl='add-show'
        linkText='Add New Show'
        homeText='All Shows'
      />
      <Switch>
        <PrivateRoute path={path} exact>
          <AllShows />
        </PrivateRoute>
        <PrivateRoute path={`${path}/add-show`} exact>
          <AddShow />
        </PrivateRoute>
        <PrivateRoute path={`${path}/:showId/edit`}>
          <EditShow />
        </PrivateRoute>
        <PrivateRoute path={`${path}/:showId`}>
          <ShowDescription />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default Shows;
