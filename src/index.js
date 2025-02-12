import "../src/pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  openPopup,
  closePopup
} from "./components/modal.js";
import {createCard, removeCard, likeImage} from './components/card.js'


const cardTemplate = document.querySelector("#card-template").content;

const cardUzel = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNew = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const editForm = document.forms["edit-profile"];
const createForm = document.forms["new-place"];

const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

const cardTitle = createForm.elements["place-name"];
const cardLink = createForm.elements.link;

const popupImg = popupImage.querySelector(".popup__image");
const popupText = popupImage.querySelector(".popup__caption");

const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");


function openImagePopup(popup, imageSrc, imageAlt) {
  popupImg.src = imageSrc;
  popupImg.alt = imageAlt;
  popupText.textContent = imageAlt;
  openPopup(popup);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEdit);
}

// функция добавления карточки
function handleCreateCardSubmit(evt) {
  evt.preventDefault();
  const initialCard = {
    name: cardTitle.value,
    link: cardLink.value,
  };
  const cardElement = createCard(
    cardTemplate, 
    popupImage,
    initialCard,
    removeCard,
    likeImage,
    openImagePopup
  );
  cardUzel.prepend(cardElement);
  evt.target.reset();
  closePopup(popupNew);
}
// Назначаем обработчики кликов для открытия
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

addButton.addEventListener("click", () => openPopup(popupNew));

// Закрытие по клику на крестик или фон
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

// @todo: Вывести карточки на страницу

function addCard(initialCards) {
  initialCards.forEach((cards) => {
    const cardElement = createCard(
      cardTemplate, 
      popupImage,
      cards,
      removeCard,
      likeImage,
      openImagePopup
    );
    cardUzel.append(cardElement);
  });
}


editForm.addEventListener("submit", handleProfileFormSubmit);

createForm.addEventListener("submit", handleCreateCardSubmit);

addCard(initialCards);

