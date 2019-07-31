'use strict';

(function () {
  var mapFiltersElement = document.querySelector('.map__filters');
  var filterElements = Array.from(mapFiltersElement.children);
  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },
    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },
    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var filterData = function (data) {
    return data.filter(function (offer) {
      return filterElements.every(function (select) {
        return (select.value === 'any') ? true : filterRules[select.id](offer, select);
      });
    });
  };

  window.mapFilters = filterData;
  window.mapFilters.reset = function () {
    mapFiltersElement.reset();
  };
})();
