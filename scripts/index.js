const placesList = document.querySelector('.places__list');

function addCard(initialCard, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardEl = cardTemplate.querySelector('.places__item').cloneNode(true);
    
  const cardImage = cardEl.querySelector('.card__image');
  cardImage.setAttribute('src', initialCard.link);
  cardImage.setAttribute('alt', initialCard.name);
    
  cardEl.querySelector('.card__title').textContent = initialCard.name;
          
  const deleteButton = cardEl.querySelector('.card__delete-button');
    
  deleteButton.addEventListener('click', function(evt) {
    deleteCard(cardEl);
  })

  return cardEl;
}

const deleteCard = (el) => {
  el.remove();
}

initialCards.forEach((item) => {
  placesList.append(addCard(item, deleteCard));
})