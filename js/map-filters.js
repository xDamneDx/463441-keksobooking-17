'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypes = mapFilters.querySelector('#housing-type');

  var filter = {
    type: function () {}
  };

  housingTypes.addEventListener('change', function (evt) {
    filter.type(evt.target.value);
    window.pin.update();
  });

  window.mapFilters = filter;
})();
