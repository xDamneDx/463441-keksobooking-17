'use strict';

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var mapWidth = mapElement.offsetWidth;
var QUANTITY_OF_OFFERS = 8;
var PIN = {
  width: 40,
  height: 44
};

var getRandomNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
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
        type: offers[getRandomNumber(0, offers.length + 1)]
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

var renderPin = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (offer.location.x - (PIN.width / 2)) + 'px; top: ' + (offer.location.y - PIN.height) + 'px;';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.type;
  return pinElement;
};

var getPinsElements = function () {
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
};

getPinsElements();

pinsList.appendChild(fragment);
