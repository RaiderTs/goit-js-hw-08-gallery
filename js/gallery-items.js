const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
// Создаем refs
const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  btnOpenModal: document.querySelector('.lightbox__button'),
  lightboxEl: document.querySelector('.js-lightbox'),
  lightboxImageEl: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdropModal: document.querySelector('.lightbox__overlay'),
  leftBtn: document.querySelector('.slider-arrow-left'),
  rightBtn: document.querySelector('.slider-arrow-right'),
};

//  Создаем разметку
//////////////////////////////////////////////////////////////////
const cardMarcap = createCardImagesMarcap(images);
refs.galleryContainer.insertAdjacentHTML('beforeend', cardMarcap);

function createCardImagesMarcap(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
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
// ставим слушателей
refs.galleryContainer.addEventListener('click', onImageClick); //  открываем модалку по нажатию на картинку
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdropModal.addEventListener('click', onBackdropClick); //  закрываем модалку по кнопке
refs.leftBtn.addEventListener('click', onBackSide); // листаем картинку влево
refs.rightBtn.addEventListener('click', onNextSide); // листаем картинку вправо

//  Проверяем клик по IMG
//  если равняется IMG тогда запускаем функция открытия модалки
function onImageClick(evt) {
  event.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  onOpenModal(evt);
  refs.lightboxImageEl.src = event.target.dataset.source;
  refs.lightboxImageEl.alt = event.target.alt;

  window.addEventListener('keydown', onEscPress);
}

function onCloseModal(evt) {
  window.removeEventListener('keydown', onEscPress);
  refs.lightboxEl.classList.remove('is-open');
  refs.lightboxImageEl.src = '';
  refs.lightboxImageEl.alt = '';
}

// Функция для открытия модалки
function onOpenModal(evt) {
  refs.lightboxEl.classList.add('is-open');
}

//  Функция для закрытия модалки

function onEscPress(evt) {
  if (event.code === 'Escape') {
    onCloseModal();
  } else if (event.code === 'ArrowLeft') {
    onBackSide();
  } else if (event.code === 'ArrowRight') {
    onNextSide();
  }
}

// Функция на закрытие модалки по бэкдроп

function onBackdropClick(evt) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

// Ищем индекс
function findIndex(evt) {
  if (!refs.lightboxEl.classList.contains('is-open')) {
    return null;
  }
  return images.findIndex(
    element => element.original === refs.lightboxImageEl.src,
  );
}
let imgIndex = findIndex(); // присваиваем переменную

// Функция листания изображения влево
function onBackSide(evt) {
  if (imgIndex === 0) {
    imgIndex += images.length;
  }
  imgIndex -= 1;
  refs.lightboxImageEl.src = images[imgIndex].original;
  refs.lightboxImageEl.alt = images[imgIndex].description;
}
// Функция листания изображения вправо
function onNextSide(evt) {
  if (imgIndex === images.length - 1) {
    imgIndex -= images.length;
  }
  imgIndex += 1;
  refs.lightboxImageEl.src = images[imgIndex].original;
  refs.lightboxImageEl.alt = images[imgIndex].description;
}
