import { useAuth } from './authContext';
import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './styles.css';
export function Login() {
  const { loginWithCredentials, error } = useAuth();
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function userNameHandler(e) {
    let email = e.target.value;
    setEmail(email);
  }

  const passwordHandler = (e) => {
    let password = e.target.value;
    setPassword(password);
  };
  function submitHandler(e) {
    e.preventDefault();
    loginWithCredentials(email, password);
  }

  return (
    <div className='login'>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4px' }}>Login</h2>
        <form
          onSubmit={submitHandler}
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // flexDirection: 'column',
            margin: '2rem auto',
            padding: '2rem',
            border: '2px solid #f0f0f0',
          }}
        >
          <label
            style={{
              display: 'block',
              marginLeft: '3.8rem',
              paddingBottom: '0.5rem',
              textAlign: 'left',
            }}
          >
            Email
          </label>
          <input
            type='text'
            name='email'
            placeholder='Enter your email here'
            onChange={userNameHandler}
            required
            style={{ padding: '6px' }}
          />

          <div className='email__error'>{error && error.email}</div>
          <br />
          <br />
          <label
            style={{
              display: 'block',
              marginLeft: '3.8rem',
              paddingBottom: '0.5rem',
              textAlign: 'left',
              // fontWeight: 'bold',
            }}
          >
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password here'
            onChange={passwordHandler}
            required
            style={{
              padding: '6px',
              // marginLeft: '4rem',
              // paddingBottom: '0.5rem',
              // textAlign: 'left',
            }}
          />

          <div className='password__error'>{error && error.password}</div>
          <br />
          <input
            style={{
              width: '63%',
              textAlign: 'center',
              marginTop: '2px',
              backgroundColor: '#3B82F6',
              border: 'none',
              color: 'white',
              padding: '6px',
              borderRadius: '5px',
              marginBottom: '1rem',
            }}
            type='submit'
            value='Login'
          />
          <p>
            <NavLink
              style={{
                textDecoration: 'none',
                color: '#3B82F6',
                width: '100%',
                textAlign: 'center',
              }}
              activeStyle={{ fontWeight: 'bold' }}
              to='/signup'
            >
              Create an account
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
