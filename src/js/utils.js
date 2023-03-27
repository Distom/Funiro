import { useDynamicAdapt } from './dynamicAdapt';

import { closeCart } from './cart';
import { closeFavourite } from './favourite';
import { closeMenu } from './menu';
import { closeSearch } from './search';
import { closeProfile } from './profile';

export { isMobile, closeOtherWindows };

function closeOtherWindows(currentWindow) {
	let windows = {
		cart: closeCart,
		favourite: closeFavourite,
		menu: closeMenu,
		search: closeSearch,
		profile: closeProfile,
	}

	Object.keys(windows).forEach(funcTitle => {
		if (funcTitle != currentWindow) {
			windows[funcTitle]();
		}
	})
}

useDynamicAdapt()

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

