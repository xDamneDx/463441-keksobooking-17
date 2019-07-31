'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var photoContainer = window.data.form.querySelector('.ad-form__photo-container');
  var avatarFileChooser = window.data.form.querySelector('.ad-form-header__upload input[type=file]');
  var photoFileChooser = window.data.form.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = window.data.form.querySelector('.ad-form-header__upload').querySelector('img');
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
        var newImg = document.createElement('img');
        newDiv.classList.add('ad-form__photo');
        newImg.width = '70';
        newImg.height = '70';
        newImg.alt = 'Фотография жилья';
        newImg.src = reader.result;
        newDiv.appendChild(newImg);
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
