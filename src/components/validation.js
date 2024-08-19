const hideInputError = (formElement, inputElement,configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configValidation.inputErrorClass);
    errorElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = '';
};

const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configValidation.errorClass);
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity('');
}

if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement, configValidation);
}
}; 

const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(configValidation.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
  }
}

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, );

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
    });
};

  formList.forEach((formElement) => {
    setEventListeners(formElement);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
   });  
};

// очистка ошибок валидации вызовом clearValidation и отключение кнопки
function clearValidation (formElement, configValidation){
  const inputElements = Array.from(formElement.querySelectorAll(configValidation.inputSelector));


  inputElements.forEach((inputElement) => {
      hideInputError(formElement, inputElement, configValidation);  
  });
}   


  export {enableValidation, clearValidation }

