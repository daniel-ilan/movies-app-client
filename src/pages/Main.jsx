import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import MainNavbar from '../components/Navbar/MainNavbar';
import Users from '../components/Users/Users';
import Shows from '../components/Shows/Shows';
import Subscriptions from '../components/Subscriptions/Subscriptions';
import Welcome from '../components/Welcome';
import styled from 'styled-components';

const MainWrapper = styled.div`
  background: linear-gradient(
    45deg,
    hsl(216deg 13% 6%) 80%,
    hsl(202deg 70% 12%) 100%
  );
  height: 100vh;
  overflow: hidden;
  padding: 2%;
`;

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <MainWrapper>
      <MainNavbar />
      <Switch>
        <PrivateRoute path={path} exact>
          <Welcome />
        </PrivateRoute>
        <PrivateRoute path={`${path}/shows`}>
          <Shows />
        </PrivateRoute>
        <PrivateRoute path={`${path}/subscriptions`}>
          <Subscriptions />
        </PrivateRoute>
        <PrivateRoute path={`${path}/users`}>
          <Users />
        </PrivateRoute>
      </Switch>
    </MainWrapper>
  );
};

export default Main;
