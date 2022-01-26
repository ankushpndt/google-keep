import './styles.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import React from 'react';

import { Notes } from './Notes';

import { Login } from './Login';
import { Signup } from './Signup';
import { useAuth } from './authContext';
export default function App() {
  const { userLogout } = useAuth();
  return (
    <div className='App'>
      <NavLink
        style={{
          textDecoration: 'none',
          // color: "white"
        }}
        activeStyle={{ fontWeight: 'bold' }}
        to='/'
      >
        Login
      </NavLink>
      <NavLink
        style={{
          textDecoration: 'none',
          // color: "white"
        }}
        activeStyle={{ fontWeight: 'bold' }}
        to='/signup'
      >
        Sign Up
      </NavLink>
      <button onClick={userLogout}>Logout</button>
      {/* <Notes /> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        {/* <Route path="/login" element={<Login/>}/> */}
        <PrivateRoute path='/home' element={<Notes />} />
      </Routes>
    </div>
  );
}
