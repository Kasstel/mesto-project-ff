import "../src/pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  handleFormSubmit,
  handleCreateSubmit,
  openEditPopup,
} from "./components/modal.js";

export const cardTemplate = document.querySelector("#card-template").content;

export const cardUzel = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNew = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");

const editForm = document.forms["edit-profile"];
const createForm = document.forms["new-place"];

export const nameInput = editForm.elements.name;
export const jobInput = editForm.elements.description;

export const cardTitle = createForm.elements["place-name"];
export const cardLink = createForm.elements.link;

// Назначаем обработчики кликов для открытия
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__description");
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

editForm.addEventListener("submit", handleFormSubmit);

createForm.addEventListener("submit", handleCreateSubmit);

addCard(initialCards);
