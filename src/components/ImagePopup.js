import React from 'react';

function ImagePopup({ card, onClose }) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_view_image ${card.link && 'popup_opened'}`} onMouseDown={handleOverlayClick}>
      <div className='popup__wrapper'>
        <button type='button' className='popup__close-icon' aria-label='закрыть форму' onClick={onClose}></button>
        <img src={card.link} alt={card.name} className='popup__image' />
        <h3 className='popup__image-title'>{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
