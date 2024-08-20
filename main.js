(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/wff-cohort-19",headers:{authorization:"29a8c021-de30-4f9e-95db-742a89e566c5","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image");a.setAttribute("src",e.link),a.setAttribute("alt",e.name),c.querySelector(".card__title").textContent=e.name;var i=c.querySelector(".card__delete-button");e.owner._id==r?i.addEventListener("click",(function(){t(e._id,c)})):i.remove();var u=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-counter");return l.textContent=e.likes.length,e.likes.some((function(e){return e._id===r}))&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(t){n(u,l,e)})),a.addEventListener("click",(function(e){e.stopPropagation,o(a)})),c}function o(n,o,r){var c;n.classList.contains("card__like-button_is-active")?(c=r,fetch("".concat(e.baseUrl,"/cards/like/").concat(c._id),{headers:e.headers,method:"DELETE"}).then((function(e){return t(e)}))).then((function(e){n.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/like/").concat(n._id),{headers:e.headers,method:"PUT"}).then((function(e){return t(e)}))}(r).then((function(e){o.textContent=e.likes.length,n.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function r(e){e.classList.add("popup_is-opened"),document.body.classList.add("scroll-lock"),e.addEventListener("click",a),document.addEventListener("keydown",i)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),e.removeEventListener("click",a),document.body.classList.remove("scroll-lock")}function a(e){e.stopPropagation(),e.target.classList.contains("popup_is-opened")&&c(e.target.closest(".popup"))}function i(e){e.stopPropagation(),"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var u=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent="",t.setCustomValidity("")};function l(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t),n.value=""})),function(e,t){e.classList.add(t.inactiveButtonClass),e.setAttribute("disabled","disabled")}(o,t)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var d=document.querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__add-button"),m=document.querySelectorAll(".popup__close"),v=document.querySelectorAll(".popup"),_=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),b=document.querySelector(".popup_type_edit_avatar"),S=h.querySelector(".popup__image"),L=h.querySelector(".popup__caption"),k=document.querySelector(".popup_type_delete"),g=document.querySelector(".profile__info"),q=g.querySelector(".profile__title"),E=g.querySelector(".profile__description"),C=document.querySelector(".profile__image"),A=document.forms["edit-profile"],x=A.elements.name,U=A.elements.description,w=document.forms["edit-avatar"],P=w.elements["avatar-link"],T=document.forms["new-place"],j=T.elements["place-name"],B=T.elements.link,O=k.querySelector(".popup_type_delete__button"),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function I(e){S.src=e.src,S.alt=e.alt,L.textContent=e.alt,r(h)}function M(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}function N(e){q.textContent=e.name,E.textContent=e.about,C.style.backgroundImage="url(".concat(e.avatar,")")}function J(n,o){r(k),k.dataset.id=n,O.addEventListener("click",(function(){var r;(r=n,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){e&&(function(e,t){var n=document.querySelector("[data-id = '".concat(e,"']"));t.remove(),n.dataset.id=""}(n,o),c(k)),O.removeaddEventListener})).catch((function(e){return console.log(e)}))}),!0)}v.forEach((function(e){e.classList.add("popup_is-animated")})),A.addEventListener("submit",(function(n){var o;n.preventDefault(),M(!0,_),(o={name:x.value,about:U.value},fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers,method:"PATCH",body:JSON.stringify({name:o.name,about:o.about})}).then((function(e){return t(e)}))).then((function(e){N(e),c(_),A.reset()})).catch((function(e){console.log(e)})).finally((function(){M(!1,_)}))})),p.addEventListener("click",(function(){x.value=q.textContent,U.value=E.textContent,r(_),l(A,D)})),w.addEventListener("submit",(function(n){var o;n.preventDefault(),M(!0,b),(o={avatar:P.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{headers:e.headers,method:"PATCH",body:JSON.stringify({avatar:o.avatar})}).then((function(e){return t(e)}))).then((function(e){N(e),c(b),w.reset()})).catch((function(e){console.log(e)})).finally((function(){M(!1,b)}))})),C.addEventListener("click",(function(){r(b),l(w,D)})),T.addEventListener("submit",(function(r){var a;r.preventDefault(),M(!0,y),(a={link:B.value,name:j.value},fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers,method:"POST",body:JSON.stringify({name:a.name,link:a.link})}).then((function(e){return t(e)}))).then((function(e){d.prepend(n(e,J,o,I,e.owner._id)),c(y),T.reset()})).catch((function(e){console.log(e)})).finally((function(){M(!1,y)}))})),f.addEventListener("click",(function(){r(y),l(T,D),T.reset()})),m.forEach((function(e){e.addEventListener("click",(function(e){e.stopPropagation,c(e.target.closest(".popup"))}))})),function(e){var t=Array.from(document.querySelectorAll(e.formSelector)),n=function(t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))};t.forEach((function(t){!function(t){var o=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n(o,r),o.forEach((function(c){c.addEventListener("input",(function(){(function(t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?u(t,n,e):function(t,n,o){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),r.textContent=o,r.classList.add(e.errorClass)}(t,n,n.validationMessage)})(t,c),n(o,r)}))}))}(t)}))}(D),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,r,c=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],i=c[1],u=a._id;N(a),i.forEach((function(e){return t=e,r=u,void d.prepend(n(t,J,o,I,r));var t,r}))})).catch((function(e){console.log(e)}))})();