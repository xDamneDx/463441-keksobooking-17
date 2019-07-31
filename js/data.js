'use strict';

(function () {
  var KEYCODE = {
    enter: 13,
    esc: 27
  };
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapWidth = map.offsetWidth;
  var pinsList = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var isPageActive = false;

  window.data = {
    main: main,
    map: map,
    form: adForm,
    mapWidth: mapWidth,
    pinsList: pinsList,
    fragment: fragment,
    pageState: isPageActive,
    keyCode: KEYCODE
  };
})();
