'use strict';

var QUANTITY_OF_OFFERS = 8;
var MAIN_PIN = {
  width: 65,
  height: 65
};
var PIN = {
  width: 40,
  height: 44
};
var MIN_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
  default: 100
};
var mapElement = document.querySelector('.map');
var mapFilters = mapElement.querySelector('.map__filters');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = mapElement.querySelector('.map__pins');
var mainPin = pinsList.querySelector('.map__pin--main');
var fragment = document.createDocumentFragment();
var adForm = document.querySelector('.ad-form');
var adFormAddressInput = adForm.querySelector('input[name="address"]');
var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
var mapWidth = mapElement.offsetWidth;
var noticeElement = document.querySelector('.notice');
var typeSelect = noticeElement.querySelector('#type');
var timeInSelect = noticeElement.querySelector('#timein');
var timeOutSelect = noticeElement.querySelector('#timeout');
var typeSelectOptions = typeSelect.querySelectorAll('option');
var priceInput = noticeElement.querySelector('#price');

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

var renderPin = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = (offer.location.x - (PIN.width / 2)) + 'px';
  pinElement.style.top = (offer.location.y - PIN.height) + 'px';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.type;
  return pinElement;
};

var getPinsElements = function () {
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
};

var setMinPriceValue = function (type) {
  var setValue = function (value) {
    priceInput.min = value;
    priceInput.placeholder = value;
  };
  switch (type) {
    case 'bungalo':
      setValue(MIN_PRICE.bungalo);
      break;
    case 'flat':
      setValue(MIN_PRICE.flat);
      break;
    case 'house':
      setValue(MIN_PRICE.house);
      break;
    case 'palace':
      setValue(MIN_PRICE.palace);
      break;
    default:
      setValue(MIN_PRICE.default);
  }
};

var setSelectedMinPriceValue = function () {
  for (var i = 0; i < typeSelectOptions.length; i++) {
    if (typeSelectOptions[i].selected) {
      setMinPriceValue(typeSelectOptions[i].value);
      i = typeSelectOptions.length;
    } else {
      setMinPriceValue(typeSelectOptions[0].value);
    }
  }
};

var activePageStateHandler = function () {
  activePageState();
  getPinsElements();
  pinsList.appendChild(fragment);
  mainPin.removeEventListener('click', activePageStateHandler);
};

var toggleFieldsetsState = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = !adFormFieldsets[i].disabled;
  }
};

var inactivePageState = function () {
  addClass(mapElement, 'map--faded');
  addClass(adForm, 'ad-form--disabled');
  addClass(mapFilters, 'map__filters--disabled');
  toggleFieldsetsState();
};

var activePageState = function () {
  removeClass(mapElement, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');
  removeClass(mapFilters, 'map__filters--disabled');
  toggleFieldsetsState();
  setSelectedMinPriceValue();
};

inactivePageState();

var getMainPinCoordinates = function () {
  var x = mainPin.style.left + MAIN_PIN.width / 2;
  var y = mainPin.style.top + MAIN_PIN.height / 2;
  return parseInt(x, 10) + ', ' + parseInt(y, 10);
};

mainPin.addEventListener('click', activePageStateHandler);
mainPin.addEventListener('mouseup', function () {
  adFormAddressInput.value = getMainPinCoordinates();
});
typeSelect.addEventListener('change', function (evt) {
  setMinPriceValue(evt.target.value);
});
timeInSelect.addEventListener('change', function (evt) {
  timeOutSelect.selectedIndex = evt.target.selectedIndex;
});
timeOutSelect.addEventListener('change', function (evt) {
  timeInSelect.selectedIndex = evt.target.selectedIndex;
});
