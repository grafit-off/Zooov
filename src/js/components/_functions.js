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
	if (isiPad || isiPhone || isiPod) {
		let V = 0.4;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
		let w = window.pageYOffset;
		let t = document.querySelector(id).getBoundingClientRect().top; // отступ от окна браузера до id
		let start = null;
		requestAnimationFrame(step);
		function step(time) {
			if (start === null) start = time;
			let progress = time - start,
				r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
			window.scrollTo(0, r);
			if (r != w + t) {
				requestAnimationFrame(step)
			} else {
				location.hash = id;  // URL с хэшем
			}
		}
		return;
	}

	let target = document.querySelector(id);
	if (target !== null) {
		let pos = target.offsetTop + 1;
		window.scrollTo({
			top: pos,
			behavior: 'smooth'
		});
	}
}