// Swiper
class MobileSwiper {
	constructor(selector, swiperObj, breakpoint) {
		this.selector = selector;
		this.selectorClassName = this.selector.className.trim();
		this.breakpoint = breakpoint;
		this.swiperObj = swiperObj;
		this.initSlider = null;
	}
	create() {
		if (window.innerWidth <= this.breakpoint && this.selector.dataset.mobile == 'false') {
			this.initSlider = new Swiper(this.selector, this.swiperObj);
			this.selector.dataset.mobile = 'true';
		}
	}
	destroy() {
		if (window.innerWidth > this.breakpoint) {
			this.selector.dataset.mobile = 'false';
			if (this.selector.classList.contains(`${this.selectorClassName}initialized`)) {
				this.initSlider.destroy();
			}
		}
	}
	init() {
		this.create();
		this.destroy();
	}
}
