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
import { useAuth } from '../context/UserContext';
const MainWrapper = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: 13% 86%;
  row-gap: 1%;
`;

const Main = () => {
  const { authDetails } = useAuth();
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
                {authDetails.permissions.includes('viewMovies') && (
                  <PrivateRoute path={`${path}/shows`}>
                    <Shows />
                  </PrivateRoute>
                )}
                {authDetails.permissions.includes('viewSubscriptions') && (
                  <PrivateRoute path={`${path}/members`}>
                    <Members />
                  </PrivateRoute>
                )}
                {authDetails.isAdmin && (
                  <PrivateRoute path={`${path}/users`}>
                    <Users />
                  </PrivateRoute>
                )}
              </Switch>
            </MembersContextProvider>
          </SubscriptionsContextProvider>
        </ShowsContextProvider>
      </PageWrapper>
    </MainWrapper>
  );
};

export default Main;
