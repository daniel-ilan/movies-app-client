import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import MainNavbar from '../components/Navbar/MainNavbar';
import Users from './Users';
import Shows from './Shows';
import Subscriptions from '../components/Subscriptions/Subscriptions';
import Welcome from '../components/Welcome';
import styled from 'styled-components';
import { PageWrapper } from '../components/shared/Wrapper';
import { ShowsContextProvider } from '../context/ShowsContext';

const MainWrapper = styled.div`
  background: linear-gradient(
    45deg,
    hsl(216deg 13% 8%) 80%,
    hsl(202deg 70% 12%) 100%
  );
  height: 100vh;
  overflow: hidden;
  padding: 2%;
  display: grid;
  grid-template-rows: 20% 80%;
  row-gap: 10px;
`;

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <MainWrapper>
      <MainNavbar />
      <PageWrapper>
        <ShowsContextProvider>
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
        </ShowsContextProvider>
      </PageWrapper>
    </MainWrapper>
  );
};

export default Main;
