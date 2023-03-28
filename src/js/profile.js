import { Window } from "./Window";

let profileWindow = new Window({
	elemSelector: '.account',
	elemActiveClass: 'account_active',
	buttonSelector: '.account__image-wrapper',
	windowName: 'profile',
	missclickSelector: '.profile'
});



/* import { closeOtherWindows } from "./utils";

export { closeProfile };

let accountElem = document.querySelector('.account');
let isActiveProfile = false;

document.addEventListener('click', profileHandler);

function profileHandler(event) {
	let button = event.target.closest('.account__image-wrapper');
	if (!button) return;

	toggleProfile();
}

function toggleProfile() {
	accountElem.classList.toggle('account_active');
	isActiveProfile = !isActiveProfile;

	if (isActiveProfile) {
		closeOtherWindows('profile');
		document.addEventListener('click', closeProfileOnClick);
	} else {
		document.removeEventListener('click', closeProfileOnClick);
	}
}

function closeProfile() {
	if (isActiveProfile) {
		toggleProfile();
	}
}

function closeProfileOnClick(event) {
	if (event.target.closest('.profile')) return;
	closeProfile();
}
 */