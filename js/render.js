'use strict';

(function () {
  var NUM_OF_PINS = 5;
  var PIN = {
    width: 40,
    height: 44
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (offer) {
    var newPinElement = pinTemplate.cloneNode(true);
    newPinElement.style.left = (offer.location.x - (PIN.width / 2)) + 'px';
    newPinElement.style.top = (offer.location.y - PIN.height) + 'px';
    newPinElement.querySelector('img').src = offer.author.avatar;
    newPinElement.querySelector('img').alt = offer.offer.description;

    newPinElement.addEventListener('click', function (evt) {
      var openedCardPopup = window.data.mapElement.querySelector('.map__card.popup');
      var activePin = window.data.mapElement.querySelector('.map__pin.map__pin--active');

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

    return newPinElement;
  };

  var renderPins = function (data) {
    window.card.remove();
    window.pin.removeAll();
    var takeNumber = data.length >= NUM_OF_PINS ? NUM_OF_PINS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      window.data.fragment.appendChild(renderPin(data[i]));
    }
    window.data.pinsListElement.appendChild(window.data.fragment);
  };

  window.render = window.debounce(renderPins);
})();
