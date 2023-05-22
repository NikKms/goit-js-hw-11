import { PhotoGalleryService } from './js/api';
import { refs } from './js/refs';
import { LoadMoreButton } from './js/load-button';
import { PhotoGallery } from './js/ui';
import Notiflix from 'notiflix';

const { searchForm, gallery, loadBtn } = refs;

searchForm.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', loadMore);

const photoGallery = new PhotoGallery(gallery);
const photoGalleryService = new PhotoGalleryService();
const loadMoreButton = new LoadMoreButton({
  buttonElement: loadBtn,
  isHidden: true,
});

let isNotifySuccessCalled = false;

function onSubmit(e) {
  e.preventDefault();

  const searchValue = e.target.searchQuery.value.trim().toLowerCase();

  if (!searchValue) {
    return;
  }

  photoGallery.clear();
  photoGalleryService.resetPage();
  checkRequest(searchValue);
  e.target.searchQuery.value = '';
}

async function checkRequest(searchValue) {
  try {
    loadMoreButton.showButton();
    loadMoreButton.disableButton();

    const data = await photoGalleryService.fetchPhotos(searchValue);
    const imgArr = photoGallery.transformPhotos(data.hits);

    photoGallery.render(imgArr);

    loadMoreButton.enableButton();

    if (!imgArr.length) {
      throw new Error();
    }

    if (photoGalleryService.totalPhotos === data.total) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreButton.hideButton();
    }

    if (!isNotifySuccessCalled) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      isNotifySuccessCalled = true;
    }

    loadMoreButton.enableButton();
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreButton.hideButton();
  }
}

function loadMore() {
  const searchValue = photoGalleryService.searchValue;
  photoGalleryService.nextPage();
  checkRequest(searchValue);
}
