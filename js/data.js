'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var mapWidth = mapElement.offsetWidth;
  var pinsListElement = mapElement.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var isPageActive = false;

  var KEYCODE = {
    enter: 13,
    esc: 27
  };

  var getRandomNumber = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  };

  window.data = {
    mainElement: mainElement,
    mapElement: mapElement,
    formElement: adFormElement,
    mapWidth: mapWidth,
    getRandomNumber: getRandomNumber,
    pinsListElement: pinsListElement,
    fragment: fragment,
    pageState: isPageActive,
    keyCode: KEYCODE
  };
})();
