
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './forms.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, email, password, firstName, lastName)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const loginGuest = (e) => {
    e.preventDefault()
    return dispatch(login('demo@aa.io', 'password'))
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className='FormContainer'>
      <h1 className='SignupHeader'>Sign Up</h1>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label className='SignupFirstLabel'>First Name</label>
        <input
          className='SignupFirstInput'
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
      </div>
      <div>
        <label className='SignupLastLabel'>Last Name</label>
        <input
          className='SignupLastInput'
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
      </div>
      <div>
        <label className='SignupUsernameLabel'>User Name</label>
        <input
          className='SignupUsernameInput'
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label className='SignupEmailLabel'>Email</label>
        <input
          className='SignupEmailInput'
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label className='SignupPasswordLabel'>Password</label>
        <input
          className='SignupPasswordInput'
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label className='SignupConfirmLabel'>Repeat Password</label>
        <input
          className='SignupConfirmInput'
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='SignupFormButtons'>
        <button type='submit' className='SignupButton'>Sign Up</button>
        <button type='button' className='GuestButton' onClick={loginGuest}>Continue as Guest</button>
      </div>
    </form>
  );
};

export default SignUpForm;
