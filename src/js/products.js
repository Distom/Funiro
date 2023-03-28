import {
	getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';


let product = {
	title,
	imageUrl,
	description,
	actualPrice,
	oldPrice,
	discount,
	isNew,
}

function getProducts(count) {

}