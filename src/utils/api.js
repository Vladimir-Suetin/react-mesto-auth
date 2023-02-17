import apiConfig from './apiConfig';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
  }

  logResponseError(err) {
    return console.log(`Запрос не выполнен. ${err}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  _setLike(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  _deleteLike(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(idCard, isLiked) {
    if (isLiked) {
      return this._setLike(idCard);
    } else {
      return this._deleteLike(idCard);
    }
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api(apiConfig);

export default api;
