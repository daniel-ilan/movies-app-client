import React, { useEffect } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useAuth } from '../context/UserContext';
import {
  Redirect,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

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
    <>
      <Switch>
        <Route path={`/login`}>
          <Login />
        </Route>
        <Route path={`/signup`}>
          <SignUp />
        </Route>
        {path === '/' && <Redirect to={`${path}login`} />}
      </Switch>
    </>
  );
};

export default Auth;
