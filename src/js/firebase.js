import { initializeApp } from "firebase/app";
import {
	getAuth,
} from 'firebase/auth';
import {
	getFirestore,
	collection,
	query,
	orderBy,
	limit,
	getDocs,
	where,
	getDoc,
	doc,
	deleteField,
	setDoc,
} from 'firebase/firestore';

export {
	loadProducts,
	loadProduct,
	updateProductInUserCart,
	getUserCart
};

const firebaseConfig = {
	apiKey: "AIzaSyDxRs5bfxod4r3VNena7w24o_2M2J4KNp0",
	authDomain: "funiro-b8eaa.firebaseapp.com",
	projectId: "funiro-b8eaa",
	storageBucket: "funiro-b8eaa.appspot.com",
	messagingSenderId: "410910209464",
	appId: "1:410910209464:web:6353d0cc87ceecd80c0b4d"
};

const app = initializeApp(firebaseConfig);
let lastProductId = 0;

async function loadProducts(count) {
	let q = query(collection(getFirestore(), 'products'), where('id', '>', lastProductId), orderBy('id'), limit(count));
	let querySnapshot;

	try {
		querySnapshot = await getDocs(q);
	} catch (error) {
		console.warn('Error getting products Firebase ' + error);
		return;
	}

	lastProductId += count;
	let products = querySnapshot.docs.map(doc => doc.data());
	return products;
}

async function loadProduct(productId) {
	let docRef = doc(getFirestore(), 'products', productId)
	let docSnap;

	try {
		docSnap = await getDoc(docRef);
	} catch (error) {
		console.warn('Error getting product Firebase ' + error);
		return;
	}


	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('Product not found');
	}
}

async function updateProductInUserCart(productId, addProduct = true) {
	if (!getAuth().currentUser) return;
	let userId = getAuth().currentUser.uid;
	let cartDocRef = doc(getFirestore(), 'userCarts', userId);
	let productCount = 0;
	let cartDocSnap = await getCartDocSnap(cartDocRef);
	if (!cartDocSnap) return;

	if (cartDocSnap.exists()) {
		productCount = cartDocSnap.data()[productId] || 0;
	}

	productCount = addProduct ? productCount + 1 : productCount - 1;
	if (productCount <= 0) {
		productCount = deleteField();
	}

	try {
		setDoc(cartDocRef, { [productId]: productCount }, { merge: true });
	} catch (error) {
		console.warn('Error updating product in cart Firebase ' + error);
		return;
	}
	return true;
}

async function getCartDocSnap(cartDocRef) {
	let cartDocSnap;

	try {
		cartDocSnap = await getDoc(cartDocRef);
	} catch (error) {
		console.warn('Error reading cart Firebase ' + error);
		return;
	}

	return cartDocSnap;
}

async function getUserCart() {
	let userId = getAuth().currentUser.uid;
	let cartDocRef = doc(getFirestore(), 'userCarts', userId);
	let cartDocSnap = await getCartDocSnap(cartDocRef);
	if (!cartDocSnap) return;

	if (cartDocSnap.exists()) {
		return cartDocSnap.data();
	} else {
		return {};
	}
}