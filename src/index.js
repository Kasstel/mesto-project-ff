import "../src/pages/index.css";
import {
  changeAvatar,
  getUserId,
  likeCard,
  unlikeCard,
  getInitialCards,
  changeProfileInfo,
  submitCard,
} from "./scripts/api.js";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

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

const profileImage = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_new-avatar");
const avatarForm = popupAvatar.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input");

profileImage.addEventListener("click", () => openPopup(popupAvatar));

function setButtonLoadingState(button, isLoading, defaultText = "Сохранить") {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
}

function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  setButtonLoadingState(button, true);
  const newAvatarUrl = avatarInput.value;
  changeAvatar(newAvatarUrl)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupAvatar);
      avatarForm.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => setButtonLoadingState(button, false));
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  setButtonLoadingState(button, true);
  changeProfileInfo(nameInput.value, jobInput.value)
    .then((result) => {
      (name.textContent = result.name), (job.textContent = result.about);
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => setButtonLoadingState(button, false));
}

function handleCreateCardSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  setButtonLoadingState(button, true);
  Promise.all([submitCard(cardTitle.value, cardLink.value), getUserId()])
    .then(([result, userId]) => {
      const cardElement = createCard(
        cardTemplate,
        popupImage,
        result,
        userId._id,
        handleLikeClick,
        openImagePopup
      );
      cardUzel.prepend(cardElement);
      evt.target.reset();
      closePopup(popupNew);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonLoadingState(button, false);
    });
}

export function handleLikeClick(cardId, event, likeCountElement) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const request = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  request
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.error("Ошибка при обновлении лайка:", err));
}

avatarForm.addEventListener("submit", () => {
  handleUpdateAvatarSubmit, clearValidation(avatarForm, validationConfig);
});

function openImagePopup(popup, imageSrc, imageAlt) {
  popupImg.src = imageSrc;
  popupImg.alt = imageAlt;
  popupText.textContent = imageAlt;
  openPopup(popup);
}

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  clearValidation(editForm, validationConfig);
});

addButton.addEventListener("click", () => {
  openPopup(popupNew);
  clearValidation(createForm, validationConfig);
});

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

editForm.addEventListener("submit", handleProfileFormSubmit);

createForm.addEventListener("submit", handleCreateCardSubmit);

function addCard() {
  Promise.all([getInitialCards(), getUserId()]).then(([cards, userId]) => {
    cards.forEach((card) => {
      const cardElement = createCard(
        cardTemplate,
        popupImage,
        card,
        userId._id,
        handleLikeClick,
        openImagePopup
      );
      cardUzel.append(cardElement);
    });
  });
}

addCard();

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation(validationConfig);
