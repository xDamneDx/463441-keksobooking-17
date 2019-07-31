'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainPinElement = window.data.pinsListElement.querySelector('.map__pin--main');

  var MAIN_PIN = {
    width: 65,
    height: 87,
    inactive: {
      width: 65,
      height: 65
    },
    startCoords: {
      top: mainPinElement.style.top,
      left: mainPinElement.style.left
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
    window.form.toggleFieldsetsState();
  };

  var errorHandler = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(error);
  };

  var getMainPinCoordinates = function () {
    var x = parseInt(mainPinElement.style.left, 10) + Math.round(MAIN_PIN.width / 2);
    var y = parseInt(mainPinElement.style.top, 10) + MAIN_PIN.height;
    return x + ', ' + y;
  };

  var getInactiveMainPinCoordinates = function () {
    var x = parseInt(mainPinElement.style.left, 10) + Math.round(MAIN_PIN.inactive.width / 2);
    var y = parseInt(mainPinElement.style.top, 10) + Math.round(MAIN_PIN.inactive.height / 2);
    return x + ', ' + y;
  };

  var setMainPinStartCoordinates = function () {
    mainPinElement.style.top = MAIN_PIN.startCoords.top;
    mainPinElement.style.left = MAIN_PIN.startCoords.left;
  };

  var correctMainPinCoordinates = function () {
    if (mainPinElement.offsetLeft < MAIN_PIN_LIMITS.xMin) {
      mainPinElement.style.left = MAIN_PIN_LIMITS.xMin + 'px';
    } else if (mainPinElement.offsetLeft > MAIN_PIN_LIMITS.xMax) {
      mainPinElement.style.left = MAIN_PIN_LIMITS.xMax + 'px';
    } else if (mainPinElement.offsetTop < MAIN_PIN_LIMITS.yMin) {
      mainPinElement.style.top = MAIN_PIN_LIMITS.yMin + 'px';
    } else if (mainPinElement.offsetTop > MAIN_PIN_LIMITS.yMax) {
      mainPinElement.style.top = MAIN_PIN_LIMITS.yMax + 'px';
    }
  };

  var removePins = function () {
    var pinElements = window.data.pinsListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinElements.forEach(function (pin) {
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

  mainPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.keyCode.enter) {
      activatePageIfNotActive();
    }
  });

  mainPinElement.addEventListener('mousedown', function (evt) {
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
      mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
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
    getMainInactiveCoordinates: getInactiveMainPinCoordinates,
    update: updatePins,
    offersArray: offersArray,
    removeAll: removePins,
    resetMainPin: setMainPinStartCoordinates
  };
})();
