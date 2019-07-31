'use strict';

(function () {
  var mapFiltersElement = window.data.mainElement.querySelector('.map__filters');

  var setPageInactive = function () {
    window.data.mapElement.classList.add('map--faded');
    window.data.formElement.classList.add('ad-form--disabled');
    mapFiltersElement.classList.add('map__filters--disabled');
    window.pin.resetMainPin();
    window.form.toggleFieldsetsState();
    window.pin.removeAll();
    window.mapFilters.reset();
    window.form.setFormAddressInputValue();
  };

  var setPageActive = function () {
    window.data.mapElement.classList.remove('map--faded');
    window.data.formElement.classList.remove('ad-form--disabled');
    mapFiltersElement.classList.remove('map__filters--disabled');
    window.form.setSelectedMinPriceValue();
  };

  mapFiltersElement.addEventListener('change', function () {
    window.pin.update();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.keyCode.esc) {
      window.card.remove();
      if (window.data.mainElement.querySelector('.success')) {
        window.data.mainElement.querySelector('.success').remove();
      }
      if (window.data.mainElement.querySelector('.error')) {
        window.data.mainElement.querySelector('.error').remove();
      }
    }
  });

  setPageInactive();

  window.map = {
    activePageState: setPageActive,
    inactivePageState: setPageInactive
  };
})();
