import './styles.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import React from 'react';
import { Notes } from './Notes';
import { Login } from './Login';
import { Signup } from './Signup';
import { useAuth } from './authContext';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SearchBar } from './SearchBar';
export const App = () => {
  const { userLogout, login } = useAuth();
  return (
    <div className='App'>
      <div className='navbar'>
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            backgroundColor: 'black',
            padding: '1rem',
            alignItems: 'center',
          }}
        >
          <NavLink to='/' style={{ color: 'white' }} className='note__route'>
            Notes App
          </NavLink>
          {login && <SearchBar />}
          {!login && (
            <NavLink
              style={({ isActive }) => {
                return { color: isActive ? 'blue' : 'white' };
              }}
              className='note__route'
              to='/'
            >
              <span style={{ fontSize: '1.2rem', paddingRight: '0.5rem' }}>
                Login
              </span>
              <LoginIcon />
            </NavLink>
          )}
          {!login && (
            <NavLink
              style={({ isActive }) => {
                return { color: isActive ? 'blue' : 'white' };
              }}
              className='note__route'
              to='/signup'
            >
              <span style={{ fontSize: '1.2rem', paddingRight: '0.5rem' }}>
                Sign Up
              </span>
              <AccountCircleIcon />
            </NavLink>
          )}
          {login && (
            <NavLink
              style={({ isActive }) => {
                return { color: isActive ? 'blue' : 'white' };
              }}
              className='note__route'
              onClick={userLogout}
              to='/'
            >
              <span style={{ fontSize: '1.2rem', paddingRight: '0.5rem' }}>
                {' '}
                Logout
              </span>
              <LogoutIcon />
            </NavLink>
          )}
        </ul>
      </div>

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />

        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
