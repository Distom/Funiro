import { WindowList } from "./WindowList";

let cartProductsList = document.querySelector('.cart__products');
let cartBtn = document.querySelector('.cart__button')
let productAdding = false;

let cartWindow = new WindowList({
	elemSelector: '.cart',
	elemActiveClass: 'cart_active',
	buttonSelector: '.cart__button',
	windowName: 'cart',
	listSelector: '.cart__products',
	listEmptyClass: 'cart_empty',
	listCounterSelector: '.cart__counter',
});

async function addToCart(event) {
	let button = event.target.closest('.product-card__add-button');
	if (!button) return;

	
}