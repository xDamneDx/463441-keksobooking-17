'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filters = Array.from(mapFilters.children);
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
      var checkLists = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkLists.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  window.mapFilters = function (data) {
    return data.filter(function (offer) {
      return filters.every(function (select) {
        return (select.value === 'any') ? true : filterRules[select.id](offer, select);
      });
    });
  };
  window.mapFilters.reset = function () {
    mapFilters.reset();
  };
})();
