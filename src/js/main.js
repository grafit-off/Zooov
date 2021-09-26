document.addEventListener("DOMContentLoaded", () => {
	// Includes
	// @include('components/_variables.js');
	// @include('resources/_scrollLockIOS.js');
	// @include('components/_burger.js');
	// @include('resources/_animateOnScroll.js');
	// @include('resources/_modal.js');
	// -- //

	header.addEventListener('click', (e) => {
		switch (e.target) {
			case e.target.closest('.burger'):
				burger.toggle();
				break;

			case e.target.closest('.header__link'):
				if (media.matches) setTimeout(() => { burger.close() }, 200);
				break;
		}
	})
})

