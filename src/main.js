import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createGalleryImageTemplate } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';

const form = document.querySelector('form.js-form');
const gallery = document.querySelector('ul.js-gallery');
const preLoader = document.querySelector('span.js-loader');
const loadMoreBtn = document.querySelector('.load-more-js');

let currentPage = 1;
let totalPages = 0;
let inputValue = '';
let galleryImageHeight = 0;

const newGalleryBox = new SimpleLightbox('ul.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onFormSubmit = async event => {
  try {
    event.preventDefault();
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('is-hidden');
    preLoader.classList.remove('is-hidden');

    inputValue = form.search.value.trim();
    currentPage = 1;

    if (inputValue === '') {
      iziToast.info({
        message: 'Searching field is empty',
        messageSize: '16',
        position: 'topRight',
      });

      preLoader.classList.add('is-hidden');
      event.target.reset();
      return;
    }

    const { data } = await fetchImages(inputValue, currentPage);
    totalPages = Math.ceil(data.totalHits / 15);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Sorry,',
        message:
          'there are no images matching your search query. Please try again!',
        messageSize: '16',
        position: 'topRight',
      });

      event.target.reset();
      return;
    }

    const drawGallery = data.hits
      .map(imageInfo => createGalleryImageTemplate(imageInfo))
      .join('');

    gallery.insertAdjacentHTML('beforeend', drawGallery);

    const galleryImage = gallery.querySelector('li');
    galleryImageHeight = galleryImage.getBoundingClientRect().height;

    console.log(totalPages);
    if (totalPages > 1) {
      loadMoreBtn.classList.remove('is-hidden');
    }

    newGalleryBox.refresh();
    event.target.reset();
  } catch ({ response: err }) {
    iziToast.error({
      title: 'Ooops',
      titleSize: '18',
      message: err.data,
      messageSize: '18',
      position: 'center',
      timeout: false,
      progressBar: false,
      overlay: true,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
    });
  } finally {
    preLoader.classList.add('is-hidden');
  }
};

const onLoadMoreBtnClick = async event => {
  preLoader.classList.remove('is-hidden');

  try {
    currentPage++;

    const { data } = await fetchImages(inputValue, currentPage);

    const drawGallery = data.hits
      .map(imageInfo => createGalleryImageTemplate(imageInfo))
      .join('');

    gallery.insertAdjacentHTML('beforeend', drawGallery);
    newGalleryBox.refresh();

    scrollBy({ top: galleryImageHeight * 2, behavior: 'smooth' });

    if (currentPage === totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        messageSize: '16',
        position: 'topRight',
        timeout: false,
      });
      return;
    }
  } catch ({ response: err }) {
    iziToast.error({
      title: 'Ooops',
      titleSize: '18',
      message: err.data,
      messageSize: '18',
      position: 'center',
      timeout: false,
      progressBar: false,
      overlay: true,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
    });
  } finally {
    preLoader.classList.add('is-hidden');
  }
};

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
