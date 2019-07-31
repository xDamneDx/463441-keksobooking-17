'use strict';

(function () {
  var adFormAddressInput = window.data.formElement.querySelector('input[name="address"]');
  var adFormFieldsets = window.data.formElement.querySelectorAll('.ad-form__element');
  var mapFiltersElement = window.data.mapElement.querySelector('.map__filters');
  var noticeElement = document.querySelector('.notice');
  var typeSelect = noticeElement.querySelector('#type');
  var timeInSelect = noticeElement.querySelector('#timein');
  var timeOutSelect = noticeElement.querySelector('#timeout');
  var typeSelectOptions = typeSelect.querySelectorAll('option');
  var priceInput = noticeElement.querySelector('#price');
  var roomNumberSelect = noticeElement.querySelector('#room_number');
  var capacitySelect = noticeElement.querySelector('#capacity');
  var form = noticeElement.querySelector('.ad-form');
  var resetButton = form.querySelector('.ad-form__reset');
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
    default: 100
  };
  var ROOMS = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var setMinPriceValue = function (type) {
    var setValue = function (value) {
      priceInput.min = value;
      priceInput.placeholder = value;
    };
    setValue(MIN_PRICE[type]);
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

  var toggleFieldsetsState = function () {
    for (var i = 0; i < mapFiltersElement.length; i++) {
      mapFiltersElement[i].disabled = !mapFiltersElement[i].disabled;
    }
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = !adFormFieldsets[j].disabled;
    }
  };

  var setFormAddressInputValue = function () {
    if (window.data.pageState) {
      adFormAddressInput.value = window.pin.getMainCoordinates();
    } else {
      adFormAddressInput.value = window.pin.getMainInactiveCoordinates();
    }
  };

  var roomsChangesHandler = function () {
    [].forEach.call(capacitySelect.options, function (item) {
      item.selected = (ROOMS[roomNumberSelect.value][0] === item.value);
      item.disabled = !(ROOMS[roomNumberSelect.value].indexOf(item.value) >= 0);
    });
  };

  roomsChangesHandler();

  typeSelect.addEventListener('change', function (evt) {
    setMinPriceValue(evt.target.value);
  });

  timeInSelect.addEventListener('change', function (evt) {
    timeOutSelect.selectedIndex = evt.target.selectedIndex;
  });

  timeOutSelect.addEventListener('change', function (evt) {
    timeInSelect.selectedIndex = evt.target.selectedIndex;
  });

  roomNumberSelect.addEventListener('change', roomsChangesHandler);

  var resetButtonHandler = function () {
    var openedCardPopup = window.data.mapElement.querySelector('.map__card.popup');
    var activePin = window.data.mapElement.querySelector('.map__pin.map__pin--active');
    if (openedCardPopup) {
      openedCardPopup.remove();
      activePin.classList.remove('map__pin--active');
    }
    form.reset();
    window.mediaLoader.clear();
    window.data.pageState = false;
    window.map.inactivePageState();
  };

  resetButton.addEventListener('click', resetButtonHandler);

  var successHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    successElement.addEventListener('click', function () {
      successElement.remove();
    });
    window.data.mainElement.appendChild(successElement);
    resetButtonHandler();
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    var errorMessageElement = errorElement.querySelector('.error__message');
    errorMessageElement.textContent = errorMessage;
    errorButton.addEventListener('click', function () {
      errorElement.remove();
    });
    errorElement.addEventListener('click', function () {
      errorElement.remove();
    });
    window.data.mainElement.appendChild(errorElement);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(successHandler, errorHandler, new FormData(form));
    evt.preventDefault();
  });

  window.form = {
    setSelectedMinPriceValue: setSelectedMinPriceValue,
    toggleFieldsetsState: toggleFieldsetsState,
    setFormAddressInputValue: setFormAddressInputValue
  };
})();
