class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  // Проверку статуса ответа сервера
  _checkStatus(res) {
    return res.ok ? res.json() : Promise.reject
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkStatus)
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkStatus)
  }

  // Редактирование профиля
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.about,
      })
    })
    .then(this._checkStatus)
  }

  // Обновление аватара пользователя
  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkStatus)
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkStatus)
  }

  // Постановка и снятие лайка
  likeCard(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkStatus)
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkStatus)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '8c0bfa3a-29d7-4fdb-9051-2e4437aa602f',
    'Content-Type': 'application/json'
  }
});

export default api;