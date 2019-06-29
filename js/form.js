'use strict';

(function () {
  var adFormAddressInput = window.data.formElement.querySelector('input[name="address"]');
  var adFormFieldsets = window.data.formElement.querySelectorAll('.ad-form__element');
  var noticeElement = document.querySelector('.notice');
  var typeSelect = noticeElement.querySelector('#type');
  var timeInSelect = noticeElement.querySelector('#timein');
  var timeOutSelect = noticeElement.querySelector('#timeout');
  var typeSelectOptions = typeSelect.querySelectorAll('option');
  var priceInput = noticeElement.querySelector('#price');

  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
    default: 100
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

  var toggleFieldsetsState = function () {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = !adFormFieldsets[i].disabled;
    }
  };

  var setFormAddressInputValue = function () {
    adFormAddressInput.value = window.pin.getMainCoordinates();
  };

  typeSelect.addEventListener('change', function (evt) {
    setMinPriceValue(evt.target.value);
  });

  timeInSelect.addEventListener('change', function (evt) {
    timeOutSelect.selectedIndex = evt.target.selectedIndex;
  });

  timeOutSelect.addEventListener('change', function (evt) {
    timeInSelect.selectedIndex = evt.target.selectedIndex;
  });

  window.form = {
    setSelectedMinPriceValue: setSelectedMinPriceValue,
    toggleFieldsetsState: toggleFieldsetsState,
    setFormAddressInputValue: setFormAddressInputValue
  };
})();
