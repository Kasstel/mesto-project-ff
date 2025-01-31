import '../src/pages/index.css';
import {initialCards} from './scripts/cards.js'


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



// Закрытие по Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

const popups = document.querySelectorAll(".popup");

// Кнопки для открытия модалок
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Сами модальные окна
const popupEdit = document.querySelector(".popup_type_edit");
const popupNew = document.querySelector(".popup_type_new-card");

// Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Назначаем обработчики кликов для открытия
editButton.addEventListener("click", () => openPopup(popupEdit));
addButton.addEventListener("click", () => openPopup(popupNew));

// Закрытие по клику на крестик или фон
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

// Находим форму в DOM
const form = document.forms["edit-profile"]// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = form.elements.name // Воспользуйтесь инструментом .querySelector()
const jobInput = form.elements.description// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value 
    
    // Выберите элементы, куда должны быть вставлены значения полей
    const name = document.querySelector('.profile__title')
    const job = document.querySelector('.profile__description')
    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value
    job.textContent = jobInput.value
    closePopup(popupEdit)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit);