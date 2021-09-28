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
		scrollToIos(offset - 15, null, 200);
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

