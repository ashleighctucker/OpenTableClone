import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './forms.css';

const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      return setErrors(data);
    }
    history.push('/home');
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginGuest = (e) => {
    e.preventDefault();
    return dispatch(login('demo@aa.io', 'password'));
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="main-container">
      <form onSubmit={onLogin} className="FormContainer">
        <h1 className="LoginHeader">Log In</h1>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email" className="LoginEmailLabel">
            Email
          </label>
          <input
            className="LoginEmailInput"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="LoginPasswordLabel">
            Password
          </label>
          <input
            className="LoginPasswordInput"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            autoComplete="current-password"
          />
        </div>
        <div className="LoginFormButtons">
          <button type="submit" className="LoginButton">
            Login
          </button>
        </div>
      </form>
      <button type="button" onClick={loginGuest} className="GuestButton">
        Guest User
      </button>
    </div>
  );
};

export default LoginForm;
