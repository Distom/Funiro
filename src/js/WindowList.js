import { Window } from "./Window";

export { WindowList };

class WindowList extends Window {
	constructor({
		elemSelector,
		elemActiveClass,
		buttonSelector,
		windowName,
		missclickSelector,
		listSelector,
		listEmptyClass,
		listCounterSelector,
	}) {
		super({
			elemSelector: elemSelector,
			elemActiveClass: elemActiveClass,
			buttonSelector: buttonSelector,
			windowName: windowName,
			missclickSelector: missclickSelector,
		});
		this.listSelector = listSelector;
		this.listEmptyClass = listEmptyClass;
		this.listCounterSelector = listCounterSelector;
		this.listElem = document.querySelector(listSelector);
		this.listCounter = document.querySelector(listCounterSelector);
		this.listStateObserver = new MutationObserver(this.updateListState.bind(this));
		this.listStateObserver.observe(this.listElem, { childList: true });
		this.updateListState();
	}

	updateListState() {
		this.updateCounter();
		if (this.listElem.children.length == 0) {
			this.showEmpty();
		} else {
			this.hideEmpty();
		}
	}

	showEmpty() {
		if (!this.elem.classList.contains(this.listEmptyClass)) {
			this.elem.classList.add(this.listEmptyClass);
		}
	}

	hideEmpty() {
		if (this.elem.classList.contains(this.listEmptyClass)) {
			this.elem.classList.remove(this.listEmptyClass);
		}
	}

	updateCounter() {
		this.listCounter.textContent = this.listElem.children.length;
	}
}