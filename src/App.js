import Auth from './pages/Auth';
import Main from './pages/Main';
import PrivateRoute from './components/Auth/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import styled from 'styled-components';

const MainWrapper = styled.div`
  background: linear-gradient(
    45deg,
    hsl(216deg 13% 8%) 80%,
    hsl(202deg 70% 12%) 100%
  );
  height: 100vh;
  overflow: hidden;
  padding: 2%;
`;

function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <MainWrapper>
          <Router>
            <Switch>
              <PrivateRoute path='/main'>
                <Main />
              </PrivateRoute>
              <Route path='/'>
                <Auth />
              </Route>
            </Switch>
          </Router>
        </MainWrapper>
      </UserContextProvider>
    </div>
  );
}

export default App;
