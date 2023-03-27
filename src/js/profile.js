import { closeOtherWindows } from "./utils";

export { closeProfile };

let profileElem = document.querySelector('.account');
let isActiveProfile = false;

document.addEventListener('click', profileHandler);

function profileHandler(event) {
	let button = event.target.closest('.account__image-wrapper');
	if (!button) return;

	toggleProfile();
}

function toggleProfile() {
	profileElem.classList.toggle('account_active');
	isActiveProfile = !isActiveProfile;

	if (isActiveProfile) {
		closeOtherWindows('profile');
	}
}

function closeProfile() {
	if (isActiveProfile) {
		toggleProfile();
	}
}