import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createGalleryImageTemplate } from './render-functions';
import { fetchImages } from './pixabay-api';

const form = document.querySelector('form.js-form');
const gallery = document.querySelector('ul.js-gallery');
const preLoader = document.querySelector('span.js-loader');
const observedEl = document.querySelector('.observed-el-js');

let currentPage = 1;
let totalPages = 0;
let inputValue = '';

const newGalleryBox = new SimpleLightbox('ul.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const observerOptions = {
  root: null,
  rootMargin: '0px 0px 200px 0px',
  treshhold: 1,
};
const observerCallBack = async entries => {
  if (entries[0].isIntersecting) {
    preLoader.classList.remove('is-hidden');
    console.log(entries);
    try {
      currentPage++;

      const { data } = await fetchImages(inputValue, currentPage);

      const drawGallery = data.hits
        .map(imageInfo => createGalleryImageTemplate(imageInfo))
        .join('');

      gallery.insertAdjacentHTML('beforeend', drawGallery);
      newGalleryBox.refresh();

      if (currentPage === totalPages) {
        observer.disconnect();
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          messageSize: '16',
          position: 'topRight',
          timeout: false,
        });
        currentPage = 1;
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
  }
};

const observer = new IntersectionObserver(observerCallBack, observerOptions);

const onFormSubmit = async event => {
  try {
    event.preventDefault();
    gallery.innerHTML = '';
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

    if (totalPages > 1) {
      observer.observe(observedEl);
    } else {
      observer.disconnect();
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

form.addEventListener('submit', onFormSubmit);
