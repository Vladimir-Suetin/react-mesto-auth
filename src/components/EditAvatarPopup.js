import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitButtonState }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
    >
      <input
        name='avatar'
        type='url'
        className='popup__avatar-link popup__field popup__avatar-link_value'
        required
        placeholder='Введите ссылку'
        ref={avatarRef}
      />
      <span className='popup__error popup__error_avatar'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
