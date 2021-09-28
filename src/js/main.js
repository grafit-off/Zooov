document.addEventListener("DOMContentLoaded", () => {
	// Includes
	//? @include('components/_debounce.js');
	//? @include('components/_burger.js');
	//? @include('components/_swiper.js');
	// @include('components/_variables.js');
	// @include('components/_functions.js');
	// @include('resources/_scrollLockIOS.js');
	// @include('resources/_animateOnScroll.js');
	// @include('resources/_modal.js');
	// -- //

	header.addEventListener('click', (e) => {
		switch (e.target) {
			case e.target.closest('.burger'):
				burger.toggle();
				break;

			case e.target.closest('.header__link'):
				e.preventDefault();
				if (media.matches) burger.close();
				setTimeout(() => {
					scrollToTarget(e.target.hash);
				}, 200);
				break;
		}
	})

	classificationSwiper.init();
	dietSwiper.init();

	window.addEventListener('resize', () => {
		resizeDebounce.init();
	});

	window.addEventListener('scroll', function () {
		scrollDebounce.init();
	});
})

