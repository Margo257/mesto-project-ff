function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.body.classList.add('scroll-lock');
    popup.addEventListener('click', closeOnOverlayClick);
    document.addEventListener('keydown', closeOnEsc);
  }
  
  function returnScroll() {
    document.body.classList.remove('scroll-lock')
  }

  function close(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc);
    returnScroll()
  }

  function closeOnOverlayClick(evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains('popup_is-opened')) {      
      close(evt.target.closest('.popup'));
    }
  } 
  
  function closeOnEsc (evt) {
    evt.stopPropagation();
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {      
    close(popupIsOpened);
    }
  } 
  
export {openPopup, close}; 