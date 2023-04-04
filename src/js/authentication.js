import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { addAllProductsToCartListHTML, clearCartListHTML } from './cart';

let accountElem = document.querySelector('.account');
let cartElem = document.querySelector('.cart');

let signInBtn = accountElem.querySelector('.profile__button_login');
let signOutBtn = accountElem.querySelector('.profile__button_logout');
let accontImageElem = accountElem.querySelector('.account__image');
let profileElem = accountElem.querySelector('.profile');
let profileNameElem = profileElem.querySelector('.profile__name');
let profileMailElem = profileElem.querySelector('.profile__mail');
let profileImageElem = profileElem.querySelector('.profile__image');


signInBtn.addEventListener('click', onSignInBtnClick);
signOutBtn.addEventListener('click', onSignOutBtnClick);

initFirebaseAuth();

async function signIn() {
	let provider = new GoogleAuthProvider();
	try {
		await signInWithPopup(getAuth(), provider);
	} catch (error) {
		console.warn('Error when login: ' + error);
		return false;
	}
	return true;
}

function signOutUser() {
	signOut(getAuth());
}

function initFirebaseAuth() {
	onAuthStateChanged(getAuth(), authStateObserver);
}

function getProfilePicUrl() {
	return getAuth().currentUser.photoURL;
}

function getUserName() {
	return getAuth().currentUser.displayName;
}

function getUserMail() {
	return getAuth().currentUser.email;
}

function authStateObserver(user) {
	if (user) {
		console.log('user');
		accontImageElem.src = getProfilePicUrl();
		updateProfileElemValues();
		cartElem.classList.remove('cart_disabled');
		addAllProductsToCartListHTML();
	} else {
		console.log('nouser');
		accontImageElem.src = 'src/img/header/avatar.png';
		resetProfileElemValues();
		cartElem.classList.add('cart_disabled');
		clearCartListHTML();
	}
}

async function onSignInBtnClick() {
	signInBtn.disabled = true;
	await signIn();
	signInBtn.disabled = false;
}

function onSignOutBtnClick() {
	signOutUser();
	signOutBtn.disabled = true;
}

function updateProfileElemValues() {
	profileElem.classList.add('profile_logined');
	profileImageElem.src = getProfilePicUrl();
	profileNameElem.textContent = getUserName();
	profileMailElem.textContent = getUserMail();
}

function resetProfileElemValues() {
	profileElem.classList.remove('profile_logined');
	profileImageElem.src = 'src/img/header/avatar.png';
	profileNameElem.textContent = '';
	profileMailElem.textContent = '';
}