import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import defaultUserData from '../utils/defaultUserData';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from '../context/CurrentUserContext';
import ConfirmDeletePopup from './ConfirmDeletePopup';

function App() {
  const navigate = useNavigate();

  // Состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

  // Состояние карточек и данных пользователя
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(defaultUserData);
  const [removeCard, setRemoveCard] = useState({});

  // Состояние загрузки страницы
  const [isLoading, setIsLoading] = useState(true);

  // Состояние кнопки submit у форм
  const [textSubmitAddPlacePopup, setTextSubmitAddPlacePopup] = useState({ text: 'Создать', disabled: false });
  const [textSubmitProfilePopup, setTextSubmitProfilePopup] = useState({ text: 'Сохранить', disabled: false });
  const [textSubmitAvatarPopup, setTextSubmitAvatarPopup] = useState({ text: 'Создать', disabled: false });
  const [textSubmitConfirmPopup, setTextSubmitConfirmPopup] = useState({ text: 'Да', disabled: false });

  // Получение данных пользователя и карточек
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setIsLoading(false);
        setCards(cardsData);
      })
      .catch((err) => api.logResponseError(err));
  }, []);

  // Функция работы с лайками
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => (item._id === card._id ? newCard : item)));
      })
      .catch((err) => api.logResponseError(err));
  }

  // Функция обработчик добавления новой карточки
  function handleAddPlaceSubmit(data) {
    setTextSubmitAddPlacePopup({ text: 'Сохранение...' });
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => api.logResponseError(err))
      .finally(() => setTextSubmitAddPlacePopup({ text: 'Создать' }));
  }

  // функция обработчик удаления карточки
  function handleCardDelete(cardId) {
    setTextSubmitConfirmPopup({ text: 'Удаление...' });
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => api.logResponseError(err))
      .finally(() => setTextSubmitConfirmPopup({ text: 'Да' }));
  }

  // Функция обработки данных пользователя
  function handleUpdateUser(data) {
    setTextSubmitProfilePopup({ text: 'Сохранение...' });
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => api.logResponseError(err))
      .finally(() => setTextSubmitProfilePopup({ text: 'Сохранить' }));
  }

  // Функция обработки аватара
  function handleUpdateAvatar(data) {
    setTextSubmitAvatarPopup({ text: 'Сохранение...' });
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => api.logResponseError(err))
      .finally(() => setTextSubmitAvatarPopup({ text: 'Создать' }));
  }

  // Функции открытия/закрытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmDeletion(card) {
    setIsConfirmDeletePopupOpen(true);
    setRemoveCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
    setRemoveCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                onConfirmDeletion={handleConfirmDeletion}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          submitButtonState={textSubmitAvatarPopup}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          submitButtonState={textSubmitProfilePopup}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          submitButtonState={textSubmitAddPlacePopup}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmDeletePopup
          removeCard={removeCard}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitButton={handleCardDelete}
          submitButtonState={textSubmitConfirmPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
