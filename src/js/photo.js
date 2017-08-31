import axios from 'axios';

class Photo {
  constructor() {
    this.$petPhotoUploadButton = $('#petPhotoUpload');
    this.petPhotoFile = document.getElementById('petPhotoFile');
    this.$userPhotoUploadButton = $('#userPhotoUpload');
    this.userPhotoFile = document.getElementById('userPhotoFile');

    this.petPhotoFile.addEventListener('change', this.checkPetFile.bind(this));
    this.userPhotoFile.addEventListener(
      'change',
      this.checkProfileFile.bind(this)
    );
  }

  checkPetFile(e) {
    if (e.target.files.length < 1) {
      this.$petPhotoUploadButton.attr('disabled', true);
    } else {
      this.$petPhotoUploadButton.removeAttr('disabled');
    }
  }
  checkProfileFile(e) {
    if (e.target.files.length < 1) {
      this.$userPhotoUploadButton.attr('disabled', true);
    } else {
      this.$userPhotoUploadButton.removeAttr('disabled');
    }
  }
}

export default Photo;
