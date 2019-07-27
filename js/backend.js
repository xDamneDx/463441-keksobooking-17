'use strict';

(function () {
  var URL = {
    download: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };
  var XHR_STATUS = {
    ok: 200
  };
  var METHOD = {
    get: 'GET',
    post: 'POST'
  };
  var errorMessage = 'Ошибка загрузки объявлений';

  var serverOperations = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS.ok) {
        onLoad(xhr.response);
      } else {
        if (data) {
          errorMessage = 'Не удалось отправить форму';
        }
        onError(errorMessage + ' ( ' + xhr.status + ' ' + xhr.statusText + ' )');
      }
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      serverOperations(onLoad, onError, METHOD.get, URL.download);
    },
    save: function (onLoad, onError, data) {
      serverOperations(onLoad, onError, METHOD.post, URL.upload, data);
    }
  };
})();
