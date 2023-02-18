import React from 'react';
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
import Login from './Login';
import Register from './Register';
import * as userAuth from '../utils/userAuth';

function App() {
  const navigate = useNavigate();

  // Данные пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState({ email: '' });

  // Состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [userMessage, setUserMessage] = useState(null);

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

  // Запуск проверки токена при загрузке страницы
  useEffect(() => {
    tokenCheck();
  }, []);

  // Функция выхода из учетной записи
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  // Функция авторизации
  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      userAuth.getContent(jwt).then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
        navigate('/');
      });
    }
  }

  // Функция изменения состояния login
  function handleLogin({ email }) {
    setLoggedIn(true);
    setUserEmail(email);
    navigate('/');
  }

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

  // Функция обработки сообщения пользователю
  function handleUserMessage(message) {
    setUserMessage(message);
  }

  // // Функция авторизации
  // function handleLogin(data) {
  //   return userAuth.authorize({username, password}).then((data) => {
  //     if (data.jwt) {
  //       localStorage.setItem('jwt', data.jwt);
  //       setLoggedIn(true);
  //       setUserData({
  //         username: data.user.username,
  //         email: data.user.email,
  //       });
  //       navigate('/');
  //     }
  //   });
  // }

  // // Функция регистрации
  // function handleRegister({ password, email }) {
  //   return userAuth.register(password, email).then(() => {
  //     navigate('/login');
  //   });
  // }

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
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                onConfirmDeletion={handleConfirmDeletion}
                isLoading={isLoading}
                userEmail={userEmail}
                onLogout={handleLogout}
                component={Main
                  // <Main
                  //   onEditProfile={handleEditProfileClick}
                  //   onAddPlace={handleAddPlaceClick}
                  //   onEditAvatar={handleEditAvatarClick}
                  //   cards={cards}
                  //   onCardLike={handleCardLike}
                  //   onCardClick={handleCardClick}
                  //   onConfirmDeletion={handleConfirmDeletion}
                  //   isLoading={isLoading}
                  //   userEmail={userEmail}
                  //   onLogout={handleLogout}
                  // />
                }
              />
            }
          />
          <Route path='/sign-in' element={<Login handleUserMessage={handleUserMessage} onLogin={handleLogin} />} />
          <Route path='/sign-up' element={<Register handleUserMessage={handleUserMessage} />} />
          <Route path='*' element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />} />
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
