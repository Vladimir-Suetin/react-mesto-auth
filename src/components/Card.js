import React from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onConfirmDeletion }) {
  const { name, link, likes } = card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`;

  function handleCardClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onConfirmDeletion(card._id);
  }

  return (
    <li className='element'>
      <img src={link} alt={name} className='element__mask-group' onClick={handleCardClick} />
      <div className='element__rectangle'>
        <h2 className='element__title'>{name}</h2>
        <div className='element__likes'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label='поставить лайк'
          ></button>
          <span className='element__number-likes'>{likes.length}</span>
        </div>
      </div>
      {isOwn && <button type='button' className='element__button-remove' onClick={handleDeleteClick}></button>}
    </li>
  );
}

export default Card;
