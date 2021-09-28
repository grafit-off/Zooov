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
		clickable: true
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
	console.log('ResizeDebounce');
}
const resizeDebounce = new Debounce(300, resizeFunc);

const scrollFunc = () => {
	fixHeader();
	console.log('ScrollDebounce');
}
const scrollDebounce = new Debounce(100, scrollFunc);


