
/* Custom Select */

/* Идея
	1. Создать разметку с двумя блоками, первый для показа выбраного 
	айтема, второй - скрытый список, для выбора option. 
	2. Блок для показа 
	3. Все option с нативного селекта перенести в кастомный в виде
	кнопок.
	4. По клику на 
*/
class Select {
	constructor(selectSelector, customSelector) {
		this.select = document.querySelector(`${selectSelector}`);
		this.options = this.select.querySelectorAll('option');
		this.customSelect = document.querySelector(`${customSelector}`);
		this.customSelectBtn = this.customSelect.querySelector('.my-custom-select__btn');
		this.customBody = this.customSelect.querySelector('.my-custom-select__body');
		this.customList = this.customSelect.querySelector('.my-custom-select__list');
		this.animated = false;
	}

	generateList() {
		this.customSelectBtn.textContent = this.select.dataset.placeholder;
		let html = ``
		this.options.forEach((el) => {
			html += `
			<li class="my-custom-select__option" id="option-${el.value}" data-value='${el.value}' role="option">${el.textContent}</li>
			`
		});
		this.customList.innerHTML = html;
	}



	show() {
		this.animated = true;
		this.customSelectBtn.classList.add('my-custom-select__btn--open');
		this.customBody.classList.add('my-custom-select__body--show');
		let height = this.customBody.clientHeight;
		this.customBody.style.height = 0;
		let anim = this.customBody.animate([
			{ height: `0px` },
			{ height: `${height}px` }
		], {
			duration: 300,
			easing: 'ease'
		});
		anim.addEventListener('finish', () => {
			this.customBody.style.height = `${height}px`
			this.animated = false;
		})
	}

	close() {
		this.animated = true;
		this.customSelectBtn.classList.remove('my-custom-select__btn--open');
		let height = this.customBody.clientHeight;
		let anim = this.customBody.animate([
			{ height: `0px` },
			{ height: `${height}px` }
		], {
			duration: 300,
			easing: 'ease',
			direction: 'reverse'
		});
		anim.addEventListener('finish', () => {
			this.customBody.classList.remove('my-custom-select__body--show');
			this.animated = false;
		})
	}

	selectOption(option) {
		this.customSelectBtn.textContent = option.textContent;
		this.customList.setAttribute('aria-activedescendant', `${option.id}`);
		console.log(this.select.querySelector(`[value=${option.dataset.value}]`));
		this.options.forEach((el) => {
			el.removeAttribute('selected');
		});
		this.select.querySelector(`[value=${option.dataset.value}]`).setAttribute('selected', true);
	}

	init() {
		this.generateList();
		this.customSelectBtn.addEventListener('click', () => {
			if (!this.animated) {
				if (this.customBody.classList.contains('my-custom-select__body--show')) {
					this.close();
				} else {
					this.show();
				}
			}
		})
		this.customList.addEventListener('click', (e) => {
			if (e.target.closest('.my-custom-select__option')) {
				this.selectOption(e.target.closest('.my-custom-select__option'));
			}
		})

	}
}

const selectCl = new Select('.my-select__item', '.my-custom-select').init();


/*
<form action="" class="form">
		<div class="my-select">
			<label class="my-select__label">
				<select name="select" class="my-select__item visually-hidden" required data-placeholder='Выберите что-то'>
					<option value="One">One</option>
					<option value="What">What</option>
					<option value="Three" selected>Three</option>
					<option value="Four">Four</option>
				</select>
				<div class="my-custom-select">
					<button class="my-custom-select__btn btn-reset" type="button" aria-haspopup="listbox" aria-labelledby="custom-select-btn" id="custom-select-btn">Hassium</button>
					<div class="my-custom-select__body">
						<ul class="my-custom-select__list list-reset" id="my-custom-select-list" tabindex="-1" role="listbox" aria-labelledby="custom-select-btn" aria-activedescendant="option-one">
							<li class="my-custom-select__option" id="option-one" data-value='one' role="option">One</li>
							<li class="my-custom-select__option" id="option-two" data-value='two' role="option">Two</li>
							<li class="my-custom-select__option" id="option-three" data-value='three' role="option">Three</li>
							<li class="my-custom-select__option" id="option-four" data-value='four' role="option">Four</li>
						</ul>
					</div>
				</div>
			</label>
		</div>
	</form>



.my-select {
	max-width: 300px;

	&__label {
	}
	&__item {
	}
}

.my-custom-select {
	position: relative;

	&__btn {
		width: 100%;
		padding: 14px 16px;

		border-radius: 8px;
		background-color: var(--color-black-haze);
		color: var(--color-black);

		text-align: left;
		&::after {
			content: "";
			position: absolute;
			right: 16px;
			top: 50%;

			width: 12px;
			height: 6px;

			background: url(../img/select-arrow.svg) center/cover no-repeat;

			transform: translateY(-50%);
			transition: transform 0.25s ease, top 0.25s ease;
		}
		&--open {
			&::after {
				top: 45%;
				transform: rotate(-180deg);
			}
		}
	}
	&__body {
		position: absolute;
		left: 0;
		z-index: 2;

		display: none;
		width: 100%;
		overflow: hidden;

		&--show {
			display: block;
		}
	}

	&__list {
		margin-top: 10px;
		padding: 8px 0;

		background-color: var(--color-black-haze);
		border-radius: 8px;

		overflow: hidden;
		overflow-y: auto;
	}

	&__option {
		display: inline-block;
		width: 100%;
		padding: 10px;

		color: var(--color-black);

		transition: background-color 0.3s ease;
		cursor: pointer;

		@media (any-hover: hover) {
			&:hover {
				background-color: var(--color-mercury);
				transition: background-color 0.3s ease;
			}
		}
	}
}




*/