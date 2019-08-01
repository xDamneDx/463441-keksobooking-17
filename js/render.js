'use strict';

(function () {
  var NUM_OF_PINS = 5;
  var PIN = {
    width: 40,
    height: 44
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (offer) {
    var newPin = pinTemplate.cloneNode(true);
    newPin.style.left = (offer.location.x - (PIN.width / 2)) + 'px';
    newPin.style.top = (offer.location.y - PIN.height) + 'px';
    newPin.querySelector('img').src = offer.author.avatar;
    newPin.querySelector('img').alt = offer.offer.description;

    newPin.addEventListener('click', function (evt) {
      var openedCardPopup = window.data.map.querySelector('.map__card.popup');
      var activePin = window.data.map.querySelector('.map__pin.map__pin--active');

      if (openedCardPopup) {
        openedCardPopup.remove();
        if (evt.currentTarget.className === 'map__pin map__pin--active') {
          evt.currentTarget.classList.remove('map__pin--active');
        } else {
          activePin.classList.remove('map__pin--active');
          evt.currentTarget.classList.add('map__pin--active');
          window.card.render(offer);
        }
      } else {
        evt.currentTarget.classList.add('map__pin--active');
        window.card.render(offer);
      }
    });

    return newPin;
  };

  var renderPins = function (data) {
    window.card.remove();
    window.pin.removeAll();
    var takeNumber = data.length >= NUM_OF_PINS ? NUM_OF_PINS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      window.data.fragment.appendChild(renderPin(data[i]));
    }
    window.data.pinsList.appendChild(window.data.fragment);
  };

  window.render = window.debounce(renderPins);
})();
