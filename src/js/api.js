import axios from 'axios';

class PhotoGalleryService {
  static URL = 'https://pixabay.com/api';
  static API_KEY = '36626912-b574e4585ceca1c969d7b8ebc';

  constructor() {
    this.page = 1;
    this.searchValue = '';
    this.totalPhotos = 0;
  }

  getSearchQuery() {
    return new URLSearchParams({
      key: PhotoGalleryService.API_KEY,
      q: this.searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });
  }

  async fetchPhotos(searchValue) {
    this.searchValue = searchValue;
    try {
      const { data } = await axios.get(
        `${PhotoGalleryService.URL}/?${this.getSearchQuery()}`
      );
      this.totalPhotos = data.totalHits;
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

  resetPage() {
    this.page = 1;
    this.totalPhotos = 0;
  }

  nextPage() {
    this.page += 1;
  }
}

export { PhotoGalleryService };
