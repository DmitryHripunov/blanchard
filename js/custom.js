'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const topMenu = document.querySelectorAll('.js-header-nav');
  const subMenu = document.querySelectorAll('.js-submenu-link');
  const selectEl = document.querySelector('.js-choice');
  const accordionEl = document.querySelectorAll('.js-catalog-accordion-btn');
  const paneEl = document.querySelectorAll('.tab-pane');
  const authorEl = document.querySelectorAll('.js-catalog-author-link');
  const authorDesc = document.querySelectorAll('.catalog__accordion-card');
  const dateList = document.querySelectorAll('.catalog__accordion-item');
  const tabEl = document.querySelectorAll('.js-tab-link');
  const eventBtnEl = document.querySelector('.js-events-btn');
  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask('+7 (999) 999-99-99');

  // top-menu scroll 
  topMenu.forEach((nav) => {
    nav.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionElem = nav.getAttribute('href');
      document.querySelector('' + sectionElem).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  })

  // hero swiper
  const heroSwiper = new Swiper('.hero__swiper-container', {
    effect: 'fade',
    speed: 60000,
    loop: true,
    autoplay: true,
  });

  // gallery swiper
  const gallerySwiper = new Swiper('.gallery__swiper-container', {
    navigation: {
      nextEl: '.gallery__button-next',
      prevEl: '.gallery__button-prev',
    },
    pagination: {
      el: '.gallery__pagination',
      type: 'fraction',
    },
    slidesPerView: 1,
    centeredSlides: true,
    lazy: true,
  });

  // events swiper
  const eventsSwiper = new Swiper('.events__swiper-container', {
    slidesPerView: 6,
  });

  // editions swiper
  const editionsSwiper = new Swiper('.editions__swiper-container', {
    navigation: {
      nextEl: '.editions__button-next',
      prevEl: '.editions__button-prev',
    },
    pagination: {
      el: '.editions__pagination',
      type: 'fraction',
    },
    lazy: true,
    slidesPerView: 3,
    spaceBetween: 50,
  });

  // project swiper 
  const projectsSwiper = new Swiper('.projects__swiper-container', {
    navigation: {
      nextEl: '.projects__button-next',
      prevEl: '.projects__button-prev',
    },
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,

  });
  // heroSwiper.updateProgress()
  // heroSwiper.updateSize() 

  // select custom
  const choicesEl = new Choices(selectEl, {
    searchEnabled: false,
    itemSelectText: '',
    removeItems: false,
    position: 'bottom',
  });

  // accordion handler
  accordionEl.forEach((tabBtn) => {
    tabBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabItem = e.target.closest('.catalog__accordion-item');

      tabItem.classList.toggle('active');
    });
  });

  // tabs handler
  tabEl.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      tabEl.forEach((elem) => {
        if (elem.classList.contains('active')) {
          elem.classList.remove('active')
        }
      });

      item.classList.add('active');

      let hrefTabLink = item.getAttribute('href');
      const idTabLink = document.getElementById(hrefTabLink);

      paneEl.forEach((el) => {
        if (el.classList.contains('tab-pane--show')) {
          el.classList.remove('tab-pane--show')
        }
      });

      idTabLink.classList.add('tab-pane--show');

      
      authorEl.forEach((link) => {
        link.classList.remove('active');
      });

      authorDesc.forEach((cart) => {
        cart.classList.remove('card-active');
      });

      dateList.forEach((item) => {
        item.classList.remove('active');
      })

      const tabActive = document.querySelector('.tab-pane.tab-pane--show');
      const findAutor = tabActive.getElementsByClassName
      ('catalog__author-link')[0];
      const findCard = tabActive.getElementsByClassName('catalog__accordion-card')[0];
      const findDate = tabActive.getElementsByClassName
      ('catalog__accordion-item')[0];

      findAutor.classList.add('active');
      findCard.classList.add('card-active');
      findDate.classList.add('active');
    });
  });

  // author handler 
  authorEl.forEach((authorBtn) => {
    authorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const authorPath = e.currentTarget.dataset.path;
      const cardTarget = document.querySelector(`[data-target=${authorPath}]`);

      authorEl.forEach((el) => {
        if (el.classList.contains('active')) {
          el.classList.remove('active')
        }
      });

      authorDesc.forEach((card) => {
        card.classList.remove('card-active');
      });

      authorBtn.classList.add('active');

      if (authorBtn.classList.contains('active')) {
        cardTarget.classList.add('card-active');
      }
    });
  });

  // events handler 
  eventBtnEl.addEventListener('click', () => {
    const eventsSlide = document.querySelectorAll('.events__slide');

    eventsSlide.forEach((el) => {
      if (el.classList.contains('events__slide--hidden')) {
        el.classList.remove('events__slide--hidden');
      }
    });

    eventBtnEl.classList.add('events__slide--hidden');
  });

  // mask
  im.mask(selector);

  // validate
  new window.JustValidate('.contacts__form', {
    rules: {
      email: {
        required: true,
        email: true,
      },
      name: {
        required: true,
        minLength: 3,
        maxLength: 15,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },

    focusWrongField: true,

    submitHandler: function (form, values, ajax) {
      ajax({
        url: '#',
        method: 'get',
        data: values,
        async: true,
        callback: function (response) {
          alert('AJAX submit successful! \nResponse from server:' + response)
        },
        error: function (response) {
          alert('AJAX submit error! \nResponse from server:' + response)
        }
      });
    },

    invalidFormCallback: function (errors) {
      console.log(errors);
    },
  });

  // y-map custom 
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map('map', {
      center: [55.75846306898368, 37.601079499999905],
      zoom: 15,
    });

    var myPlacemark = new ymaps.Placemark([55.75846306898368, 37.601079499999905], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/svg/map.svg',
      iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('searchControl');
  }
});