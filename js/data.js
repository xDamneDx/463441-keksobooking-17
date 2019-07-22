'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapWidth = mapElement.offsetWidth;
  var pinsList = mapElement.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

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
    mapWidth: mapWidth,
    getRandomNumber: getRandomNumber,
    addClass: addClass,
    removeClass: removeClass,
    pinsList: pinsList,
    fragment: fragment
  };
})();
