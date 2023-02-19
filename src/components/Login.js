import React from 'react';
import { useForm } from '../hooks/useForm';
import * as userAuth from '../utils/userAuth';

function Login({ authSuccess, onLogin }) {
  const defaultValues = { password: '', email: '' };
  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();

    userAuth
      .authorize({ password: values.password, email: values.email })
      .then((res) => {
        if (res.token) localStorage.setItem('token', res.token);
        setValues(defaultValues);
        onLogin({ email: values.email });
      })
      .catch((err) => {
        console.log(err);
        authSuccess({
          isOpen: true,
          authSuccess: false,
        });
      });
  }

  return (
    <main>
      <div className='login'>
        <h2 className='login__title'>Вход</h2>
        <form name='loginForm' className='login__form' onSubmit={handleSubmit} noValidate>
          <input
            type='email'
            className='login__input'
            placeholder='Email'
            name='email'
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            type='password'
            className='login__input'
            placeholder='Пароль'
            name='password'
            value={values.password}
            onChange={handleChange}
            required
          />
          <button type='submit' className='login__submit-button'>
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
