import { closeSearch } from "./search";

export { closeMenu };

let menuBtn = document.querySelector('.header__menu-button');
let menu = document.querySelector('.menu-header');
let isBurgerMenuActive = false;

document.addEventListener('click', submenu);
document.addEventListener('click', menuBurger);
window.addEventListener('resize', updateMenuVisibility);

function submenu(event) {
	let button = event.target.closest('.menu-header__submenu-button');
	if (!button) return;

	let menuItemElem = button.closest('.menu-header__list-item');
	toggleSubmenu();

	document.addEventListener('click', function removeSubmenu(event) {
		if (event.target.closest('.menu-header__list-item')) return;
		toggleSubmenu();
		document.removeEventListener('click', removeSubmenu);
	});

	function toggleSubmenu() {
		menuItemElem.classList.toggle('menu-header__list-item_active');
	}
}

function menuBurger(event) {
	let button = event.target.closest('.header__menu-button');
	if (!button) return;
	toggleMenu();
}

function toggleMenu() {
	menu.classList.toggle('menu-header_active');
	menuBtn.classList.toggle('header__menu-button_active');
	isBurgerMenuActive = !isBurgerMenuActive;

	if (isBurgerMenuActive) {
		closeSearch();
	}
}

function closeMenu() {
	if (!isBurgerMenuActive) return;
	toggleMenu();
}

function updateMenuVisibility() {
	if (window.innerWidth > 600) {
		closeMenu();
	}
}