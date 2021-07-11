import React, { useReducer } from 'react';
import { useAuth } from '../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      username: '',
      password: '',
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Login = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const { login } = useAuth();
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
    const userData = await login(username, password);
    if (userData) {
      window.localStorage.setItem('token', userData.token);
      window.localStorage.setItem('id', userData.id);
      window.localStorage.setItem('username', userData.username);
      history.push('/main');
    }
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            User Name:
            <input type='text' id='username' name='username' onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type='text' id='password' name='password' onChange={handleChange} />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
      <div>
        <h4>Need to sign up first?</h4> <Link to='signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Login;
