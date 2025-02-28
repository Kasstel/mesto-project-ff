import { deleteCard } from "../scripts/api";
export function createCard(cardTemplate, popupImage, cardInfo, currentUserId, handleLikeClick, openImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  
  cardTitle.textContent = cardInfo.name;

  likeCount.textContent = cardInfo.likes.length;
  
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement, cardInfo._id));
  
  if (cardInfo.likes.some(user => user._id === currentUserId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  

  if (cardInfo.owner._id !== currentUserId){
    cardDeleteButton.style.display = 'none';
  }
  

  cardLikeButton.addEventListener("click",  (event) => {
    handleLikeClick(cardInfo._id, event, likeCount);
  });

  cardImage.addEventListener("click", (evt) =>
    openImagePopup(popupImage, evt.target.src, evt.target.alt)
  );

  
  return cardElement;
}






