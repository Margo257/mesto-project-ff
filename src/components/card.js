function createCard(initialCard, deleteCard, like, openImg) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardEl = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardEl.querySelector('.card__image');
  cardImage.setAttribute('src', initialCard.link);
  cardImage.setAttribute('alt', initialCard.name);

  cardEl.querySelector('.card__title').textContent = initialCard.name;

  const deleteButton = cardEl.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
    deleteCard(cardEl);
  });

  const likeButton = cardEl.querySelector('.card__like-button');

  likeButton.addEventListener('click', (evt) => {
    like(evt.target);
  });

  cardImage.addEventListener('click', (evt) => {
    evt.stopPropagation;
    openImg(cardImage);
  });

  return cardEl;
}

function like(evt) {
  evt.classList.toggle('card__like-button_is-active');
}

function deleteCard(el) {
  el.remove();
}

export { createCard, deleteCard, like };
