// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

// init Swiper:
const swiper = new Swiper('.slider-furniture', {
	// Optional parameters
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