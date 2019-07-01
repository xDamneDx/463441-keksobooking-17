'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapWidth = mapElement.offsetWidth;

  var QUANTITY_OF_OFFERS = 8;

  var getRandomNumber = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  };

  var addClass = function (element, elClass) {
    element.classList.add(elClass);
  };

  var removeClass = function (element, elClass) {
    element.classList.remove(elClass);
  };

  var getOffersData = function (quantity) {
    var offersData = [];
    var avatarNumber = 0;
    var getRandomData = function () {
      var offers = ['palace', 'flat', 'house', 'bungalo'];
      var getAvatarSrc = function (number) {
        return 'img/avatars/user' + ((number < 10) ? '0' : '') + number + '.png';
      };
      var data = {
        author: {
          avatar: getAvatarSrc(avatarNumber + 1)
        },
        offer: {
          type: offers[getRandomNumber(0, offers.length - 1)]
        },
        location: {
          x: getRandomNumber(0, mapWidth),
          y: getRandomNumber(130, 630)
        }
      };
      return data;
    };
    for (var i = 0; i < quantity; i++) {
      avatarNumber = i;
      offersData[i] = getRandomData();
    }
    return offersData;
  };

  var offers = getOffersData(QUANTITY_OF_OFFERS);

  window.data = {
    mapElement: mapElement,
    formElement: adForm,
    mapWidth: mapWidth,
    getRandomNumber: getRandomNumber,
    addClass: addClass,
    removeClass: removeClass,
    offers: offers
  };
})();
