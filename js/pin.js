'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainPin = window.data.pinsList.querySelector('.map__pin--main');

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

  var offersArray = [];
  var housingType = 'any';

  window.mapFilters.type = function (type) {
    housingType = type;
  };

  var updatePins = function () {
    window.render(offersArray.filter(function (offer) {
      if (housingType === 'any') {
        return true;
      } else if (offer.offer.type === housingType) {
        return true;
      }
      return false;
    }));
    // console.log(document.querySelector('.map__card.popup'));
  };

  var successHandler = function (offers) {
    offersArray = offers;
    updatePins();
  };

  var errorHandler = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(error);
  };

  var getMainPinCoordinates = function () {
    var x = parseInt(mainPin.style.left, 10) + MAIN_PIN.width / 2;
    var y = parseInt(mainPin.style.top, 10) + MAIN_PIN.height;
    return x + ', ' + y;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (!window.main.pageState) {
      window.main.activePageState();
      window.load.offers(successHandler, errorHandler);
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

  window.data.pinsList.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== window.data.pinsList) {
      if (target.tagName === 'BUTTON' && target.className !== 'map__pin map__pin--main') {
        var targetAlt = target.firstChild.alt;
        var selectedOffer = offersArray.filter(function (offer) {
          return offer.offer.description === targetAlt;
        });
        window.card.render(selectedOffer[0]);
        return;
      }
      target = target.parentNode;
    }
  });

  window.pin = {
    getMainCoordinates: getMainPinCoordinates,
    update: updatePins,
    offersArray: offersArray
  };
})();
