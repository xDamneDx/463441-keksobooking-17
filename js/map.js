'use strict';

(function () {
  var mapFilters = window.data.main.querySelector('.map__filters');

  var setPageInactive = function () {
    window.data.map.classList.add('map--faded');
    window.data.form.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    window.pin.resetMainPin();
    window.form.toggleFieldsetsState();
    window.pin.removeAll();
    window.mapFilters.reset();
    window.form.setSelectedMinPriceValue();
    window.form.setFormAddressInputValue();
  };

  var setPageActive = function () {
    window.data.map.classList.remove('map--faded');
    window.data.form.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    window.form.setSelectedMinPriceValue();
  };

  mapFilters.addEventListener('change', function () {
    window.pin.update();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.keyCode.esc) {
      window.card.remove();
      if (window.data.main.querySelector('.success')) {
        window.data.main.querySelector('.success').remove();
      }
      if (window.data.main.querySelector('.error')) {
        window.data.main.querySelector('.error').remove();
      }
    }
  });

  setPageInactive();

  window.map = {
    activePageState: setPageActive,
    inactivePageState: setPageInactive
  };
})();
