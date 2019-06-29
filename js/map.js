'use strict';

(function () {
  var mapFilters = window.data.mapElement.querySelector('.map__filters');
  var isPageActive = false;
  var inactivePageState = function () {
    window.data.addClass(window.data.mapElement, 'map--faded');
    window.data.addClass(window.data.formElement, 'ad-form--disabled');
    window.data.addClass(mapFilters, 'map__filters--disabled');
    window.form.toggleFieldsetsState();
  };
  var activePageState = function () {
    window.data.removeClass(window.data.mapElement, 'map--faded');
    window.data.removeClass(window.data.formElement, 'ad-form--disabled');
    window.data.removeClass(mapFilters, 'map__filters--disabled');
    window.form.toggleFieldsetsState();
    window.form.setSelectedMinPriceValue();
  };

  inactivePageState();

  window.main = {
    pageState: isPageActive,
    activePageState: activePageState
  };
})();
