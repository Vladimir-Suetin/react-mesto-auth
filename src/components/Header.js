import React from 'react';
import logo from '../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail, onLogout }) {
  const { email } = userEmail;
  return (
    <header className='header'>
      <img src={logo} alt='логотип сайта Mesto' className='header__logo' />
      <Routes>
        <Route
          path={'/sign-up'}
          element={
            <Link to='/sign-in' className='header__link'>
              Войти
            </Link>
          }
        />

        <Route
          path={'/sign-in'}
          element={
            <Link to='/sign-up' className='header__link'>
              Регистрация
            </Link>
          }
        />

        <Route
          path={'/'}
          element={
            <>
              <p className='header__email'>{email}</p>
              <button href='#' className='header__button-logout' onClick={onLogout}>
                Выйти
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
