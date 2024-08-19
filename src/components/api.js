//Токен: 29a8c021-de30-4f9e-95db-742a89e566c5
//Идентификатор группы: wff-cohort-19

// запрос к серверу
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/wff-cohort-19',
  headers: {
    authorization: '29a8c021-de30-4f9e-95db-742a89e566c5',
    'Content-Type': 'application/json',
  },
};

// Функция обработки запроса
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

//Загрузка информации о пользователе с сервера

const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

const sendCardInfo = (info) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: info.name,
      link: info.link,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

const updateProfileData = (info) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: info.name,
      about: info.about,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

const updateAvatar = (info) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: info.avatar,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

const deleteCardRequest = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  }).then((res) => {
    return handleResponse(res);
  });
};

const likeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`, {
    headers: config.headers,
    method: 'PUT',
  }).then((res) => {
    return handleResponse(res);
  });
};

const unlikeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then((res) => {
    return handleResponse(res);
  });
};


export { getProfileData, getInitialCards, sendCardInfo, updateProfileData, updateAvatar,  likeCard, unlikeCard, deleteCardRequest }