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

  var renderCard = function (offer) {
    var card = cardTemplate.cloneNode(true);
    var futuresList = card.querySelector('.popup__features');
    var futures = futuresList.querySelectorAll('li');
    var imgList = card.querySelector('.popup__photos');
    futures.forEach(function (future) {
      future.remove();
    });
    imgList.querySelector('img').remove();

    card.querySelector('.popup__title').textContent = offer.offer.title;
    card.querySelector('.popup__text--address').textContent = offer.offer.address;
    card.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeMap[offer.offer.type];
    card.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

    offer.offer.features.forEach(function (feature) {
      var newLiElement = document.createElement('li');
      newLiElement.classList.add('popup__feature', 'popup__feature--' + feature);
      futuresList.appendChild(newLiElement);
    });

    card.querySelector('.popup__description').textContent = offer.offer.description;

    offer.offer.photos.forEach(function (photo) {
      var newImgElement = document.createElement('img');
      newImgElement.classList.add('popup__photo');
      newImgElement.src = photo;
      newImgElement.width = '45';
      newImgElement.height = '40';
      newImgElement.alt = 'Фотография жилья';
      imgList.appendChild(newImgElement);
    });

    card.querySelector('.popup__avatar').src = offer.author.avatar;

    window.data.mapElement.insertBefore(card, mapFiltersContainer);
  };

  window.card.render = renderCard;
})();
