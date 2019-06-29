'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var getRandomNumber = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  };

  var addClass = function (element, elClass) {
    element.classList.add(elClass);
  };

  var removeClass = function (element, elClass) {
    element.classList.remove(elClass);
  };

  window.data = {
    mapElement: mapElement,
    formElement: adForm,
    getRandomNumber: getRandomNumber,
    addClass: addClass,
    removeClass: removeClass
  };
})();
