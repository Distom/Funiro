import { Window } from "./Window";

let searchWindow = new Window({
	elemSelector: '.search',
	elemActiveClass: 'search_active',
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