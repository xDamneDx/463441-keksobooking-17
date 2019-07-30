'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainPin = window.data.pinsList.querySelector('.map__pin--main');

  var MAIN_PIN = {
    width: 65,
    height: 87,
    startCoords: {
      top: mainPin.style.top,
      left: mainPin.style.left
    }
  };

  var MAIN_PIN_LIMITS = {
    yMin: 130 - MAIN_PIN.height,
    yMax: 630 - MAIN_PIN.height,
    xMin: -MAIN_PIN.width / 2,
    xMax: window.data.mapWidth - MAIN_PIN.width / 2
  };

  var offersArray = [];

  var updatePins = function () {
    window.render(window.mapFilters(offersArray));
  };

  var successHandler = function (offers) {
    offersArray = offers.slice();
    updatePins();
  };

  var errorHandler = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(error);
  };

  var getMainPinCoordinates = function () {
    var x = parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN.width / 2);
    var y = parseInt(mainPin.style.top, 10) + MAIN_PIN.height;
    return x + ', ' + y;
  };

  var setMainPinStartCoordinates = function () {
    mainPin.style.top = MAIN_PIN.startCoords.top;
    mainPin.style.left = MAIN_PIN.startCoords.left;
  };

  var correctMainPinCoordinates = function () {
    if (mainPin.offsetLeft < MAIN_PIN_LIMITS.xMin) {
      mainPin.style.left = MAIN_PIN_LIMITS.xMin + 'px';
    } else if (mainPin.offsetLeft > MAIN_PIN_LIMITS.xMax) {
      mainPin.style.left = MAIN_PIN_LIMITS.xMax + 'px';
    } else if (mainPin.offsetTop < MAIN_PIN_LIMITS.yMin) {
      mainPin.style.top = MAIN_PIN_LIMITS.yMin + 'px';
    } else if (mainPin.offsetTop > MAIN_PIN_LIMITS.yMax) {
      mainPin.style.top = MAIN_PIN_LIMITS.yMax + 'px';
    }
  };

  var removePins = function () {
    var allPins = window.data.pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (pin) {
      pin.remove();
    });
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (!window.main.pageState) {
      window.main.activePageState();
      window.backend.load(successHandler, errorHandler);
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
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      correctMainPinCoordinates();
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
    getMainCoordinates: getMainPinCoordinates,
    update: updatePins,
    offersArray: offersArray,
    removeAll: removePins,
    resetMainPin: setMainPinStartCoordinates
  };
})();
