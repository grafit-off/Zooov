// Stepper
class Stepper {
	constructor(selector) {
		this.stepper = document.querySelector(`${selector}`);
		this.input = this.stepper.querySelector('.stepper__input');
		this.btnPlus = this.stepper.querySelector('.stepper__btn--plus');
		this.btnMinus = this.stepper.querySelector('.stepper__btn--minus');
		this.count = this.input.value;

		this.input.addEventListener("keyup", (e) => {
			this.change(e);
		});
		this.input.addEventListener("keypress", (e) => {
			this.allowNumbersOnly(e);
		});
		this.input.addEventListener("change", (e) => {
			this.change(e);
		});
		this.btnPlus.addEventListener("click", (e) => {
			// if true plus else minus
			this.calculate(e, true);
		});
		this.btnMinus.addEventListener("click", (e) => {
			// if true plus else minus
			this.calculate(e, false);
		});
	}

	getCount() {
		return this.count;
	}

	callBack(func) {
		this.input.addEventListener("keyup", (e) => {
			func();
		});
		this.input.addEventListener("keypress", (e) => {
			func();
		});
		this.input.addEventListener("change", (e) => {
			func();
		});
		this.btnPlus.addEventListener("click", (e) => {
			func();
		});
		this.btnMinus.addEventListener("click", (e) => {
			func();
		});
	}

	allowNumbersOnly(e) {
		let code = e.which ? e.which : e.keyCode;
		if (code > 31 && (code < 48 || code > 57)) {
			e.preventDefault();
		}
	}

	disableBtn() {
		if (this.count == 1 || this.count == 1000) {
			this.count = 1;
			this.btnMinus.classList.add("stepper__btn--disabled");
			this.btnMinus.disabled = true;
		} else {
			this.btnMinus.classList.remove("stepper__btn--disabled");
			this.btnMinus.disabled = false;
		}
	}

	change(e) {
		let self = e.currentTarget;
		if (self.value == 0) {
			self.value = 1;
		}
		this.setWidth();
		this.count = this.input.value;
		this.disableBtn();
	}

	setWidth() {
		if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			this.input.style.width = `${this.input.value.length + 1}ex`;
		} else {
			this.input.style.width = `${this.input.value.length + 2}ex`;
		}
	}

	calculate(e, operation) {
		e.preventDefault();
		// if true plus else minus
		operation ? this.count++ : this.count--;
		this.disableBtn();
		this.input.value = this.count;
		this.setWidth();
	}
}