import images from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('[data-action="close-lightbox"]');

gallery.addEventListener('click', handleClick);
closeButton.addEventListener('click', handleClose);
modalWindow.addEventListener('click', handleCloseOverlay);
window.addEventListener('keydown', hadleCloseEsc);

function handleClick(e) {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
        modalWindow.classList.add('is-open');
        const originalImg = e.target.dataset.source;
        modalImg.src = originalImg;
    }
}

function handleClose(event) {
    modalWindow.classList.remove('is-open');
    modalImg.src = '';
}

function handleCloseOverlay(event) {
    if (event.target !== modalImg) {
        handleClose();
    }
    return;
}

function hadleCloseEsc(event) {
    if (event.code == 'Escape') {
        handleClose();
    }
}

const liMarkUp = images.reduce((acc, img) => {
    const li =
        acc +
        `<li class="gallery__item">
    <a
      class="gallery__link"
      href=${img.original}
    >
      <img
        class="gallery__image"
        src=${img.preview}
        data-source=${img.original}
        alt=${img.description}
      />
    </a>
  </li>`;
    return li;
}, '');

gallery.insertAdjacentHTML('beforeend', liMarkUp);
