let footerLinksLists = Array.from(document.querySelectorAll('.footer__links'));
let footerSubblocks = Array.from(document.querySelectorAll('.footer__subblock'));
let submenuAdded = false;
let submenuMediaWidth = 600;

document.addEventListener('click', submenu);
window.addEventListener('resize', toggleSubmenu);
window.addEventListener('resize', closeSubmenu);
toggleSubmenu();

function toggleSubmenu() {
	if (window.innerWidth > submenuMediaWidth && submenuAdded) {
		footerLinksLists.forEach(elem => elem.classList.remove('submenu'));
		submenuAdded = false;
	} else if (window.innerWidth <= submenuMediaWidth && !submenuAdded) {
		footerLinksLists.forEach(elem => elem.classList.add('submenu'));
		submenuAdded = true;
	}
}

function closeSubmenu() {
	if (window.innerWidth <= submenuMediaWidth) return;
	footerSubblocks.forEach(elem => elem.classList.remove('footer__subblock_active'));
}

function submenu(event) {
	let button = event.target.closest('.footer__submenu-button');
	if (!button) return;

	let menuItemElem = button.closest('.footer__subblock');
	toggleSubmenu();

	function toggleSubmenu() {
		menuItemElem.classList.toggle('footer__subblock_active');
	}
}