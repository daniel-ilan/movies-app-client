import Auth from './pages/Auth';
import Main from './pages/Main';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
function App() {
  return (
    <div className='App'>
      <UserContextProvider>
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
      </UserContextProvider>
    </div>
  );
}

export default App;
