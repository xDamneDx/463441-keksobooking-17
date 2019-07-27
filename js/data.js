'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapWidth = mapElement.offsetWidth;
  var pinsList = mapElement.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var KEYCODE = {
    enter: 13,
    esc: 27
  };

  var getRandomNumber = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  };

  window.data = {
    mapElement: mapElement,
    formElement: adForm,
    mapWidth: mapWidth,
    getRandomNumber: getRandomNumber,
    pinsList: pinsList,
    fragment: fragment,
    keyCode: KEYCODE
  };
})();
