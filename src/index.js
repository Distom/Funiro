import './index.scss';
import './index.html';

import './js/firebase';
import './js/menu';
import './js/search';
import './js/swiper';
import './js/cart';
import './js/favourite';
import './js/profile';
import './js/authentication';
import './js/products';
import './js/gallery';
import './js/footer';

import { Window } from './js/Window';
import { useDynamicAdapt } from './js/dynamic-adapt';

useDynamicAdapt();
document.addEventListener('keydown', closeWindowsOnEscape);

function closeWindowsOnEscape(event) {
	if (event.code == 'Escape') {
		Window.closeOtherWindows();
	}
}