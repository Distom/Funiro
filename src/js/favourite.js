import { Window } from "./Window";

let favouriteWindow = new Window({
	elemSelector: '.favourite',
	elemActiveClass: 'favourite_active',
	buttonSelector: '.favourite__button',
	windowName: 'favourite'
});





/* import { closeOtherWindows } from "./utils";

export { closeFavourite };

let favouriteElem = document.querySelector('.favourite');
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
} */