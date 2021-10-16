// Variables
const isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
const isiPhone = (navigator.userAgent.match(/iPhone/i) != null);
const isiPad = (navigator.userAgent.match(/iPad/i) != null);
const isiPod = (navigator.userAgent.match(/iPod/i) != null);
const media = window.matchMedia("(max-width: 992px)");

const body = document.querySelector('.body');
const header = document.querySelector('.header');
const headerLinks = header.querySelectorAll('.header__link');
const burgerBtn = header.querySelector('.burger');
const burgerList = header.querySelector('.header__nav');
const burger = new Burger(burgerBtn, burgerList);
const heroLink = document.querySelector('.hero__link');
const descrModal = document.querySelector('.descr-modal');
const orderModal = document.querySelector('.order-modal');
const calcModal = document.querySelector('#modal-calc');
const responseModal = document.querySelector('.response-modal');
const imageMain = descrModal.querySelector('.image-preview__main-img');
const dietSec = document.querySelector('.diet');
const fields = document.querySelectorAll('.field__input');
const stepper = new Stepper('.stepper');
const selectItem = document.querySelector('.select__item');
const priceEl = document.querySelector('.order-form__price');
const contactForm = document.querySelector('.contact-form');
const orderForm = document.querySelector('.order-form');
const calcForm = document.querySelector('.calc-form');
const snackbar = document.querySelector(".snackbar");


let invalid;
const VALIDATION_PATTERNS = {
	notNumber: /\D/,
	notEmpty: /^(?!\s*$).+/,
	phone: /^\d{7,14}$/,
	email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}

const classificationSwiperObj = {
	containerModifierClass: "classification-swiper",
	wrapperClass: "classification-swiper__wrapper",
	slideClass: "classification-swiper__slide",
	slidesPerView: 1,
	grabCursor: true,
	pagination: {
		el: ".classification-swiper__pagination",
		clickable: true
	},
	a11y: {
		paginationBulletMessage: 'Перейти к слайду номер {{index}}'
	},
	watchSlidesVisibility: true
};
const classificationSwiper = new MobileSwiper('classification-swiper', classificationSwiperObj, 767);

const dietSwiperObj = {
	containerModifierClass: "diet-swiper",
	wrapperClass: "diet-swiper__wrapper",
	slideClass: "diet-swiper__slide",
	slidesPerView: 1.25,
	spaceBetween: 25,
	grabCursor: true,
	pagination: {
		el: ".diet-swiper__pagination",
		clickable: true,
		bulletElement: 'button'
	},
	a11y: {
		paginationBulletMessage: 'Перейти к слайду номер {{index}}'
	},
	watchSlidesVisibility: true
};
const dietSwiper = new MobileSwiper('diet-swiper', dietSwiperObj, 767);

const resizeFunc = () => {
	classificationSwiper.init();
	dietSwiper.init();
}

const resizeDebounce = new Debounce(300, resizeFunc);

const scrollFunc = () => {
	fixHeader();
	showActiveLink();
}
const scrollDebounce = new Debounce(100, scrollFunc);

const accordions = document.querySelectorAll('.accordion__item');

accordions.forEach(el => new Accordion({
	selector: el
}));