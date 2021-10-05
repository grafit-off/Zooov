// Accordion
class Accordion {
	constructor(params) {
		this.accordion = params.selector;
		this.trigger = this.accordion.querySelector('.accordion__trigger');
		this.body = this.accordion.querySelector('.accordion__body');
		this.animated = false;

		if (params.animSettings) {
			this.animSettings = params.animSettings;
		} else {
			this.animSettings = { duration: 500, easing: 'ease' };
		}

		this.trigger.addEventListener('click', () => this.toggle());
	}

	open() {
		this.trigger.classList.add('accordion__trigger--active');
		this.body.classList.add('accordion__body--show');
		this.trigger.setAttribute('aria-expanded', true);
		this.body.setAttribute('aria-hidden', false);

		let bodyHeight = this.body.clientHeight;
		this.body.style.height = 0;
		this.animated = true;

		let anim = this.body.animate([
			{ opacity: '1', height: bodyHeight + 'px' }
		],
			this.animSettings);

		anim.addEventListener('finish', () => {
			this.body.style = null;
			this.animated = false;
		});
	}

	close() {
		this.trigger.classList.remove('accordion__trigger--active');
		this.trigger.setAttribute('aria-expanded', false);
		this.body.setAttribute('aria-hidden', true);

		this.body.style.height = this.body.clientHeight + 'px';
		this.animated = true;

		let anim = this.body.animate([
			{ opacity: '0', height: 0 }
		],
			this.animSettings);

		anim.addEventListener('finish', () => {
			this.body.style = null;
			this.body.classList.remove('accordion__body--show');
			this.animated = false;
		});
	}

	toggle() {
		if (!this.animated) {
			this.body.classList.contains('accordion__body--show') ? this.close() : this.open();
		}
	}
}