import { loadProducts } from "./firebase";


async function addProductsOnPage(count) {
	let productsListElem = document.querySelector('.products__body');
	let html = await getProductsHTML(count);
	productsListElem.innerHTML = html;
}

async function getProductsHTML(count) {
	let products = await loadProducts(count);
	let productsHTML = products.reduce((html, product) => {
		return html += getProductHTML(product);
	}, '');
	return productsHTML;
}

function getProductHTML(productObject) {
	let productHTML = `
	<li class="products__card product-card">
		<div class="product-card__image-wrapper _bgi-wrapper">
			<img src="${productObject.imageUrl}" alt="" class="product-card__image _bgi">
		</div>
		<h3 class="product-card__title">${productObject.title}</h3>
		<p class="product-card__text">${productObject.description}</p>
		${getProductPricesHTML()}
		<div class="product-card__buttons">
			<button class="product-card__add-button button button_white">Add to cart</button>
			<div class="product-card__icon-buttons">
				<button class="product-card__icon-button product-icon-button">
					<i class="product-icon-button__icon _icon-share"></i>
					<span class="product-icon-button__text">Share</span>
				</button>
				<button class="product-card__icon-button product-icon-button">
					<i class="product-icon-button__icon _icon-favourite"></i>
					<span class="product-icon-button__text">Like</span>
				</button>
			</div>
		</div>
		${getProductMarkersHTML()}
	</li>
	`

	function getProductPricesHTML() {
		/* let num = 1234567890.1234;
		let formattedNum = num.toLocaleString('en-US', { maximumFractionDigits: 4 });
		formattedNum = formattedNum.replace(',', '.');
		console.log(formattedNum); // "1.234.567.890,1234" */

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
				.replace(',', '.');
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