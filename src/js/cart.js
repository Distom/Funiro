import { WindowList } from "./WindowList";
import { getUserCart, loadProduct, updateProductInUserCart } from "./firebase";
import { moveProductImage } from "./products";
import { isUserSignedIn } from "./authentication";

export { addAllProductsToCartListHTML, clearCartListHTML, moveToCart };

let cartProductsList = document.querySelector('.cart__products');
let cartBtn = document.querySelector('.cart__button');
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

document.addEventListener('click', addToCart);
document.addEventListener('click', removeCartProduct);


async function addToCart(event) {
	let button = event.target.closest('.product-card__add-button');
	if (!button || productAdding) return;

	productAdding = true;
	let cardElem = button.closest('.product-card');
	let imageElem = cardElem.querySelector('.product-card__image-wrapper');
	let productId = cardElem.dataset.id;


	let isUpdated = await updateProductInUserCart(productId);
	if (!isUpdated) {
		if (!cartWindow.isActive) {
			cartWindow.toggleElem();
		}
		productAdding = false;
		return;
	}

	await moveProductImage(imageElem, cartBtn);
	await addProductToCartListHTML(productId);
	productAdding = false;
}

async function moveToCart(productId) {
	if (cartProductsListIncludes(productId)) return true;

	let isUpdated = await updateProductInUserCart(productId);
	if (!isUpdated) {
		if (!cartWindow.isActive) {
			cartWindow.toggleElem();
		}
		return;
	}

	let isAdded = await addProductToCartListHTML(productId);
	if (!isAdded) return;

	return true;
}

async function removeCartProduct(event) {
	let button = event.target.closest('.cart-product__delete-button');
	if (!button) return;

	let productElem = button.closest('.cart-product');
	let productId = productElem.dataset.id;

	await updateProductInUserCart(productId, false);
	deleteProductFromCartListHTML(productId);
}

async function addAllProductsToCartListHTML() {
	let userCartObject = await getUserCart();
	if (!userCartObject) return;

	Object.keys(userCartObject).forEach(async productId => {
		let productCount = userCartObject[productId];

		let html = await getProductHTML(productId, productCount);
		if (!html) return;

		cartProductsList.insertAdjacentHTML('beforeend', html);
	});
}

async function addProductToCartListHTML(productId) {
	if (cartProductsListIncludes(productId)) {
		increaseProductCountHTML(productId);
		return;
	}

	let html = await getProductHTML(productId, 1);
	if (!html) return;

	cartProductsList.insertAdjacentHTML('beforeend', html);
	return true;
}

function cartProductsListIncludes(productId) {
	return cartProductsList.querySelector(`[data-id="${productId}"]`);
}

async function getProductHTML(productId, productCount) {
	let productObject = await loadProduct(productId);
	if (!productObject) return;

	let html = `
	<li data-id="${productId}" class="cart__product cart-product">
		<div class="cart-product__image-wrapper _bgi-wrapper">
			<img src="${productObject.imageUrl}" alt="${productObject.description}" class="cart-product__image _bgi">
		</div>
		<div class="cart-product__body">
			<h2 class="cart-product__title">${productObject.title}</h2>
			<div class="cart-product__counter-wrapper">Quantity: <span class="cart-product__counter">${productCount}</span></div>
			<button class="cart-product__delete-button button button_white">Delete</button>
		</div>
	</li>`;

	return html
}

function increaseProductCountHTML(productId) {
	let counterElem = getProductCounter(productId);
	counterElem.textContent = +counterElem.textContent + 1;
}

function getProductCounter(productId) {
	let productElem = cartProductsListIncludes(productId);
	let counterElem = productElem.querySelector('.cart-product__counter');
	return counterElem;
}

function clearCartListHTML() {
	cartProductsList.innerHTML = '';
}

function deleteProductFromCartListHTML(productId) {
	let counterElem = getProductCounter(productId);
	let newCount = counterElem.textContent - 1;

	if (newCount <= 0) {
		let productElem = cartProductsListIncludes(productId);
		productElem.remove();
		return;
	}

	counterElem.textContent = newCount;
}
