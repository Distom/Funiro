import { Window } from "./Window";

let cartWindow = new Window({
	elemSelector: '.cart',
	elemActiveClass: 'cart_active',
	buttonSelector: '.cart__button',
	windowName: 'cart'
});



/* import { closeOtherWindows } from "./utils";

export { closeCart };

let cartElem = document.querySelector('.cart');
let isActiveCart = false;

document.addEventListener('click', cartHandler);

function cartHandler(event) {
	let button = event.target.closest('.cart__button');
	if (!button) return;

	toggleCart();
}

function toggleCart() {
	cartElem.classList.toggle('cart_active');
	isActiveCart = !isActiveCart;

	if (isActiveCart) {
		closeOtherWindows('cart');
	}
}

function closeCart() {
	if (isActiveCart) {
		toggleCart();
	}
} */