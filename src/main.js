// import iziToast from 'izitoast';
// import SimpleLightbox from 'simplelightbox';
// import { createGalleryImageTemplate } from './js/render-functions';
// import { fetchImages } from './js/pixabay-api';

const form = document.querySelector('form.js-form');
const gallery = document.querySelector('ul.js-gallery');
const preLoader = document.querySelector('span.js-loader');

const onFormSubmit = event => {
  event.preventDefault();
  gallery.innerHTML = '';
  preLoader.classList.remove('is-hidden');

  const input = form.search.value.trim();

  if (input === '') {
    iziToast.info({
      message: 'Searching field is empty',
      messageSize: '16',
      position: 'topRight',
    });

    preLoader.classList.add('is-hidden');
    event.target.reset();
  } else {
    fetchImages(input)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.error({
            title: 'Sorry,',
            message:
              'there are no images matching your search query. Please try again!',
            messageSize: '16',
            position: 'topRight',
          });

          event.target.reset();
        } else {
          const drawGallery = data.hits
            .map(imageInfo => createGalleryImageTemplate(imageInfo))
            .join('');

          gallery.insertAdjacentHTML('beforeend', drawGallery);

          const newGalleryBox = new SimpleLightbox('ul.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
          });

          newGalleryBox.refresh();
          event.target.reset();
        }
      })
      .catch(err => {
        iziToast.error({
          title: err.name,
          titleSize: '18',
          message: err.message,
          messageSize: '18',
          position: 'center',
          timeout: false,
          progressBar: false,
          overlay: true,
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        });
      })

      .finally(() => {
        preLoader.classList.add('is-hidden');
      });
  }
};

form.addEventListener('submit', onFormSubmit);
