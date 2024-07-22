import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, like } from './components/card';
import { openPopup, close } from './components/modal';

const placesList = document.querySelector('.places__list');

//РЕДАКТИРОВАТЬ
const profileEditButton = document.querySelector('.profile__edit-button');
//+
const profileAddButton = document.querySelector('.profile__add-button');
//кнопка закрытия
const popupСlose = document.querySelectorAll('.popup__close');

//попапы
const popupAll = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

//профиль
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
//формы
//редактирование профиля
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

//добавление карточки
const formAddCard = document.forms['new-place'];
const cardNameInput = formAddCard.elements['place-name'];
const cardInputUrl = formAddCard.elements['link'];

function openImg(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openPopup(popupTypeImage);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  close(popupTypeEdit);
  formEditProfile.reset();
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    link: cardInputUrl.value,
    name: cardNameInput.value,
  };

  placesList.prepend(createCard(newCard, deleteCard, like, openImg));

  close(popupTypeNewCard);
  formAddCard.reset();
}

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, like, openImg));
});

//animation
popupAll.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

formEditProfile.addEventListener('submit', handleFormSubmit);

formAddCard.addEventListener('submit', handleFormAddCardSubmit);

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
});

//закрываем попапы
popupСlose.forEach((buttonClose) => {
  buttonClose.addEventListener('click', function (evt) {
    evt.stopPropagation;
    close(evt.target.closest('.popup'));
  });
});