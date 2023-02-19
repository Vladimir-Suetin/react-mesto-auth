import React from 'react';
import { useForm } from '../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
  const defaultValues = { password: '', email: '' };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister({ password: values.password, email: values.email });
    setValues(defaultValues);
  }

  return (
    <main>
      <div className='login'>
        <h2 className='login__title'>Регистрация</h2>
        <form name='registerForm' className='login__form' onSubmit={handleSubmit}>
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
            Зарегистрироваться
          </button>
        </form>
        <p className='login__question-text'>
          Уже зарегистрированы?{' '}
          <Link className='login__link' to='/sign-in'>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
