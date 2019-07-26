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
    var openedCardPopup = window.data.mapElement.querySelector('.map__card.popup');
    var popupCloseButton = card.querySelector('.popup__close');

    var closePopup = function () {
      card.remove();
      popupCloseButton.removeEventListener('click', closePopup);
      document.removeEventListener('keydown', popupEscPressHandler);
    };

    var popupEscPressHandler = function (evt) {
      if (evt.keyCode === window.data.keyCode.esc) {
        closePopup();
      }
    };

    if (openedCardPopup) {
      openedCardPopup.remove();
    }

    futures.forEach(function (future) {
      future.remove();
    });
    imgList.querySelector('img').remove();

    var offerMap = {
      'title': {
        'class': '.popup__title',
        'textContent': offer.offer.title
      },
      'address': {
        'class': '.popup__text--address'
      },
      'price': {
        'class': '.popup__text--price',
        'textContent': offer.offer.price + '₽/ночь'
      },
      'type': {
        'class': '.popup__type',
        'textContent': typeMap[offer.offer.type]
      },
      'rooms': {
        'class': '.popup__text--capacity',
        'textContent': offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей'
      },
      'checkin': {
        'class': '.popup__text--time',
        'textContent': 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout
      },
      'features': {
        'class': 'popup__feature'
      },
      'photos': {
        'class': 'popup__photo'
      },
      'description': {
        'class': '.popup__description',
        'textContent': offer.offer.description
      }
    };

    if (offer.offer) {
      Object.keys(offerMap).forEach(function (key) {
        if (offer.offer[key]) {
          if (key === 'photos') {
            offer.offer[key].forEach(function (photo) {
              var newImgElement = document.createElement('img');
              newImgElement.classList.add(offerMap[key].class);
              newImgElement.src = photo;
              newImgElement.width = '45';
              newImgElement.height = '40';
              newImgElement.alt = 'Фотография жилья';
              imgList.appendChild(newImgElement);
            });
          } else if (key === 'features') {
            offer.offer[key].forEach(function (feature) {
              var newLiElement = document.createElement('li');
              newLiElement.classList.add(offerMap[key].class, offerMap[key].class + '--' + feature);
              futuresList.appendChild(newLiElement);
            });
          } else {
            card.querySelector(offerMap[key].class).textContent = offerMap[key].textContent;
          }
        } else if (key === 'features' || key === 'photos') {
          card.querySelector('.popup__' + key).remove();
        } else {
          card.querySelector(offerMap[key].class).remove();
        }
      });
      card.querySelector('.popup__avatar').src = offer.author.avatar;
    }

    window.data.mapElement.insertBefore(card, mapFiltersContainer);

    popupCloseButton.addEventListener('click', closePopup);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  window.card.render = renderCard;
})();
