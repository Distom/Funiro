// import Swiper bundle with all modules installed
//import Swiper from 'swiper/bundle';
import Swiper, { Navigation, Pagination, Parallax } from 'swiper';

// import styles bundle
//import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
const furnitureSwiper = new Swiper('.slider-furniture', {
	// Optional parameters
	modules: [Navigation, Pagination, Parallax],
	//direction: 'vertical',
	loop: true,
	parallax: true,
	spaceBetween: 32,
	speed: 800,
	slidesPerView: 1,
	watchOverflow: true,
	loopedSlides: 2,
	centeredSlides: true,
	//preloadImages: false,
	//observer: true,
	//observeParents: true,

	// If we need pagination
	pagination: {
		el: '.slider-furniture__pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.slider-furniture__button_next',
		prevEl: '.slider-furniture__button_prev',
	},
});

const roomsSwiper = new Swiper('.slider-rooms', {
	modules: [Navigation, Pagination, Parallax],
	loop: true,
	parallax: true,
	spaceBetween: 32,
	speed: 800,
	slidesPerView: 1,
	watchOverflow: true,
	loopedSlides: 2,
	centeredSlides: true,

	// If we need pagination
	pagination: {
		el: '.slider-rooms__pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.slider-rooms__button_next',
		prevEl: '.slider-rooms__button_prev',
	},
});

const tipsSwiper = new Swiper('.slider-tips', {
	modules: [Navigation, Pagination],
	loop: true,
	spaceBetween: 16,
	speed: 800,
	slidesPerView: 1,
	watchOverflow: true,
	loopedSlides: 2,

	// If we need pagination
	pagination: {
		el: '.slider-tips__pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.slider-tips__button_next',
		prevEl: '.slider-tips__button_prev',
	},
	breakpoints: {
		1: {
			slidesPerView: 1,
			spaceBetween: 16,
		},
		451: {
			slidesPerView: 1.15,
			spaceBetween: 32,
		},
		721: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		900: {
			slidesPerView: 2,
			spaceBetween: 32,
		},
		1150: {
			slidesPerView: 3,
		}
	}
});