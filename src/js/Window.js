export { Window };

class Window {
	static windows = {};

	static closeOtherWindows(currentWindowName) {
		Object.keys(Window.windows).forEach(funcTitle => {
			if (funcTitle != currentWindowName) {
				Window.windows[funcTitle]();
			}
		})
	}

	isActive = false;

	constructor({
		elemSelector,
		elemActiveClass,
		buttonSelector,
		windowName,
		missclickSelector,
	}) {
		this.elemSelector = elemSelector;
		this.elemActiveClass = elemActiveClass;
		this.buttonSelector = buttonSelector;
		this.windowName = windowName;
		this.missclickSelector = missclickSelector;

		this.elem = document.querySelector(elemSelector);
		this.button = document.querySelector(buttonSelector);

		if (missclickSelector) {
			this.closeElemOnMissclick = this.closeElemOnMissclick.bind(this);
		}

		Window.windows[windowName] = this.closeElem.bind(this);
		document.addEventListener('click', this.handler.bind(this));
	}

	handler(event) {
		let button = event.target.closest(this.buttonSelector);
		if (!button) return;

		this.toggleElem();
	}

	toggleElem() {
		this.elem.classList.toggle(this.elemActiveClass);
		this.isActive = !this.isActive;

		if (this.isActive) {
			Window.closeOtherWindows(this.windowName);
			if (this.missclickSelector) {
				document.addEventListener('click', this.closeElemOnMissclick);
			}
		} else if (this.missclickSelector) {
			document.removeEventListener('click', this.closeElemOnMissclick);
		}
	}

	closeElem() {
		if (this.isActive) {
			this.toggleElem();
		}
	}

	closeElemOnMissclick(event) {
		if (event.target.closest(this.missclickSelector)) return;
		this.closeElem();
	}
}