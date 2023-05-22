import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export class PhotoGallery {
  constructor(containerID) {
    this.container = containerID;
    this.lightbox = new SimpleLightbox('.photo-card a', {
      captionsData: 'alt',
      captionDelay: 450,
    });
  }

  createPhotoCardMarkup({
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `
      <div class="photo-card">
        <a href="${webformatURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`;
  }

  render(data) {
    const galleryMarkup = data.reduce(
      (markup, photo) => markup + this.createPhotoCardMarkup(photo),
      ''
    );

    this.container.insertAdjacentHTML('beforeend', galleryMarkup);
    this.lightbox.refresh();
  }

  clear() {
    this.container.innerHTML = '';
    this.lightbox.refresh();
  }

  transformPhotos(data) {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      })
    );
  }
}
