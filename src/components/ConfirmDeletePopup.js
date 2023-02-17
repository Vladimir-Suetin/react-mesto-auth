import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup({ isOpen, onClose, submitButtonState, onSubmitButton, removeCard }) {
  function handleSubmitDeleteCard(evt) {
    evt.preventDefault();
    onSubmitButton(removeCard);
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='confirm'
      removeCard={removeCard}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitDeleteCard}
      submitButtonState={submitButtonState}
    />
  );
}

export default ConfirmDeletePopup;
