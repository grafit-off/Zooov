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

const swiperSelector = document.querySelector('.classification-swiper');
const swiperObj = {
	containerModifierClass: "classification-swiper",
	wrapperClass: "classification-swiper__wrapper",
	slideClass: "classification-swiper__slide",
	slidesPerView: 1,
	grabCursor: true,
	pagination: {
		el: ".classification-swiper__pagination",
		clickable: true
	},
	watchSlidesVisibility: true
};
const classificationSwiper = new MobileSwiper(swiperSelector, swiperObj, 767);

const resizeFunc = () => {
	classificationSwiper.init();
	console.log('ResizeDebounce');
}
const resizeDebounce = new Debounce(100, resizeFunc);

const scrollFunc = () => {
	fixHeader();
	console.log('ScrollDebounce');
}
const scrollDebounce = new Debounce(100, scrollFunc);
