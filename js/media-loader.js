'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var avatarFileChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__upload').querySelector('img');
  var defaultAvatar = avatarPreview.src;

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoFileChooser.addEventListener('change', function () {
    var file = photoFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newDiv = document.createElement('div');
        var newImage = document.createElement('img');
        newDiv.classList.add('ad-form__photo');
        newImage.width = '70';
        newImage.height = '70';
        newImage.alt = 'Фотография жилья';
        newImage.src = reader.result;
        newDiv.appendChild(newImage);
        photoContainer.insertBefore(newDiv, photoContainer.querySelector('.ad-form__photo'));
      });

      reader.readAsDataURL(file);
    }
  });

  var clearLoader = function () {
    var allPhotos = photoContainer.querySelectorAll('.ad-form__photo:not(:last-child)');
    allPhotos.forEach(function (photo) {
      photo.remove();
    });
    avatarPreview.src = defaultAvatar;
  };

  window.mediaLoader = {
    clear: clearLoader
  };
})();
