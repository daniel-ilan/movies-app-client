import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/Auth/PrivateRoute';
import MainNavbar from '../components/Navbar/MainNavbar';
import Users from './Users';
import Shows from './Shows';
import Members from './Subscriptions';
import Welcome from '../components/Welcome';
import styled from 'styled-components';
import { PageWrapper } from '../components/shared/Wrapper';
import { ShowsContextProvider } from '../context/ShowsContext';
import { SubscriptionsContextProvider } from '../context/SubscriptionsContext';
import { MembersContextProvider } from '../context/MembersContext';

const MainWrapper = styled.div`
  height: 100%;

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
          <SubscriptionsContextProvider>
            <MembersContextProvider>
              <Switch>
                <PrivateRoute path={path} exact>
                  <Welcome />
                </PrivateRoute>
                <PrivateRoute path={`${path}/shows`}>
                  <Shows />
                </PrivateRoute>
                <PrivateRoute path={`${path}/members`}>
                  <Members />
                </PrivateRoute>
                <PrivateRoute path={`${path}/users`}>
                  <Users />
                </PrivateRoute>
              </Switch>
            </MembersContextProvider>
          </SubscriptionsContextProvider>
        </ShowsContextProvider>
      </PageWrapper>
    </MainWrapper>
  );
};

export default Main;
