'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_STATUS = {
    ok: 200
  };

  var downloadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS.ok) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки объявления ( ' + xhr.status + ' ' + xhr.statusText + ' )');
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = {
    offers: downloadData
  };
})();
