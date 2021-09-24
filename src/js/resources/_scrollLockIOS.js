// scrollLockIOS

// Выключение скролла
let disableScroll = () => {
	let pagePosition = window.scrollY;
	document.querySelector('html').style.scrollBehavior = 'auto';
	document.body.classList.add('ios-lock');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

// Включение скролла
let enableScroll = () => {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = 'auto';
	document.body.classList.remove('ios-lock');
	window.scroll({ top: pagePosition, left: 0 });
	document.querySelector('html').removeAttribute('style');
	document.body.removeAttribute('data-position');
}

// Слушатель на один элемент
let scrollLock_BtnListener = (item) => {
	item.addEventListener('click', (e) => {
		item.classList.toggle('scroll')
		if (item.classList.contains('scroll')) {
			disableScroll();
		} else {
			enableScroll();
		}
	});
}