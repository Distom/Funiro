import { loadProducts } from "./firebase";

let productsListElem = document.querySelector('.products__body');
let productsBtn = document.querySelector('.products__button');

productsBtn.addEventListener('click', onProductsBtnClick);
addProductsLine();

async function onProductsBtnClick() {
	productsBtn.disabled = true;
	let result = await addProductsLine();

	if (result === 'end') {
		productsBtn.style.opacity = 0;
		productsBtn.addEventListener('transitionend', () => {
			productsBtn.style.display = 'none';
		});
	} else {
		productsBtn.disabled = false;
	}
}

async function addProductsLine() {
	let columnsCount = 4;
	let currentProductsCount = productsListElem.children.length;
	let requiredCount = 0;

	switch (true) {
		case innerWidth < 632:
			columnsCount = 1;
			break;
		case innerWidth < 949:
			columnsCount = 2;
			break;
		case innerWidth < 1266:
			columnsCount = 3;
			break;
	}

	let roundedCount = Math.ceil(currentProductsCount / columnsCount) * columnsCount;
	requiredCount = roundedCount - currentProductsCount || columnsCount;

	let html = await getProductsHTML(requiredCount);
	if (html === '') {
		return 'end';
	} else if (html === false) {
		return;
	}

	productsListElem.insertAdjacentHTML('beforeend', html);
}

async function getProductsHTML(count) {
	let products = await loadProducts(count);
	if (!products) return false;

	let productsHTML = products.reduce((html, product) => {
		return html += getProductHTML(product);
	}, '');
	return productsHTML;
}

function getProductHTML(productObject) {
	let productHTML = `
	<li data-id="${productObject.id}" class="products__card product-card">
		<div class="product-card__image-wrapper _bgi-wrapper">
			<img src="${productObject.imageUrl}" alt="${productObject.description}" class="product-card__image _bgi">
		</div>
		<h3 class="product-card__title">${productObject.title}</h3>
		<p class="product-card__text">${productObject.description}</p>
		${getProductPricesHTML()}
		<div class="product-card__buttons">
			<button class="product-card__add-button button button_white">Add to cart</button>
			<div class="product-card__icon-buttons">
				<button class="product-card__icon-button product-icon-button product-icon-button_share">
					<i class="product-icon-button__icon _icon-share"></i>
					<span class="product-icon-button__text">Share</span>
				</button>
				<button class="product-card__icon-button product-icon-button product-icon-button_favourite">
					<i class="product-icon-button__icon _icon-favourite"></i>
					<span class="product-icon-button__text">Like</span>
				</button>
			</div>
		</div>
		${getProductMarkersHTML()}
	</li>
	`

	function getProductPricesHTML() {
		let html = `
		<ul class="product-card__prices">
			<li class="product-card__actual-price">Rp ${getFormatedPrice(productObject.actualPrice)}</li>`;

		if (productObject.oldPrice) {
			html += `
			<li class="product-card__previous-price">Rp ${getFormatedPrice(productObject.oldPrice)}</li>`;
		}

		html += `</ul>`;
		return html;

		function getFormatedPrice(price) {
			return price
				.toLocaleString('en-US', { maximumFractionDigits: 4 })
				.replace(/,/g, '.');
		}
	}

	function getProductMarkersHTML() {
		if (!productObject.isNew && !productObject.discount) return '';

		let html = `
		<ul class="product-card__markers">`

		if (productObject.discount) {
			html += `
			<li class="product-card__marker product-marker product-marker_discount">-${productObject.discount}%</li>`
		}

		if (productObject.isNew) {
			html += `
			<li class="product-card__marker product-marker product-marker_new">New</li>`
		}

		html += `</ul>`;
		return html;
	}

	return productHTML;
}