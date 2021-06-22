const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
const refs = {
  openModalWindow: document.querySelector('.js-gallery'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  closeModalLightbox: document.querySelector('.lightbox__overlay'),
};
const cardsMarkup = creatImages(galleryItems);

refs.openModalWindow.innerHTML = cardsMarkup;
refs.openModalWindow.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.closeModalLightbox.addEventListener('click', onBackdropClick);
refs.closeModalLightbox.addEventListener('click', onBackdropClick);
function creatImages(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href = '${original}';
  >
    <img
      class="gallery__image"
      src="${preview}"
  data-source="${original}"

      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onOpenModal(evt) {
  const nextActiveImg = evt.target;
  const isGalleryImage = nextActiveImg.classList.contains('gallery__image');
  if (!isGalleryImage) {
    return;
  }
  refs.backdrop.classList.add('is-open');
  refs.modalImage.src = nextActiveImg.dataset.source;
  evt.preventDefault();
  window.addEventListener('keydown', onEsc);
}
function onCloseModal() {
  refs.backdrop.classList.remove('is-open');
  refs.modalImage.src = '';
  window.removeEventListener('keydown', onEsc);
}

// закриваємо по клику на div.lightbox__overlay.
function onBackdropClick() {
  onCloseModal();
}
// закриваємо по ESC
function onEsc(evn) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evn.code === ESC_KEY_CODE;
  if (isEscKey) {
    onCloseModal();
  }
}
