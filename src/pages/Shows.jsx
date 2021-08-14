import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/Auth/PrivateRoute';
import AllShows from '../components/Shows/AllShows/AllShows';
import AddShow from '../components/Shows/AddShow';
import EditShow from '../components/Shows/EditShow';
import { InnerNav } from '../components/shared/InnerNav';
import { StyledLink } from '../components/shared/Buttons';
import ShowDescription from '../components/Shows/ShowDescription/ShowDesciprtion';
import { useAuth } from '../context/UserContext';
import ShowControls from '../components/Shows/Controls/Controls';
import styled from 'styled-components';

const LinksWrapper = styled.div``;

const Shows = () => {
  const { path, url } = useRouteMatch();
  const { authDetails } = useAuth();
  return (
    <>
      <InnerNav>
        <LinksWrapper>
          <StyledLink to={`${url}`} activeClassName='active' exact>
            All shows
          </StyledLink>
          {authDetails.permissions.includes('createMovies') && (
            <StyledLink to={`${url}/add-show`} activeClassName='active'>
              Add show
            </StyledLink>
          )}
        </LinksWrapper>
        <ShowControls />
      </InnerNav>
      <Switch>
        <PrivateRoute path={path} exact>
          <AllShows />
        </PrivateRoute>
        {authDetails.permissions.includes('viewSubscriptions') && (
          <PrivateRoute path={`${path}/add-show`} exact>
            <AddShow />
          </PrivateRoute>
        )}
        {authDetails.permissions.includes('viewSubscriptions') && (
          <PrivateRoute path={`${path}/:showId/edit`}>
            <EditShow />
          </PrivateRoute>
        )}
        {authDetails.permissions.includes('viewMovies') && (
          <PrivateRoute path={`${path}/:showId`}>
            <ShowDescription />
          </PrivateRoute>
        )}
      </Switch>
    </>
  );
};

export default Shows;
