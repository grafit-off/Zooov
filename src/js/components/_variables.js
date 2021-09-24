// Variables
const isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
const isiPhone = (navigator.userAgent.match(/iPhone/i) != null);
const isiPad = (navigator.userAgent.match(/iPad/i) != null);
const isiPod = (navigator.userAgent.match(/iPod/i) != null);
const media = window.matchMedia("(max-width: 992px)");

const body = document.querySelector('.body');
const header = document.querySelector('.header');
const burgerBtn = document.querySelector('.burger');
const burgerList = document.querySelector('.header__nav');
const burger = new Burger(burgerBtn, burgerList);


