import { Window } from "./Window";

let searchWindow = new Window({
	elemSelector: '.search__form',
	elemActiveClass: 'search__form_active',
	buttonSelector: '.search__button',
	windowName: 'search'
});

let form = document.querySelector('.search__form');

form.addEventListener('submit', event => event.preventDefault());
window.addEventListener('resize', updateSearchVisibility);

function updateSearchVisibility() {
	if (innerWidth > 770) {
		searchWindow.closeElem();
	}
}


/* import { closeOtherWindows } from "./utils";

export { closeSearch };

let form = document.querySelector('.search__form');
let isSearchActive = false;

document.addEventListener('click', searchForm);
form.addEventListener('submit', prevent);
window.addEventListener('resize', updateSearchVisibility);

function searchForm(event) {
	let button = event.target.closest('.search__button');
	if (!button) return;

	toggleSearchForm();
}

function toggleSearchForm() {
	form.classList.toggle('search__form_active');
	isSearchActive = !isSearchActive;

	if (isSearchActive) {
		closeOtherWindows('search');
	}
}

function updateSearchVisibility() {
	if (innerWidth > 770) {
		closeSearch();
	}
}

function closeSearch() {
	if (isSearchActive) {
		toggleSearchForm();
	}
}

function prevent(event) {
	event.preventDefault();
} */