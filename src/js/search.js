import { closeMenu } from "./menu";

export { closeSearch };

let searchBtn = document.querySelector('.search__button');
let form = document.querySelector('.search__form');
let isSearchActive = false;

document.addEventListener('click', searchForm);
form.addEventListener('submit', prevent);
window.addEventListener('resize', updateSearchVisibility);

function searchForm(event) {
	let button = event.target.closest('.search__button');
	if (searchBtn != button) return;

	toggleSearchForm();
}

function toggleSearchForm() {
	form.classList.toggle('search__form_active');
	isSearchActive = !isSearchActive;

	if (isSearchActive) {
		closeMenu();
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
}