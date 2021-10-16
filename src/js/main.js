document.addEventListener("DOMContentLoaded", () => {
	// Includes
	//? @include('components/_debounce.js');
	//? @include('components/_burger.js');
	//? @include('components/_swiper.js');
	//? @include('components/_accordion.js');
	//? @include('components/_stepper.js');
	//? @include('components/_variables.js');
	// @include('components/_functions.js');
	// @include('resources/_scrollLockIOS.js');
	// @include('resources/_modal.js');
	// -- //

	header.addEventListener('click', (e) => {
		if (e.target.closest('.burger')) {
			burger.toggle();
		}
		if (e.target.closest('.header__link')) {
			e.preventDefault();
			if (media.matches) burger.close();
			setTimeout(() => {
				scrollToTarget(e.target.hash);
			}, 200);
		}
	})
	heroLink.addEventListener('click', () => {
		scrollToTarget(heroLink.hash);
	})

	descrModal.addEventListener('click', (e) => {
		if (e.target.closest('.image-preview__button')) {
			toggleImage(e.target.closest('.image-preview__button'))
		}
	})

	dietSec.addEventListener('click', (e) => {
		if (e.target.closest('.product__btn')) {
			loadDescrModal(e.target.closest('.product__info'));
			loadOrderModal(e.target.closest('.product__info'));
		}
		if (e.target.closest('.product__order')) {
			loadOrderModal(e.target.closest('.product__wrapper').querySelector('.product__info'));
		}
	})

	fields.forEach((el) => {
		el.addEventListener('focus', (e) => {
			toggleField(e.currentTarget);
		})
		el.addEventListener('blur', (e) => {
			toggleField(e.currentTarget);
		})
	});
	showActiveLink();
	AOS.init();
	classificationSwiper.init();
	dietSwiper.init();
	select();
	calcPrice();

	orderForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		let data = {};
		invalid = false;
		orderForm.querySelectorAll('[data-validation]').forEach((el) => {
			validate(el);
		});
		if (!invalid) {
			orderForm.querySelectorAll('[data-validation]').forEach((el) => {
				data[el.name] = el.value;
			});
			data.price = priceEl.textContent;
			data.volume = orderForm.querySelector('select[name="volume"]').value;

			if (await fetchJSON("https://jsonplaceholder.typicode.com/posts", data)) {
				orderForm.reset();
				modalOpen(document.querySelector('#modal-response'));
			} else {
				showSnackbar('Ошибка! Мы скоро это исправим!', 800, 'red');
			}
		}
	})

	orderForm.addEventListener('focusin', (e) => {
		focusIn(e)
	});

	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		let data = {};
		invalid = false;
		contactForm.querySelectorAll('[data-validation]').forEach((el) => {
			validate(el);
		});
		if (!invalid) {
			contactForm.querySelectorAll('[data-validation]').forEach((el) => {
				data[el.name] = el.value;
			});
			if (await fetchJSON("https://jsonplaceholder.typicode.com/posts", data)) {
				contactForm.reset();
				showSnackbar('Спасибо! Мы скоро с Вами свяжемся!', 800, '#38c428');
			} else {
				showSnackbar('Ошибка! Мы скоро это исправим!', 800, 'red');
			}
		}
	})

	contactForm.addEventListener('focusin', (e) => {
		focusIn(e)
	});

	calcForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		let data = {};
		invalid = false;
		calcForm.querySelectorAll('[data-validation]').forEach((el) => {
			validate(el);
		});

		if (!invalid) {
			calcForm.querySelectorAll('[data-validation]').forEach((el) => {
				data[el.name] = el.value;
			});
			data.animal = calcForm.querySelector('input[name="radio"]:checked').value;
			if (calcForm.querySelector('textarea').value.trim()) {
				data.message = calcForm.querySelector('textarea').value;
			}
			if (await fetchJSON("https://jsonplaceholder.typicode.com/posts", data)) {
				modalClose(calcModal);
				calcForm.reset();
				showSnackbar('Спасибо! Мы скоро с Вами свяжемся!', 800, '#38c428');
			} else {
				showSnackbar('Ошибка! Мы скоро это исправим!', 800, 'red');
			}
		}
	})

	calcForm.addEventListener('focusin', (e) => {
		focusIn(e)
	});

	stepper.callBack(() => {
		calcPrice();
	})

	window.addEventListener('resize', () => {
		resizeDebounce.init();
	});

	window.addEventListener('scroll', function () {
		scrollDebounce.init();
	});
})

