import '../src/pages/index.css';
import {initialCards} from './scripts/cards.js'


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardUzel = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardInfo, removeCard, likeImage, openImagePopup){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button')

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  cardDeleteButton.addEventListener('click', ()=>removeCard(cardElement));

  cardLikeButton.addEventListener('click', likeImage)

  cardImage.addEventListener('click', (evt) => openImagePopup(popupImage, evt.target.src, evt.target.alt))

  return cardElement

} 

// @todo: Функция удаления карточки

function removeCard (el){
  el.remove()
}

// @todo: Вывести карточки на страницу

function addCard(initialCards){
  initialCards.forEach(cards => {
    const cardElement = createCard(cards, removeCard, likeImage, openImagePopup);
    cardUzel.append(cardElement);
  });
}


function likeImage(el){
  if (el.target.classList.contains('card__like-button')){
    el.target.classList.toggle('card__like-button_is-active')
  }
}



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
const popupImage = document.querySelector(".popup_type_image");

function openImagePopup(popup, imageSrc,imageAlt){
    const popupImg = popup.querySelector(".popup__image");
    const popupText = popup.querySelector(".popup__caption") ;

    popupImg.src = imageSrc;
    popupText.textContent = imageAlt;
    openPopup(popup)
}

// Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
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
const editForm = document.forms["edit-profile"]// Воспользуйтесь методом querySelector()
const createForm = document.forms["new-place"]
// Находим поля формы в DOM
const nameInput = editForm.elements.name // Воспользуйтесь инструментом .querySelector()
const jobInput = editForm.elements.description// Воспользуйтесь инструментом .querySelector()

const cardTitle = createForm.elements["place-name"]
const cardLink = createForm.elements.link


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const name = document.querySelector('.profile__title')
    const job = document.querySelector('.profile__description')
    name.textContent = nameInput.value
    job.textContent = jobInput.value
    closePopup(popupEdit)
}

// функция добавления карточки
function handleCreateSubmit(evt) {
    evt.preventDefault(); 
    const initialCard = { 
      name: cardTitle.value, 
      link: cardLink.value 
    }
    const cardElement = createCard(initialCard, removeCard, likeImage, openImagePopup);
    cardUzel.prepend(cardElement);
}

editForm.addEventListener('submit', handleFormSubmit);

createForm.addEventListener('submit', handleCreateSubmit)

addCard(initialCards);
