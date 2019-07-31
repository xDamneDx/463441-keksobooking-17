'use strict';

(function () {
  var mainPin = window.data.pinsList.querySelector('.map__pin--main');

  var MAIN_PIN = {
    width: 65,
    height: 87,
    inactive: {
      width: 65,
      height: 65
    },
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

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var offersArray = [];

  var updatePins = function () {
    window.render(window.mapFilters(offersArray));
  };

  var successHandler = function (offers) {
    offersArray = offers.slice();
    updatePins();
    window.form.toggleFieldsetsState();
  };

  var errorHandler = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    window.data.main.appendChild(error);
  };

  var getMainPinCoordinates = function () {
    var x = parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN.width / 2);
    var y = parseInt(mainPin.style.top, 10) + MAIN_PIN.height;
    return x + ', ' + y;
  };

  var getInactiveMainPinCoordinates = function () {
    var x = parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN.inactive.width / 2);
    var y = parseInt(mainPin.style.top, 10) + Math.round(MAIN_PIN.inactive.height / 2);
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
    var pins = window.data.pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var activatePageIfNotActive = function () {
    if (!window.data.pageState) {
      window.map.activePageState();
      window.backend.load(successHandler, errorHandler);
      window.data.pageState = true;
    }
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.keyCode.enter) {
      activatePageIfNotActive();
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    activatePageIfNotActive();
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
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.pin = {
    getMainCoordinates: getMainPinCoordinates,
    getMainInactiveCoordinates: getInactiveMainPinCoordinates,
    update: updatePins,
    offersArray: offersArray,
    removeAll: removePins,
    resetMainPin: setMainPinStartCoordinates
  };
})();
