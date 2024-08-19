import { likeCard, unlikeCard } from "./api";

function createCard(initialCard, deleteCard, like, openImg, id) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardEl = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardEl.querySelector('.card__image');
  cardImage.setAttribute('src', initialCard.link);
  cardImage.setAttribute('alt', initialCard.name);

  cardEl.querySelector('.card__title').textContent = initialCard.name;

  const deleteButton = cardEl.querySelector('.card__delete-button');

  if (initialCard.owner._id == id) {
    deleteButton.addEventListener('click', () => {
      deleteCard(initialCard._id, cardEl)
    });
  } else {
    deleteButton.remove();
  }

  const likeButton = cardEl.querySelector('.card__like-button');

  const countLikes = (info) => {
    const likeCounter = cardEl.querySelector('.card__like-counter');
    likeCounter.textContent = info;
  };

  likeButton.addEventListener('click', (evt) => {
    like(evt.target, initialCard, countLikes); 
  });

  countLikes(initialCard.likes.length)

  cardImage.addEventListener('click', (evt) => {
    evt.stopPropagation;
    openImg(cardImage);
  });

  return cardEl;
}

//function like(evt) {
//  evt.classList.toggle('card__like-button_is-active');
//}

function like ( button, initialCard, countLikes) {
  if (button.classList.contains('card__like-button_is-active')) {
    unlikeCard(initialCard)
    .then ((data) => {
      button.classList.remove('card__like-button_is-active')
      countLikes(data.likes.length)
    })      
    .catch((err) => {
      console.log(err)
    })
  } else {
    likeCard(initialCard)
    .then ((data) => {
      countLikes(data.likes.length)
      button.classList.add('card__like-button_is-active')
    })
    .catch((err) => {
      console.log(err)
    })
  }      
};

function deleteCardItem(idCard, el) {
  const elPopup = document.querySelector(`[data-id = '${idCard}']`);
  el.remove();
  elPopup.dataset.id = '';
}

export { createCard, deleteCardItem, like };
