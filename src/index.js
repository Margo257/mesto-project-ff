import './pages/index.css';
//import { initialCards } from './components/cards';
import { createCard, deleteCardItem, like } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { enableValidation, clearValidation} from './components/validation';
import { getProfileData, getInitialCards, sendCardInfo, updateProfileData, updateAvatar, deleteCardRequest } from './components/api';

const placesList = document.querySelector('.places__list');

//РЕДАКТИРОВАТЬ
const profileEditButton = document.querySelector('.profile__edit-button');
//+
const profileAddButton = document.querySelector('.profile__add-button');
//кнопка закрытия
const popupsСlose = document.querySelectorAll('.popup__close');

//попапы
const popupAll = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeAvatar = document.querySelector('.popup_type_edit_avatar');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupDelete = document.querySelector('.popup_type_delete');


//профиль
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
//формы
//редактирование профиля
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

//изменение аватара
const formEditAvatar = document.forms['edit-avatar'];
const avatarInputUrl = formEditAvatar.elements['avatar-link']

//добавление карточки
const formAddCard = document.forms['new-place'];
const cardNameInput = formAddCard.elements['place-name'];
const cardInputUrl = formAddCard.elements['link'];

//удаление карточки 
const popupDeleteButton = popupDelete.querySelector('.popup_type_delete__button');

// все настройки передаются при вызове
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function renderCard (item, id) {
  placesList.prepend(createCard(item, deleteCard, like, openImg, id))
}


function openImg(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openPopup(popupTypeImage);
}


//сохранение...
function renderLoading ( isloading, popupAll) {
  const saveButton = popupAll.querySelector('.popup__button');
  if (isloading) {
    saveButton.textContent = 'Сохранение...'
  } else {
    saveButton.textContent = 'Сохранить'
  }
}

//Заполняет профиль на основе данных с сервера
function changeProfileData (data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
}

function deleteCard ( idCard, card) {
  openPopup(popupDelete);
  popupDelete.dataset.id = idCard;
  popupDeleteButton.addEventListener(
    'click', () => {
      deleteCardRequest(idCard)
      .then((res) => {
        if (res) {
          deleteCardItem(idCard, card);
          closePopup(popupDelete);
        }popupDeleteButton.removeaddEventListener
      })
      .catch((err) => console.log(err));
  },
  true
);

}

function handleFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, popupTypeEdit);

  const profileData = {
    name: nameInput.value,
    about: jobInput.value
  }

  updateProfileData(profileData)
  .then((data) => {
    changeProfileData (data);
    closePopup(popupTypeEdit);
    formEditProfile.reset();
  })
  .catch((err) => { 
    console.log(err)
  })
  .finally(()=>{
    renderLoading(false, popupTypeEdit);
  })
};

function handleFormAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeAvatar);
  
  const avatarInput = {
    avatar: avatarInputUrl.value
  };
    
  updateAvatar(avatarInput)
    .then((data) => {
    changeProfileData(data);
    closePopup (popupTypeAvatar);
    formEditAvatar.reset();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, popupTypeAvatar)
  });
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeNewCard);   

  const newCard = {
    link: cardInputUrl.value,
    name: cardNameInput.value,
  };

  sendCardInfo(newCard)
  .then((res) => {
     placesList.prepend(createCard(res, deleteCard, like, openImg, res.owner._id));
    closePopup(popupTypeNewCard);
    formAddCard.reset();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, popupTypeNewCard)
  })  
}

//animation
popupAll.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

formEditProfile.addEventListener('submit', handleFormSubmit);
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupTypeEdit);
  clearValidation(formEditProfile, configValidation);
});

formEditAvatar.addEventListener('submit', handleFormAvatar)

profileImage.addEventListener('click', () => {
  openPopup(popupTypeAvatar);
  clearValidation(formEditAvatar, configValidation);
})

formAddCard.addEventListener('submit', handleFormAddCardSubmit);

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  clearValidation(formAddCard, configValidation);
  formAddCard.reset();
});

//закрываем попапы
popupsСlose.forEach((buttonClose) => {
  buttonClose.addEventListener('click', function (evt) {
    evt.stopPropagation;
    closePopup(evt.target.closest('.popup'));
  });
});
// включение валидации вызовом enableValidation
enableValidation(configValidation);

Promise.all([getProfileData(), getInitialCards()])
  .then((res) => {
    const [userData, arrCard] = res;
    const  idUser = userData._id;
    changeProfileData (userData);
    arrCard.forEach((el) => renderCard (el, idUser));
  })
  .catch((err) => {
    console.log(err)
  });