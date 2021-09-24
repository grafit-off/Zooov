// Burger

/* Бургер-меню
	1. Добавить модификаторы для бургера и меню.
	2. Изменить aria-expended.
	3. Запретить скролл.
	4. Выключать кнопку открытия меню до завершения анимации.
*/

class Burger {
	constructor(btn, list) {
		this.btn = btn;
		this.list = list;
		this.opened = false;
		this.isIphone = isiPhone || isiPad || isiPod;
		this.btnDisabled = false;
	}

	open() {
		this.disableBtn();
		if (this.isIphone) {
			disableScroll();
		} else {
			body.classList.add('lock')
		}
		this.btn.classList.add('burger--active');
		this.btn.setAttribute('aria-expanded', true);
		this.list.classList.add('header__nav--active');
		this.list.setAttribute('aria-hidden', false);

	}

	close() {
		this.disableBtn();
		if (this.isIphone) {
			enableScroll();
		} else {
			body.classList.remove('lock')
		}
		this.btn.classList.remove('burger--active');
		this.btn.setAttribute('aria-expanded', false);
		this.list.classList.remove('header__nav--active');
		this.list.setAttribute('aria-hidden', true);

	}

	toggle() {
		if (this.btn.classList.contains('burger--active')) {
			this.close();
		} else {
			this.open();
		}
	}

	disableBtn() {
		this.btn.disabled = true;
		this.list.addEventListener('transitionend', () => {
			this.btn.disabled = false;
		})
	}
}