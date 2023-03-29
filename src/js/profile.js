import { Window } from "./Window";

let profileWindow = new Window({
	elemSelector: '.account',
	elemActiveClass: 'account_active',
	buttonSelector: '.account__image-wrapper',
	windowName: 'profile',
	missclickSelector: '.profile'
});
