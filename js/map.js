'use strict';

(function () {
  var main = document.querySelector('main');
  var mapFilters = main.querySelector('.map__filters');
  var isPageActive = false;

  var inactivePageState = function () {
    window.data.mapElement.classList.add('map--faded');
    window.data.formElement.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    window.pin.resetMainPin();
    window.form.toggleFieldsetsState();
    window.pin.removeAll();
    window.mapFilters.reset();
    window.form.setFormAddressInputValue();
  };

  var activePageState = function () {
    window.data.mapElement.classList.remove('map--faded');
    window.data.formElement.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    window.form.toggleFieldsetsState();
    window.form.setSelectedMinPriceValue();
  };

  mapFilters.addEventListener('change', function () {
    window.pin.update();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.keyCode.esc) {
      window.card.remove();
      if (main.querySelector('.success')) {
        main.querySelector('.success').remove();
      }
      if (main.querySelector('.error')) {
        main.querySelector('.error').remove();
      }
    }
  });

  inactivePageState();

  window.main = {
    pageState: isPageActive,
    activePageState: activePageState,
    inactivePageState: inactivePageState
  };
})();
