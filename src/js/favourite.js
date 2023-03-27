import { closeOtherWindows } from "./utils";

export { closeFavourite };

let favouriteElem = document.querySelector('.favourite');
let favouriteCounter = document.querySelector('.favourite__counter');
let isActiveFavourite = false;

document.addEventListener('click', favouriteHandler);

function favouriteHandler(event) {
	let button = event.target.closest('.favourite__button');
	if (!button) return;

	toggleFavourite();
}

function toggleFavourite() {
	favouriteElem.classList.toggle('favourite_active');
	isActiveFavourite = !isActiveFavourite;

	if (isActiveFavourite) {
		closeOtherWindows('favourite');
	}
}

function closeFavourite() {
	if (isActiveFavourite) {
		toggleFavourite();
	}
}