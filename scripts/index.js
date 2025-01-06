// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardUzel = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardInfo, removeCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  cardDeleteButton.addEventListener('click', ()=>removeCard(cardElement));

  return cardElement

} 

// @todo: Функция удаления карточки

function removeCard (el){
  el.remove()
}

// @todo: Вывести карточки на страницу

function addCard(initialCards){
  initialCards.forEach(cards => {
    const cardElement = createCard(cards,removeCard);
    cardUzel.append(cardElement);
  });
}

addCard(initialCards);
