'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypes = mapFilters.querySelector('#housing-type');

  var filter = {
    type: function () {}
  };

  housingTypes.addEventListener('change', function (evt) {
    filter.type(evt.target.value);
    var openedPopup = window.data.mapElement.querySelector('.map__card.popup');
    if (openedPopup) {
      openedPopup.remove();
    }
    window.pin.update();
  });

  window.mapFilters = filter;
  window.mapFilters.reset = function () {
    mapFilters.reset();
  };
})();
