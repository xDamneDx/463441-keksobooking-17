'use strict';

(function () {
  var NUM_OF_PINS = 5;
  var PIN = {
    width: 40,
    height: 44
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (offer) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (offer.location.x - (PIN.width / 2)) + 'px';
    pinElement.style.top = (offer.location.y - PIN.height) + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.description;
    return pinElement;
  };

  window.render = function (data) {
    var offers = window.data.pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    offers.forEach(function (offer) {
      offer.remove();
    });
    var takeNumber = data.length >= NUM_OF_PINS ? NUM_OF_PINS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      window.data.fragment.appendChild(renderPin(data[i]));
    }
    window.data.pinsList.appendChild(window.data.fragment);
  };
})();
