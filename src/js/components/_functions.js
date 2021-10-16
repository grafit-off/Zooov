// Fixed Header
function fixHeader() {
	let pos = window.pageYOffset;
	if (!header.classList.contains('header--active') && pos > window.innerHeight) {
		header.classList.add('header--active');
		burgerBtn.classList.add('burger--scroll');
		if ('animate' in header) {
			header.animate([
				{ top: '-100px' },
				{ top: '0' }
			], {
				duration: 200,
				easing: 'ease-out'
			});
		}
	} else if (header.classList.contains('header--active') && window.innerHeight > pos && !burgerBtn.classList.contains('burger--active')) {
		if ('animate' in header) {
			let anim = header.animate([
				{ top: '0' },
				{ top: '-100px' }
			], {
				duration: 200,
				easing: 'ease-out'
			});

			anim.addEventListener('finish', () => {
				header.classList.remove('header--active');
				burgerBtn.classList.remove('burger--scroll');
			})
		}
	}
}

// Scroll To Target
function scrollToTarget(id) {
	const target = document.querySelector(id);
	if (isiPad || isiPhone || isiPod && target !== null) {
		const bodyRect = document.body.getBoundingClientRect();
		const elemRect = target.getBoundingClientRect();
		const offset = elemRect.top - bodyRect.top;

		const requestAnimFrame = (function () {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();
		Math.easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) {
				return c / 2 * t * t + b
			}
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};
		function scrollToIos(to, callback, duration) {
			function move(amount) {
				document.documentElement.scrollTop = amount;
				document.body.parentNode.scrollTop = amount;
				document.body.scrollTop = amount;
			}

			function position() {
				return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
			}
			let start = position(),
				change = to - start,
				currentTime = 0,
				increment = 20;
			duration = (typeof (duration) === 'undefined') ? 500 : duration;

			let animateScroll = function () {
				currentTime += increment;
				let val = Math.easeInOutQuad(currentTime, start, change, duration);
				move(val);
				if (currentTime < duration) {
					requestAnimFrame(animateScroll);
				} else {
					if (callback && typeof (callback) === 'function') {
						callback();
					}
				}
			};
			animateScroll();
		}
		scrollToIos(offset - 15, null, 500);
		return;
	}

	if (target !== null) {
		let pos = target.offsetTop - (media.matches ? 20 : -1);
		window.scrollTo({
			top: pos,
			behavior: 'smooth'
		});
	}
}

function showActiveLink() {
	for (let i = headerLinks.length - 1; i >= 0; i--) {
		let target = document.querySelector(headerLinks[i].hash);
		if (window.scrollY > target.offsetTop - 40) {
			if (document.querySelector('.header__link--active')) {
				document.querySelector('.header__link--active').classList.remove('header__link--active');
			}
			headerLinks[i].classList.add('header__link--active');
			break;
		}
	}
}

function toggleImage(selector) {
	if (document.querySelector('.image-preview__button--active')) {
		document.querySelector('.image-preview__button--active').classList.remove('image-preview__button--active');
	}
	selector.classList.add('image-preview__button--active');
	imageMain.src = selector.querySelector('.image-preview__img').src;
}

function loadDescrModal(selector) {
	let obj = {
		name: `${selector.querySelector('.product__heading').textContent}`,
		text: `${selector.querySelector('.product__text').textContent}`,
		type: `${selector.querySelector('.product__type').textContent}`,
		weight: `${selector.querySelector('.product__weight').textContent}`,
		images: [`${selector.querySelector('.product__image').src}`, `img/image-preview2.jpg`, `img/image-preview3.jpg`, `img/image-preview4.jpg`]
	}

	let modal = document.querySelector('#modal-descr');
	let imagePreviewList = ``;

	obj.images.forEach((el, i) => {
		imagePreviewList += `
		<li class="image-preview__item">
			<button class="image-preview__button btn-reset" aria-label="Показть изображение ${++i}">
				<img src="${el}" alt="" class="image-preview__img" aria-hidden="true">
			</button>
		</li>
		`
	});

	modal.querySelector('.image-preview__list').innerHTML = imagePreviewList;
	modal.querySelector('.image-preview__list').firstElementChild.querySelector('.image-preview__button').classList.add('image-preview__button--active');
	modal.querySelector('.image-preview__main-img').src = obj.images[0];
	modal.querySelector('.descr-modal__title').textContent = obj.name;
	modal.querySelector('.descr-modal__text').textContent = obj.text;
	modal.querySelector('.descr-modal__type').textContent = obj.type;
	modal.querySelector('.descr-modal__weight').textContent = obj.weight;
}


function toggleField(input) {
	const label = input.closest('.field').querySelector('.field__label');
	if (label.classList.contains('field__label--focused') && input.value.trim() === '') {
		label.classList.remove('field__label--focused')
	} else {
		label.classList.add('field__label--focused')
	}
}

function loadOrderModal(selector) {
	let obj = {
		name: `${selector.querySelector('.product__heading').textContent}`,
		type: `${selector.querySelector('.product__type').textContent}`,
		image: `${selector.querySelector('.product__image').src}`,
		imageAlt: `${this.name.toLowerCase()}`
	}
	responseModal.querySelector('.response-modal__img').src = obj.image;
	orderModal.querySelector('.order-modal__img').src = obj.image;
	orderModal.querySelector('.order-modal__img').alt = obj.imageAlt;
	orderModal.querySelector('.order-form__title ').textContent = obj.name;
	orderModal.querySelector('.order-form__type ').textContent = obj.type;
}

/* Custom Select */
function select() {
	//Получаем все "select" по селектору
	const selects = document.querySelectorAll('.select__item')
	//переборка по полученным "select"
	for (let i = 0; i < selects.length; i++) {
		const select = selects[i]
		//получаем все "option" внутри "select"
		const options = select.querySelectorAll('option')
		//создаем кастомный "select"
		const cSelect = document.createElement('div')
		const cSelectList = document.createElement('div')
		const cSelectCurrent = document.createElement('button');
		cSelectCurrent.setAttribute('tabindex', '0')

		select.setAttribute('tabindex', '-1')
		//задем классы и атрибуты кастомному "select"
		cSelect.className = 'custom-select'
		cSelectList.className = 'custom-select__list'
		cSelectCurrent.className = 'custom-select__current  btn-reset'
		//по умолчанию у button будет type="submit", поэтому меням на type="button" чтобы избежать отправку формы при клие на кастомный "select"
		cSelectCurrent.setAttribute('type', 'button')
		//создаем вложенность созданных элементов
		cSelect.append(cSelectCurrent, cSelectList)
		//добавляем кастоный "select" сразу после оргинального "select"
		select.after(cSelect)
		//получаем список и значения "option" из "select", затем создаём кастомный "option" для кастомного "select"
		const createCustomDom = function (x, y) {
			let selectItems = ''
			for (var i = 0; i < options.length; i++) {
				selectItems += '<button type="button" class="custom-select__item btn-reset"  data-value="' + options[i].value + '">' + options[i].text + '</button>'
			}
			cSelectList.innerHTML = selectItems
			x(), y();
		}
		//открываем-закрываем выпадающий список по клику
		const toggleClass = () => {
			cSelectCurrent.classList.toggle('custom-select__current--show');
			cSelectList.classList.toggle('custom-select__list--show');
		}
		//присваиваем текстовое  значение  в кастомном "select"
		const currentTextValue = () => cSelectCurrent.textContent = select.value;
		//получаем и задаем значения text/value 
		const currentValue = () => {
			const items = cSelectList.children
			for (var el = 0; el < items.length; el++) {
				let selectValue = items[el].getAttribute('data-value')
				let selectText = items[el].textContent
				items[el].addEventListener('click', () => {
					cSelectCurrent.classList.remove('custom-select__current--show');
					cSelectList.classList.remove('custom-select__list--show');

					cSelectCurrent.textContent = selectText;
					select.value = selectValue;
					calcPrice();
				})
			}
		}

		const desctopFn = () => {
			cSelectCurrent.addEventListener('click', toggleClass);
			cSelectCurrent.addEventListener('keydown', (event) => {
				if (event.code == 'Enter' || event.code == 'Escape') {
					toggleClass()
				}
			});
		}
		const mobileFn = () => {
			for (let j = 0; j < selects.length; j++) {
				let mobileSelect = selects[j]
				mobileSelect.classList.add('select__item--mobile')
				mobileSelect.addEventListener('change', () => {
					mobileSelect.nextElementSibling.querySelector('.custom-select__current').textContent = mobileSelect.value
				})
			}
		}
		createCustomDom(currentTextValue, currentValue)
		//закрываем выпадающий список по клику вне области кастомного селекта
		document.addEventListener('mouseup', (e) => {
			if (!cSelect.contains(e.target)) {
				cSelectCurrent.classList.remove('custom-select__current--show');
				cSelectList.classList.remove('custom-select__list--show');
			}
		})
		detectmob(mobileFn, desctopFn)
		function detectmob(x, y) {
			if (navigator.userAgent.match(/Android/i)
				|| navigator.userAgent.match(/webOS/i)
				|| navigator.userAgent.match(/iPhone/i)
				|| navigator.userAgent.match(/iPad/i)
				|| navigator.userAgent.match(/iPod/i)
				|| navigator.userAgent.match(/BlackBerry/i)
				|| navigator.userAgent.match(/Windows Phone/i)
			) {
				x();
			}
			else {
				y();
			}
		}
	}
}

function calcPrice() {
	let price = 0;
	const volume = parseInt(selectItem.value);
	price = (volume * 1.56) * stepper.getCount();
	priceEl.textContent = `${price}₽`;
}

async function fetchJSON(url, data) {
	try {
		let response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': "application/json; charset=utf-8"
			}
		})

		let result = await response.json();
		console.log(`Response Status: ${response.status}`);
		console.log(result);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}

}

function validate(input) {
	input.value = input.value.trim();
	if (!VALIDATION_PATTERNS[input.dataset.validation].test(input.value.trim())) {
		input.classList.add('input-invalid')
		invalid = true;
	}
}


function showSnackbar(text = snackbar.textContent, delay = 0, backgroundColor = "#333", transition = 3000) {
	setTimeout(() => {
		snackbar.textContent = text;
		snackbar.style.backgroundColor = backgroundColor;
		snackbar.classList.add('snackbar--show');
		snackbar.removeAttribute('hidden', '')

		setTimeout(() => {
			snackbar.classList.remove('snackbar--show');
			snackbar.setAttribute('hidden', '')
		}, transition);
	}, delay);
}

function focusIn(e) {
	if (e.target.closest('[data-validation]') && e.target.classList.contains('input-invalid')) {
		e.target.classList.remove('input-invalid');
	}
}

// -- //