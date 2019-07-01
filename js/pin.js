'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsList = window.data.mapElement.querySelector('.map__pins');
  var mainPin = pinsList.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  var MAIN_PIN = {
    width: 64,
    height: 86
  };
  var MAIN_PIN_LIMITS = {
    yMin: 130 - MAIN_PIN.height,
    yMax: 630 - MAIN_PIN.height,
    xMin: -MAIN_PIN.width / 2,
    xMax: window.data.mapWidth - MAIN_PIN.width / 2
  };
  var PIN = {
    width: 40,
    height: 44
  };

  var renderPin = function (offer) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (offer.location.x - (PIN.width / 2)) + 'px';
    pinElement.style.top = (offer.location.y - PIN.height) + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.type;
    return pinElement;
  };

  var getPinsElements = function () {
    for (var i = 0; i < window.data.offers.length; i++) {
      fragment.appendChild(renderPin(window.data.offers[i]));
    }
  };

  var getMainPinCoordinates = function () {
    var x = parseInt(mainPin.style.left, 10) + MAIN_PIN.width / 2;
    var y = parseInt(mainPin.style.top, 10) + MAIN_PIN.height;
    return x + ', ' + y;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (!window.main.pageState) {
      window.main.activePageState();
      getPinsElements();
      pinsList.appendChild(fragment);
      window.main.pageState = true;
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop < MAIN_PIN_LIMITS.yMin) {
        mainPin.style.top = MAIN_PIN_LIMITS.yMin + 'px';
      } else if (mainPin.offsetTop > MAIN_PIN_LIMITS.yMax) {
        mainPin.style.top = MAIN_PIN_LIMITS.yMax + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if (mainPin.offsetLeft < MAIN_PIN_LIMITS.xMin) {
        mainPin.style.left = MAIN_PIN_LIMITS.xMin + 'px';
      } else if (mainPin.offsetLeft > MAIN_PIN_LIMITS.xMax) {
        mainPin.style.left = MAIN_PIN_LIMITS.xMax + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
    };
    var mouseUpHandler = function () {
      window.form.setFormAddressInputValue();
      window.data.mapElement.removeEventListener('mousemove', mouseMoveHandler);
      window.data.mapElement.removeEventListener('mouseup', mouseUpHandler);
    };
    window.data.mapElement.addEventListener('mousemove', mouseMoveHandler);
    window.data.mapElement.addEventListener('mouseup', mouseUpHandler);
  });

  window.pin = {
    getMainCoordinates: getMainPinCoordinates
  };
})();
