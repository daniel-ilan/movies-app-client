import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import API from '../api';

const initialState = {
  token: null,
  id: null,
  username: null,
  success: false,
  loading: false,
};

const UserContext = React.createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

function useProvideAuth() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authDetails, setAuthDetails] = useState(initialState);
  const history = useHistory();

  const login = async (username, password) => {
    const response = await API.post('/login', { username, password });
    const data = response.data;
    if (data.success) {
      setAuthDetails(data);
      setIsAuthenticated(true);
      return data;
    }
  };

  const logout = () => {
    setAuthDetails(null);
    setIsAuthenticated(false);
    history.push('/login');
  };

  const signUp = async (username, password) => {
    const response = await API.post('/signup', { username, password });
    const data = response.data;
    if (data.success) {
      setAuthDetails(data);
      setIsAuthenticated(true);
      return data;
    }
  };

  const validateToken = async (token, userId, username) => {
    try {
      const checkToken = await API.post('/validate-token', userId, {
        headers: { Authorization: `Barer ${token}` },
      });
      if (checkToken.data.success) {
        setAuthDetails({
          username,
          userId,
          token,
          success: true,
        });
        setIsAuthenticated(true);
      } else {
        setAuthDetails(initialState);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        window.history.replaceState(null, '', '/login');
        setAuthDetails(initialState);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    if (token && userId) {
      validateToken(token, userId, username);
    }
  }, []);

  return {
    signUp,
    login,
    logout,
    authDetails,
    setAuthDetails,
    loading,
    setLoading,
    isAuthenticated,
    validateToken,
  };
}
