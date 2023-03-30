import { WindowList } from "./WindowList";
import { loadProduct } from "./firebase";
import { moveProductImage } from "./products";
import { moveToCart } from "./cart";


let favouriteProductsList = document.querySelector('.favourite__products');
let favouriteBtn = document.querySelector('.favourite__button');
let productAdding = false;

let favouriteWindow = new WindowList({
	elemSelector: '.favourite',
	elemActiveClass: 'favourite_active',
	buttonSelector: '.favourite__button',
	windowName: 'favourite',
	listSelector: '.favourite__products',
	listEmptyClass: 'favourite_empty',
	listCounterSelector: '.favourite__counter',
});

document.addEventListener('click', addToFavourite);
document.addEventListener('click', removeFromFavourite);
document.addEventListener('click', onMoveToCartClick);
addProductsToFavouriteListHTML();


async function addToFavourite(event) {
	let button = event.target.closest('.product-icon-button_favourite');
	if (!button || productAdding) return;

	let cardElem = button.closest('.product-card');
	let imageElem = cardElem.querySelector('.product-card__image-wrapper');
	let productId = cardElem.dataset.id;

	if (favouriteProductsListIncudes(productId)) return;

	productAdding = true;
	addToLocaleStorage(productId);
	await moveProductImage(imageElem, favouriteBtn);
	await addProductsToFavouriteListHTML();
	productAdding = false;
}

function removeFromFavourite(event) {
	let button = event.target.closest('.favourite-product__delete-button');
	if (!button) return;

	let cardElem = button.closest('.favourite-product');
	let productId = cardElem.dataset.id;

	removeFromLocaleStorage(productId);
	let productElem = favouriteProductsList.querySelector(`[data-id="${productId}"]`);
	productElem.remove();
}

function addToLocaleStorage(productId) {
	let userFavouriteProducts = getUserFavouriteProductsSet();
	userFavouriteProducts.add(productId);
	setUserFavouriteProducts(userFavouriteProducts);
}

function removeFromLocaleStorage(productId) {
	let userFavouriteProducts = getUserFavouriteProductsSet();
	userFavouriteProducts.delete(productId);
	setUserFavouriteProducts(userFavouriteProducts);
}

function getUserFavouriteProductsSet() {
	return new Set(JSON.parse(localStorage.getItem('favouriteProducts')) || []);
}

function setUserFavouriteProducts(productsSet) {
	localStorage.setItem('favouriteProducts', JSON.stringify(Array.from(productsSet)));
}

async function getProductHTML(productId) {
	let productObject = await loadProduct(productId);
	if (!productObject) return;

	let html = `
	<li data-id="${productId}" class="favourite__product favourite-product">
		<div class="favourite-product__image-wrapper _bgi-wrapper">
			<img src="${productObject.imageUrl}" alt="${productObject.description}" class="favourite-product__image _bgi">
		</div>
		<div class="favourite-product__body">
			<h2 class="favourite-product__title">${productObject.title}</h2>
			<div class="favourite-product__buttons">
				<button class="favourite-product__move-button button button_white">Move to cart</button>
				<button class="favourite-product__delete-button button">Delete</button>
			</div>
		</div>
	</li>`;

	return html;
}

async function addProductsToFavouriteListHTML() {
	let userFavouriteProducts = Array.from(getUserFavouriteProductsSet());
	userFavouriteProducts.forEach(async productId => {
		if (favouriteProductsListIncudes(productId)) return;

		let html = await getProductHTML(productId);
		if (!html) return;
		favouriteProductsList.insertAdjacentHTML('beforeend', html);
	});
}

function favouriteProductsListIncudes(productId) {
	return favouriteProductsList.querySelector(`[data-id="${productId}"]`);
}

async function onMoveToCartClick(event) {
	let button = event.target.closest('.favourite-product__move-button');
	if (!button) return;

	let productElem = button.closest('.favourite-product');
	let productId = productElem.dataset.id;

	let isMoved = await moveToCart(productId);
	if (!isMoved) return;
	console.log(isMoved);

	removeFromLocaleStorage(productId);
	productElem.remove();
}