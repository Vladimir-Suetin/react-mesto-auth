import React from 'react';
import { useForm } from '../hooks/useForm';

function Login({ onLogin }) {
  const defaultValues = { password: '', email: '' };
  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin({ password: values.password, email: values.email });
    setValues(defaultValues);
  }

  return (
    <main>
      <div className='login'>
        <h2 className='login__title'>Вход</h2>
        <form name='loginForm' className='login__form' onSubmit={handleSubmit}>
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
