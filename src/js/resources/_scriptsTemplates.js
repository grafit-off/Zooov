// Burger Menu
const wrapper = document.querySelector('.wrapper')
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const headerLink = document.querySelectorAll('.header__link');
const md3 = window.matchMedia("(max-width: 767px)");

function burgerToggle() {
	headerBurger.classList.toggle('active');
	headerMenu.classList.toggle('active');
	body.classList.toggle('lock');
}
headerBurger.addEventListener('click', () => {
	burgerToggle()
})
if (md3.matches) {
	headerLink.forEach((el) => {
		el.addEventListener('click', () => {
			setTimeout(() => {
				burgerToggle()
			}, 300)
		})
	})
}
// -- //

// Scroll to link
const isiPhone = (navigator.userAgent.match(/iPhone/i) != null);
const isiPad = (navigator.userAgent.match(/iPad/i) != null);
const isiPod = (navigator.userAgent.match(/iPod/i) != null);

if (isiPhone || isiPad || isiPod) {
	let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
		V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset,  // производим прокрутка прокрутка
				hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
			t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
				start = null;
			requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) start = time;
				let progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash  // URL с хэшем
				}
			}
		}, false);
	}
}

// Scroll to anchors
// Анимация норм
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) {
		return c / 2 * t * t + b
	}
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function (t, b, c, d) {
	var tc = (t /= d) * t * t;
	return b + c * (tc);
};

Math.inOutQuintic = function (t, b, c, d) {
	var ts = (t /= d) * t,
		tc = ts * t;
	return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

function scrollTo(to, callback, duration) {
	// because it's so fucking difficult to detect the scrolling element, just move them all
	function move(amount) {
		document.documentElement.scrollTop = amount;
		document.body.parentNode.scrollTop = amount;
		document.body.scrollTop = amount;
	}

	function position() {
		return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
	}
	var start = position(),
		change = to - start,
		currentTime = 0,
		increment = 20;
	duration = (typeof (duration) === 'undefined') ? 500 : duration;
	var animateScroll = function () {
		// increment the time
		currentTime += increment;
		// find the value with the quadratic in-out easing function
		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		// move the document.body
		move(val);
		// do the animation unless its over
		if (currentTime < duration) {
			requestAnimFrame(animateScroll);
		} else {
			if (callback && typeof (callback) === 'function') {
				// the animation is done so lets callback
				callback();
			}
		}
	};
	animateScroll();
}

const scrollLinks = document.querySelectorAll('[data-scroll]');
scrollLinks.forEach((el) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		const to = el.getAttribute('href').replace('#', '');
		const element = document.getElementById(to);
		const bodyRect = document.body.getBoundingClientRect();
		const elemRect = element.getBoundingClientRect();
		const offset = elemRect.top - bodyRect.top;
		scrollTo(offset, null, 175);
	})
});

// Учитывает хедер
const smoothScroll = (targetEl, duration, header) => {
	const headerElHeight = document.querySelector(`${header}`).clientHeight;
	let target = document.querySelector(targetEl);
	let targetPosition = target.getBoundingClientRect().top - headerElHeight;
	let startPosition = window.pageYOffset;
	let startTime = null;

	const ease = function (t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};

	const animation = function (currentTime) {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const run = ease(timeElapsed, startPosition, targetPosition, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	};
	requestAnimationFrame(animation);
};

const scrollTo = () => {
	const links = document.querySelectorAll('[data-scroll]');
	links.forEach(each => {
		each.addEventListener('click', function () {
			const currentTarget = this.getAttribute('href');
			smoothScroll(currentTarget, 200, '.header');
		});
	});
};
scrollTo();

// -- //

// Active header on scroll
const header = document.querySelector(".header");
let prevScrollpos = window.pageYOffset;

function navOpen() {
	if (prevScrollpos != 0) {
		header.classList.add('header--active');
		headerMenu.classList.add('menu--onscroll');
	} else {
		header.classList.remove('header--active');
		headerMenu.classList.remove('menu--onscroll');
	}
}
function navScroll() {
	window.onscroll = function () {
		let currentScrollPos = window.pageYOffset;
		if (prevScrollpos < currentScrollPos) {
			header.classList.add('header--active');
			headerMenu.classList.add('menu--onscroll');
		} else if (prevScrollpos = currentScrollPos) {
			header.classList.add('header--active');
			headerMenu.classList.add('menu--onscroll');
		} else {
			header.classList.remove('header--active');
			headerMenu.classList.remove('menu--onscroll');
		}
		prevScrollpos = currentScrollPos;
	}
}
navOpen()
navScroll()
// -- //

// Показ хедера при скролле ВВЕРХ

function headerFixed() {
	const header = document.querySelector('.header'),
		offsetHeight = header.offsetHeight;
	if (pageYOffset > offsetHeight) {
		header.classList.add('_hide');
		header.style.display = 'none';
		setTimeout(() => {
			header.style.display = 'block';
		}, 200)
	}
	window.addEventListener('load', function () {
		let height = window.innerHeight;
		let lostY = 0;
		document.addEventListener('scroll', function () {
			if (lostY >= 110) {
				if (window.scrollY > lostY) {
					header.classList.add('_hide');
				} else {
					if (window.scrollY > height || lostY < offsetHeight) {
						header.classList.remove('_hide');
					}
				}
			} else {
				header.classList.remove('_hide');
			}
			lostY = window.scrollY;
		});
	});
}
headerFixed();

// Accordion
document.querySelectorAll('.accordion-triger').forEach((item) =>
	item.addEventListener('click', () => {
		item.parentNode.classList.toggle('accordion--active');
		let accordionBody = item.parentNode.querySelector('.accordion__body');
		if (item.parentNode.classList.contains('accordion--active')) {
			item.parentNode.querySelector('.accordion-triger').setAttribute('aria-expanded', true)
			accordionBody.setAttribute('aria-hidden', false)
			accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
		} else {
			item.parentNode.querySelector('.accordion-triger').setAttribute('aria-expanded', false)
			accordionBody.setAttribute('aria-hidden', true)
			accordionBody.style.maxHeight = null;
		}
	})
)
// -- //

// active class of menu items onscroll
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		document.querySelectorAll('.section').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance) {
				document.querySelectorAll('.header__list a').forEach((el) => {
					if (el.classList.contains('active')) {
						el.classList.remove('active');
					}
				});
				document.querySelectorAll('.header__list li')[i].querySelector('a').classList.add('active');
			}
		});
	}
});
// -- //


// Snackbar
const snackbarBtn = document.querySelector('.snackbar-btn');
const snackbar = document.querySelector(".snackbar");
function snackbarShow(text, type, time, delay) {
	snackbar.innerHTML = `${text}`;
	snackbarBtn.disabled = true;
	if (time == null) {
		time = 3000;
	} else if (time == 'auto') {
		time = 3000;
	}
	if (delay == null) {
		delay = 0;
	} else if (delay == 'auto') {
		delay = 0;
	}
	setTimeout(() => {
		if (type == 0) {
			snackbar.removeAttribute('hidden')
			snackbar.classList.add('show-notification');
			setTimeout(function () {
				snackbar.className = snackbar.className.replace("show-notification", "");
				snackbar.setAttribute('hidden', 'hidden')
			}, time);
		} else if (type == 1) {
			snackbar.removeAttribute('hidden')
			snackbar.classList.add('show-attention');
			setTimeout(function () {
				snackbar.className = snackbar.className.replace("show-attention", "");
				snackbar.setAttribute('hidden', 'hidden')
			}, time);
		}
		setTimeout(() => {
			snackbarBtn.disabled = false;
		}, time)
	}, delay)
}
// -- //

// cookies
const cookieEl = document.querySelector('.cookie-block');
const cookieSubmitBtn = document.querySelector('.btn-cookies');
cookieSubmitBtn.addEventListener('click', () => {
	cookieEl.style.display = 'none';
});
let cookies = () => {
	if (!Cookies.get('hide-cookie')) {
		setTimeout(() => {
			cookieEl.style.display = 'block';
		}, 1000);
	}
	Cookies.set('hide-cookie', 'true', {
		expires: 30
	});
}
cookies();
// -- //


// Validate
function ValidMail(item) {
	let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	let myMail = item.value;
	let valid = re.test(myMail);
	if (!valid) {
		snackbarShow('E-mail введен неверно! Проверьте ваши данные!', 1)
	}
	return valid;
}
function ValidPhone(item) {
	let re = /^\d[\d\(\)\ -]{7,14}\d$/;
	let myPhone = item.value;
	let valid = re.test(myPhone);
	if (!valid) {
		snackbarShow('Номер телефона введен неверно! Проверьте ваши данные!', 1)
	}
	return valid;
}
// -- //

// Fomr PHPMail
document.querySelector('.form').addEventListener('submit', (e) => {
	e.preventDefault();
	let self = e.currentTarget;

	let formData = new FormData(self);
	let name = self.querySelector('[name="Имя"]').value;
	let mail = self.querySelector('[name="E-mail"]').value;
	let tel = self.querySelector('[name="Номер телефона"]').value;

	formData.append('Имя', name);
	formData.append('Номер телефона', tel);
	formData.append('E-mail', mail);

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Отправлено');
				snackbarShow('Покупка оформленна! В скором времени я с вами свяжусь!', 0, 'auto', 1000)
				popupClose(currentCloseBtn.closest('.popup'));
				previousActiveElement.focus();
			} else {
				snackbarShow('Вы все сделали правильно! Извините, отправка заявок недоступна!', 1, 'auto', 1000)
				popupClose(currentCloseBtn.closest('.popup'));
				previousActiveElement.focus();
			}
		}
	}

	xhr.open('POST', '/resources/mail.php', true);
	if (ValidPhone() && ValidMail()) {
		xhr.send(formData);
		self.reset();
	} else if (ValidMail() == false) {
		document.querySelector('.form__input--mail').focus();
	} else if (ValidPhone() == false) {
		document.querySelector('.form__input--tel').focus();
	}
});
// -- //

