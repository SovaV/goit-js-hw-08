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
  {
    preview: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_5211-510x340.jpg',
    original: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_5211-1024x1365.jpg',
    description: 'wp-content',
  },
  {
    preview: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_8715.JPG-510x340.jpeg',
    original: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_8715.JPG-1024x682.jpeg',
    description: 'rr',
  },
  {
    preview: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_8741.JPG-510x340.jpeg',
    original: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_8741.JPG-1024x682.jpeg',
    description: 'rdsr',
  },
  {
    preview: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_8747.JPG-510x340.jpeg',
    original: 'https://demolitionparts.com/wp-content/uploads/2018/04/IMG_8747.JPG-1024x682.jpeg',
    description: 'rdsdsr',
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
refs.closeModalLightbox.addEventListener('click', onCloseModal);

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

lazyImages.forEach(image => {
  image.addEventListener('load', onImageLoaded);
});
function onImageLoaded(evt) {
  console.log('карт загрузилась');
  console.log(evt.target);
}
function creatImages(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href = '${original}';
  >
    <img
    loading="lazy"
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
  window.addEventListener('keydown', onArrowRight);
  window.addEventListener('keydown', onArrowLeft);
}
function onCloseModal() {
  refs.backdrop.classList.remove('is-open');
  refs.modalImage.src = '';
  window.removeEventListener('keydown', onEsc);
  window.removeEventListener('keydown', onArrowRight);
  window.removeEventListener('keydown', onArrowLeft);
}

// закриваємо по ESC
function onEsc(evn) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evn.code === ESC_KEY_CODE;
  if (isEscKey) {
    onCloseModal();
  }
}

// переключаем стрелочками тик тидик)
const findImageIndex = () => {
  const src = document.querySelector('.lightbox__image').src;
  return galleryItems.findIndex(image => image.original === src);
};
const changeImg = imageIndex => {
  const elem = galleryItems.find(function (value, index) {
    if (imageIndex === index) return value;
  });
  console.log('elem', elem.original);
  document.querySelector('.lightbox__image').src = elem.original;
};
const maxLength = galleryItems.length;
const previousImg = () => {
  let imageIndex = findImageIndex();
  imageIndex <= 0 ? (imageIndex = maxLength - 1) : imageIndex--;
  changeImg(imageIndex);
};
const nextImg = () => {
  let imageIndex = findImageIndex();
  let nextImageIndex = imageIndex + 1;
  nextImageIndex >= maxLength ? (imageIndex = 0) : imageIndex++;
  changeImg(imageIndex);
};
function onArrowRight(evn) {
  if (evn.code === 'ArrowRight') {
    nextImg();
  }
}
function onArrowLeft(evn) {
  if (evn.code === 'ArrowLeft') {
    previousImg();
  }
}
// function onArrowLeft(evn) {
//   if (evn.code === 'ArrowLeft') {
//     previousImg();
//   }
// }
// переключатєль стрелкою
// function nexImg(evn) {
//   console.log(evn);
//   const ARROWRIGHT_KEY_CODE = 'ArrowRight';
//   const isArrowRightKey = evn.code === ARROWRIGHT_KEY_CODE;
//   if (isArrowRightKey) {
//     onCloseModal();
//   }
// }

// function previousImg(evn) {
//   console.log(evn);
//   const ARROWLEFT_KEY_CODE = 'ArrowLeft';
//   const isArrowLeftKey = evn.code === ARROWLEFT_KEY_CODE;
//   if (isArrowLeftKey) {
//     onCloseModal();
//   }
// }
