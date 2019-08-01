'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = window.data.map.querySelector('.map__filters-container');
  var typeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var renderCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var futuresList = card.querySelector('.popup__features');
    var futures = futuresList.querySelectorAll('li');
    var photosList = card.querySelector('.popup__photos');
    var popupCloseButton = card.querySelector('.popup__close');

    futures.forEach(function (future) {
      future.remove();
    });

    photosList.querySelector('img').remove();

    if (data.offer) {
      if (data.offer.title) {
        card.querySelector('.popup__title').textContent = data.offer.title;
      } else {
        card.querySelector('.popup__title').remove();
      }
      if (data.offer.address) {
        card.querySelector('.popup__text--address').textContent = data.offer.address;
      } else {
        card.querySelector('.popup__text--address').remove();
      }
      if (data.offer.price) {
        card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
      } else {
        card.querySelector('.popup__text--price').remove();
      }
      if (data.offer.type) {
        card.querySelector('.popup__type').textContent = typeMap[data.offer.type];
      } else {
        card.querySelector('.popup__type').remove();
      }
      if (data.offer.rooms) {
        card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      } else {
        card.querySelector('.popup__text--capacity').remove();
      }
      if (data.offer.features) {
        data.offer.features.forEach(function (feature) {
          var newLi = document.createElement('li');
          newLi.classList.add('popup__feature', 'popup__feature--' + feature);
          futuresList.appendChild(newLi);
        });
      } else {
        card.querySelector('.popup__features').remove();
      }
      if (data.offer.photos) {
        data.offer.photos.forEach(function (photo) {
          var newImg = document.createElement('img');
          newImg.classList.add('popup__photo');
          newImg.src = photo;
          newImg.width = '45';
          newImg.height = '40';
          newImg.alt = 'Фотография жилья';
          photosList.appendChild(newImg);
        });
      } else {
        card.querySelector('.popup__photos').remove();
      }
      if (data.offer.description) {
        card.querySelector('.popup__description').textContent = data.offer.description;
      } else {
        card.querySelector('.popup__description').remove();
      }
      card.querySelector('.popup__avatar').src = data.author.avatar;

      window.data.map.insertBefore(card, mapFiltersContainer);
      popupCloseButton.addEventListener('click', function () {
        var activePin = window.data.map.querySelector('.map__pin.map__pin--active');
        card.remove();
        activePin.classList.remove('map__pin--active');
      });
    }
  };

  var removeCard = function () {
    if (window.data.map.querySelector('.map__card.popup')) {
      window.data.map.querySelector('.map__card.popup').remove();
      window.data.map.querySelector('.map__pin.map__pin--active').classList.remove('map__pin--active');
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
