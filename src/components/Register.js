import React from 'react';
import Header from './Header';
import { useForm } from '../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import * as userAuth from '../utils/userAuth';

function Register({handleUserMessage}) {
  const defaultValues = { password: '', email: '' };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    userAuth
      .register({password: values.password, email: values.email})
      .then((res) => {
        console.log(res)
        console.log(res)
        handleUserMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
        setValues(defaultValues);;
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log({err})
        const text = err || "Что-то пошло не так! Попробуйте еще раз.";
        handleUserMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  return (
    <>
      <Header>
        <Link to='/sign-in' className='header__link'>
          Войти
        </Link>
      </Header>
      <main>
        <div className='login'>
          <h2 className='login__title'>Регистрация</h2>
          <form className='login__form' onSubmit={handleSubmit} noValidate>
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
        </div>
      </main>
    </>
  );
}

export default Register;
