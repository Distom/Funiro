import lightGallery from "lightgallery";

let galleryElem = document.querySelector('.gallery-share');
let galleryWidth = galleryElem.offsetWidth;
let left = 170;
let right = 390;
let resetTimeout;

galleryElem.addEventListener('mouseenter', onEnter);
galleryElem.addEventListener('mouseleave', onLeave);

lightGallery(document.querySelector('.gallery-share'), {
	selector: '._bgi-wrapper',
	speed: 800,
});

function onEnter() {
	clearInterval(resetTimeout);
	galleryElem.style.transition = '';
	galleryElem.addEventListener('mousemove', onMouseOver);
}

function onLeave() {
	galleryElem.removeEventListener('mouseenter', onMouseOver);
	resetTimeout = setTimeout(resetGallery, 1000);
}

function resetGallery() {
	galleryElem.style.transition = 'left 1s';
	setTimeout(() => {
		galleryElem.style.left = 0;
	}, 5);
}

function onMouseOver(event) {
	let halfScreenWidth = document.documentElement.clientWidth / 2;
	let diff = halfScreenWidth - event.clientX;
	let percent = Math.abs(diff) / halfScreenWidth * 100;

	requestAnimationFrame(() => {
		if (diff > 0) {
			let shiftAbs = left / 100 * percent;
			let shiftRelative = shiftAbs / galleryWidth * 100;
			galleryElem.style.left = `${shiftRelative}%`
		} else {
			let shiftAbs = right / 100 * percent;
			let shiftRelative = shiftAbs / galleryWidth * 100;
			galleryElem.style.left = `-${shiftRelative}%`
		}
	});
}