'use strict';

(function () {
  var mapFilters = window.data.mapElement.querySelector('.map__filters');
  var isPageActive = false;
  var inactivePageState = function () {
    window.data.mapElement.classList.add('map--faded');
    window.data.formElement.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    window.form.toggleFieldsetsState();
  };
  var activePageState = function () {
    window.data.mapElement.classList.remove('map--faded');
    window.data.formElement.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    window.form.toggleFieldsetsState();
    window.form.setSelectedMinPriceValue();
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.keyCode.esc) {
      if (window.data.mapElement.querySelector('.map__card.popup')) {
        window.data.mapElement.querySelector('.map__card.popup').remove();
        window.data.mapElement.querySelector('.map__pin.map__pin--active').classList.remove('map__pin--active');
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
