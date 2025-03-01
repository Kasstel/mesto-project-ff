import "../src/pages/index.css";
import {
  changeAvatar,
  getUserId,
  getInitialCards,
  changeProfileInfo,
  submitCard,
} from "./scripts/api.js";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, handleLikeClick } from "./components/card.js";
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

profileImage.addEventListener("click", () => {
  openPopup(popupAvatar), clearValidation(avatarForm, validationConfig);
});

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
  console.log(newAvatarUrl);
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
      initUserProfile(userId);
      const cardElement = createCard(
        cardTemplate,
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

avatarForm.addEventListener("submit", handleUpdateAvatarSubmit);

function openImagePopup(imageSrc, imageAlt) {
  popupImg.src = imageSrc;
  popupImg.alt = imageAlt;
  popupText.textContent = imageAlt;
  openPopup(popupImage);
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

function initUserProfile(userData) {
  console.log(userData);
  name.textContent = userData.name;
  job.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function addCard() {
  Promise.all([getInitialCards(), getUserId()])
    .then(([cards, userId]) => {
      initUserProfile(userId);
      cards.forEach((card) => {
        const cardElement = createCard(
          cardTemplate,
          card,
          userId._id,
          handleLikeClick,
          openImagePopup
        );
        cardUzel.append(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
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
