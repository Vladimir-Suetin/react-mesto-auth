import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../context/CurrentUserContext';
import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, submitButtonState }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // Стейт имени и занятия
  const { values, handleChange, setValues } = useForm({ name: '', description: '' });

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues({ name: currentUser.name, description: currentUser.about });
  }, [currentUser, isOpen, setValues]);

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
    >
      <input
        name='name'
        type='text'
        className='popup__name popup__field popup__name_value'
        required
        placeholder='Имя'
        minLength='2'
        maxLength='40'
        onChange={handleChange}
        value={values.name}
      />
      <span className='popup__error popup__error_name'></span>
      <input
        name='description'
        type='text'
        className='popup__job popup__field popup__job_value'
        required
        placeholder='О себе'
        minLength='2'
        maxLength='200'
        onChange={handleChange}
        value={values.description}
      />
      <span className='popup__error popup__error_job'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
