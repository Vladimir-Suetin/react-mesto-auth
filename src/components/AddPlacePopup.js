import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, submitButtonState }) {
  const { values, handleChange, setValues } = useForm({ image: '', link: '' });

  React.useEffect(() => {
    setValues({ image: '', link: '' });
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: values.image, link: values.link });
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-image'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
    >
      <input
        name='image'
        type='text'
        value={values.image}
        className='popup__name-image popup__field popup__name-image_value'
        required
        placeholder='Введите название'
        minLength='2'
        maxLength='30'
        onChange={handleChange}
      />
      <span className='popup__error popup__error_image'></span>
      <input
        name='link'
        type='url'
        value={values.link}
        className='popup__link-image popup__field popup__link-image_value'
        required
        placeholder='Ссылка на картинку'
        onChange={handleChange}
      />
      <span className='popup__error popup__error_link'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
