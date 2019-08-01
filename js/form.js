'use strict';

(function () {
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
  var adFormAddressInput = window.data.form.querySelector('input[name="address"]');
  var adFormFieldsets = window.data.form.querySelectorAll('.ad-form__element');
  var mapFilters = window.data.map.querySelector('.map__filters');
  var notice = document.querySelector('.notice');
  var typeSelect = notice.querySelector('#type');
  var timeInSelect = notice.querySelector('#timein');
  var timeOutSelect = notice.querySelector('#timeout');
  var typeSelectOptions = typeSelect.querySelectorAll('option');
  var priceInput = notice.querySelector('#price');
  var roomNumberSelect = notice.querySelector('#room_number');
  var capacitySelect = notice.querySelector('#capacity');
  var form = notice.querySelector('.ad-form');
  var resetButton = form.querySelector('.ad-form__reset');

  var setMinPriceValue = function (type) {
    var setValue = function (value) {
      priceInput.min = value;
      priceInput.placeholder = value;
    };
    setValue(MIN_PRICE[type]);
  };

  var setSelectedMinPriceValue = function () {
    typeSelectOptions.forEach(function (option) {
      if (option.selected) {
        setMinPriceValue(option.value);
      }
    });
  };

  var toggleFieldsetsState = function () {
    [].forEach.call(mapFilters, function (item) {
      item.disabled = !item.disabled;
    });
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  };

  var setFormAddressInputValue = function () {
    adFormAddressInput.value = (window.data.pageState) ? window.pin.getMainCoordinates() : window.pin.getMainInactiveCoordinates();
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
    var openedCardPopup = window.data.map.querySelector('.map__card.popup');
    var activePin = window.data.map.querySelector('.map__pin.map__pin--active');
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
    var success = successTemplate.cloneNode(true);
    success.addEventListener('click', function () {
      success.remove();
    });
    window.data.main.appendChild(success);
    resetButtonHandler();
  };

  var errorHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('.error__button');
    var errorMessage = error.querySelector('.error__message');
    errorMessage.textContent = message;
    errorButton.addEventListener('click', function () {
      error.remove();
    });
    error.addEventListener('click', function () {
      error.remove();
    });
    window.data.main.appendChild(error);
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
