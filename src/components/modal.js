function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.body.classList.add('scroll-lock');
  popup.addEventListener('click', closeOnOverlayClick);
  document.addEventListener('keydown', closeOnEsc);
}

function returnScroll() {
  document.body.classList.remove('scroll-lock');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEsc);
  popup.removeEventListener('click', closeOnOverlayClick);
  returnScroll();
}

function closeOnOverlayClick(evt) {
  evt.stopPropagation();
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target.closest('.popup'));
  }
}

function closeOnEsc(evt) {
  evt.stopPropagation();

  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closePopup(popupIsOpened);
  }
}

export { openPopup, closePopup };
