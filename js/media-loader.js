'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var photoContainerElement = window.data.formElement.querySelector('.ad-form__photo-container');
  var avatarFileChooserElement = window.data.formElement.querySelector('.ad-form-header__upload input[type=file]');
  var photoFileChooserElement = window.data.formElement.querySelector('.ad-form__upload input[type=file]');
  var avatarPreviewElement = window.data.formElement.querySelector('.ad-form-header__upload').querySelector('img');
  var defaultAvatar = avatarPreviewElement.src;

  avatarFileChooserElement.addEventListener('change', function () {
    var file = avatarFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoFileChooserElement.addEventListener('change', function () {
    var file = photoFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newDivElement = document.createElement('div');
        var newImgElement = document.createElement('img');
        newDivElement.classList.add('ad-form__photo');
        newImgElement.width = '70';
        newImgElement.height = '70';
        newImgElement.alt = 'Фотография жилья';
        newImgElement.src = reader.result;
        newDivElement.appendChild(newImgElement);
        photoContainerElement.insertBefore(newDivElement, photoContainerElement.querySelector('.ad-form__photo'));
      });

      reader.readAsDataURL(file);
    }
  });

  var clearLoader = function () {
    var allPhotoElements = photoContainerElement.querySelectorAll('.ad-form__photo:not(:last-child)');
    allPhotoElements.forEach(function (photo) {
      photo.remove();
    });
    avatarPreviewElement.src = defaultAvatar;
  };

  window.mediaLoader = {
    clear: clearLoader
  };
})();
