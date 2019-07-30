'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = window.data.mapElement.querySelector('.map__filters-container');
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
    var imgList = card.querySelector('.popup__photos');
    var popupCloseButton = card.querySelector('.popup__close');

    var closePopup = function () {
      var activePin = window.data.mapElement.querySelector('.map__pin.map__pin--active');
      card.remove();
      activePin.classList.remove('map__pin--active');
    };

    futures.forEach(function (future) {
      future.remove();
    });
    imgList.querySelector('img').remove();

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
          var newLiElement = document.createElement('li');
          newLiElement.classList.add('popup__feature', 'popup__feature--' + feature);
          futuresList.appendChild(newLiElement);
        });
      } else {
        card.querySelector('.popup__features').remove();
      }
      if (data.offer.photos) {
        data.offer.photos.forEach(function (photo) {
          var newImgElement = document.createElement('img');
          newImgElement.classList.add('popup__photo');
          newImgElement.src = photo;
          newImgElement.width = '45';
          newImgElement.height = '40';
          newImgElement.alt = 'Фотография жилья';
          imgList.appendChild(newImgElement);
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

      window.data.mapElement.insertBefore(card, mapFiltersContainer);
      popupCloseButton.addEventListener('click', closePopup);
    }
  };

  var removeCard = function () {
    if (window.data.mapElement.querySelector('.map__card.popup')) {
      window.data.mapElement.querySelector('.map__card.popup').remove();
      window.data.mapElement.querySelector('.map__pin.map__pin--active').classList.remove('map__pin--active');
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
