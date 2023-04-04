import { Window } from "./Window";

export { closeMenu };

let menuBtn = document.querySelector('.header__menu-button');
let menu = document.querySelector('.menu-header');
let header = document.querySelector('.header');
let headerScrollClassAdded = false;
let isBurgerMenuActive = false;
let menuMediaWidth = 600;

Window.windows['menu'] = closeMenu;
document.addEventListener('click', submenu);
document.addEventListener('click', menuBurger);
window.addEventListener('resize', updateMenuVisibility);
document.addEventListener('scroll', updateMenuScrollClass);
document.addEventListener('click', scrollToSection);

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
	header.classList.toggle('header_burger-menu');
	document.body.classList.toggle('lock');
	isBurgerMenuActive = !isBurgerMenuActive;

	if (isBurgerMenuActive) {
		Window.closeOtherWindows('menu');
	}
}

function closeMenu() {
	if (!isBurgerMenuActive) return;
	toggleMenu();
}

function updateMenuVisibility() {
	if (window.innerWidth > menuMediaWidth) {
		closeMenu();
	}
}

function updateMenuScrollClass() {
	if (scrollY > 10 && !headerScrollClassAdded) {
		header.classList.add('header_scroll');
		headerScrollClassAdded = true;
	} else if (scrollY < 10 && headerScrollClassAdded) {
		header.classList.remove('header_scroll');
		headerScrollClassAdded = false;
	}
}

function scrollToSection(event) {
	let link = event.target.closest('.menu-header__link');
	if (!link) return;

	let sectionId = link.getAttribute('href')?.slice(1);
	if (!sectionId) return;

	let section = document.getElementById(sectionId);
	if (!section) return;

	event.preventDefault();
	let x = section.getBoundingClientRect().top + scrollY - header.offsetHeight;
	scrollTo({ behavior: 'smooth', top: x });
	closeMenu();
}