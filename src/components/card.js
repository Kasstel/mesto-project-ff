import { cardTemplate, cardUzel, popupImage } from "../index.js";
import { openImagePopup } from "./modal.js";

export function createCard(cardInfo, removeCard, likeImage, openImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  cardDeleteButton.addEventListener("click", () => removeCard(cardElement));

  cardLikeButton.addEventListener("click", likeImage);

  cardImage.addEventListener("click", (evt) =>
    openImagePopup(popupImage, evt.target.src, evt.target.alt)
  );

  return cardElement;
}

// @todo: Функция удаления карточки

export function removeCard(el) {
  el.remove();
}

// @todo: Вывести карточки на страницу

export function addCard(initialCards) {
  initialCards.forEach((cards) => {
    const cardElement = createCard(
      cards,
      removeCard,
      likeImage,
      openImagePopup
    );
    cardUzel.append(cardElement);
  });
}

export function likeImage(el) {
  if (el.target.classList.contains("card__like-button")) {
    el.target.classList.toggle("card__like-button_is-active");
  }
}
