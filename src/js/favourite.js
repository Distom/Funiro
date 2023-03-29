import { WindowList } from "./WindowList";
import { loadProduct } from "./firebase";


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
addProductsToListHTML();


async function addToFavourite(event) {
	let button = event.target.closest('.product-icon-button_favourite');
	if (!button || productAdding) return;

	let cardElem = button.closest('.product-card');
	let imageElem = cardElem.querySelector('.product-card__image-wrapper');
	let productId = cardElem.dataset.id;

	if (favouriteProductsListIncudes(productId)) return;

	productAdding = true;
	addToLocaleStorage(productId);
	await moveImage(imageElem, favouriteBtn);
	await addProductsToListHTML();
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

async function addProductsToListHTML() {
	let userFavouriteProducts = Array.from(getUserFavouriteProductsSet());
	userFavouriteProducts.forEach(async productId => {
		if (favouriteProductsListIncudes(productId)) return;

		let html = await getProductHTML(productId);
		favouriteProductsList.insertAdjacentHTML('beforeend', html);
	});
}

function moveImage(imageElem, targetElem) {
	let imageRect = imageElem.getBoundingClientRect();
	let targetRect = targetElem.getBoundingClientRect();

	let imageCloneElem = imageElem.cloneNode(true);

	imageCloneElem.style.cssText = `
		position: fixed;
		width: ${imageElem.offsetWidth}px;
		height: ${imageElem.offsetHeight}px;
		top: ${imageRect.top}px;
		left: ${imageRect.left}px;
		transition: top 0.7s ease-out, left 0.7s ease-out, transform 0.7s ease-out, opacity 0.4s 0.2s ease-out;
		transform: scale(1);
		padding: 0;
		margin: 0;
	`;
	document.body.append(imageCloneElem);

	setTimeout(() => {
		imageCloneElem.style.transform = 'scale(0)';
		imageCloneElem.style.top = targetRect.top - imageElem.offsetHeight / 2 + 'px';
		imageCloneElem.style.left = targetRect.right - imageElem.offsetWidth / 2 + 'px';
		imageCloneElem.style.zIndex = 9999;
		imageCloneElem.style.opacity = 0;
	});

	return new Promise(resolve => {
		imageCloneElem.addEventListener('transitionend', () => {
			resolve();
			imageCloneElem.remove();
		}, { once: true });
		resolve();
	});
}

function favouriteProductsListIncudes(productId) {
	return favouriteProductsList.querySelector(`[data-id="${productId}"]`);
}