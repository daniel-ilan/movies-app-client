import React, { useEffect } from 'react';
import Login from '../components/Auth/login/Login';
import SignUp from '../components/Auth/signup/SignUp';
import { useAuth } from '../context/UserContext';
import {
  Redirect,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 50%;
  margin: auto;
  padding-block: 20px;
  background-color: #1f2c383d;
  border-radius: 20px;
  height: 80%;
  display: flex;
  color: whitesmoke;
`;

const Auth = () => {
  const { isAuthenticated } = useAuth();
  let { path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/main');
    }
    return () => {};
  }, [isAuthenticated, history]);

  return (
    <Container>
      <Switch>
        <Route path={`/login`}>
          <Login />
        </Route>
        <Route path={`/signup`}>
          <SignUp />
        </Route>
        {path === '/' && <Redirect to={`${path}login`} />}
      </Switch>
    </Container>
  );
};

export default Auth;
