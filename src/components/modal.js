import { createCard, removeCard, likeImage } from "../components/card.js";
import {
  nameInput,
  jobInput,
  cardTitle,
  cardLink,
  popupEdit,
  popupNew,
  cardUzel,
} from "../index.js";

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openImagePopup(popup, imageSrc, imageAlt) {
  const popupImg = popup.querySelector(".popup__image");
  const popupText = popup.querySelector(".popup__caption");

  popupImg.src = imageSrc;
  popupImg.alt = imageAlt;
  popupText.textContent = imageAlt;
  openPopup(popup);
}

// Функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", handleEscClose);
}


// Функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
export function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__description");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEdit);
}

// функция добавления карточки
export function handleCreateSubmit(evt) {
  evt.preventDefault();
  const initialCard = {
    name: cardTitle.value,
    link: cardLink.value,
  };
  const cardElement = createCard(
    initialCard,
    removeCard,
    likeImage,
    openImagePopup
  );
  cardUzel.prepend(cardElement);
  cardTitle.value = ''
  cardLink.value = ''
  closePopup(popupNew);
}
