import React from 'react';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import CurrentUserContext from '../context/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  isLoading,
  onConfirmDeletion,
}) {
  const userData = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className='profile'>
        <div className='profile__avatar-edit'>
          <img src={userData.avatar} alt='аватар' className='profile__avatar' />
          <button
            type='button'
            className='profile__avatar-edit-button'
            aria-label='редактировать аватар'
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{userData.name}</h1>
          <button
            type='button'
            className='profile__edit-button'
            aria-label='редактировать профиль'
            onClick={onEditProfile}
          ></button>
          <p className='profile__job'>{userData.about}</p>
        </div>
        <button
          type='button'
          className='profile__add-button'
          aria-label='добавить фотографии'
          onClick={onAddPlace}
        ></button>
      </section>

      <section className='cards' aria-label='фотокарточки'>
        <ul className='cards__photo-grid'>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onConfirmDeletion={onConfirmDeletion}
                ></Card>
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
