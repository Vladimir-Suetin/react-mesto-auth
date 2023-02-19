import React from 'react';
import successPicture from '../images/ok.svg';
import errorPicture from '../images/error.svg';

function InfoTooltip({ isOpen, onClose, isSuccess, userMessage }) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onMouseDown={handleOverlayClick}>
      <figure className='infoTooltip'>
        <img className='infoTooltip__img' src={isSuccess ? successPicture : errorPicture} alt='Статус регистрации' />
        <figcaption className='infoTooltip__caption'>
          {/* {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'} */}
          {userMessage}
        </figcaption>
        <button type='button' className='popup__close-icon' aria-label='закрыть форму' onClick={onClose}></button>
      </figure>
    </div>
  );
}

export default InfoTooltip;
