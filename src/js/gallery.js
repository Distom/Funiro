import lightGallery from "lightgallery";

let galleryElem = document.querySelector('.gallery-share');
let galleryWrapper = document.querySelector('.share__gallery-wrapper');
let galleryWidth = galleryElem.offsetWidth;
let left = 170;
let right = 390;
let resetTimeout;
let listenersAdded = false;
let galleryScrollX = 170 / 1800 * 1400;

window.addEventListener('resize', onResize);
onResize();

lightGallery(document.querySelector('.gallery-share'), {
	selector: '._bgi-wrapper',
	speed: 800,
});

function onResize() {
	if (window.innerWidth > 1000 && !listenersAdded) {
		galleryElem.addEventListener('mouseenter', onEnter);
		galleryElem.addEventListener('mouseleave', onLeave);
		galleryElem.style.marginLeft = '';
		listenersAdded = true;
	} else if (window.innerWidth <= 1000) {
		if (listenersAdded) {
			galleryElem.removeEventListener('mouseenter', onEnter);
			galleryElem.removeEventListener('mouseleave', onLeave);
			galleryElem.removeEventListener('mousemove', onMouseOver);
			resetGallery();
			listenersAdded = false;
		}
		requestAnimationFrame(centerGallery);
	}
}

function centerGallery() {
	console.log('center');
	let currentWindowWidth = window.innerWidth;
	let shift = (1000 - currentWindowWidth) / 2;
	let scrollX = galleryScrollX + shift;
	galleryWrapper.scrollTo(scrollX, 0);
}

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