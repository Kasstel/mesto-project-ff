// @todo: Вывести карточки на страницу
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: '383c7c9f-381f-4411-bec7-a9d34b8d8dd0',
    'Content-Type': 'application/json'
  }
}

export const changeAvatar = (newAvatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '383c7c9f-381f-4411-bec7-a9d34b8d8dd0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: newAvatarUrl })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
}

export const  getUserId = () =>{
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: '383c7c9f-381f-4411-bec7-a9d34b8d8dd0'
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((userData) => userData); // Теперь возвращает объект пользователя
}



// Функция постановки лайка
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
};

export const deleteCard = (cardElement, cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => console.log(err));
}


export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    }); 
    
} 


export const changeProfileInfo = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job
    }
    )
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    }); 
    
} 


export const submitCard = (title, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST', 
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: link
    }
    )
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    }); 
}

