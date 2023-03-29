import { initializeApp } from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
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
	onSnapshot,
	setDoc,
	updateDoc,
	serverTimestamp,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';

export { loadProducts, loadProduct };

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
	/* const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));

	// Start listening to the query.
	onSnapshot(recentMessagesQuery, function (snapshot) {
		snapshot.docChanges().forEach(function (change) {
			if (change.type === 'removed') {
				deleteMessage(change.doc.id);
			} else {
				var message = change.doc.data();
				displayMessage(change.doc.id, message.timestamp, message.name,
					message.text, message.profilePicUrl, message.imageUrl);
			}
		});
	}); */
	let q = query(collection(getFirestore(), 'products'), where('id', '>', lastProductId), orderBy('id'), limit(count));

	let querySnapshot = await getDocs(q);
	lastProductId += count;

	let products = querySnapshot.docs.map(doc => doc.data());
	return products;
	//console.log(products);
	/* querySnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data());
	}); */
}

/* let query = query(collection(getFirestore(), 'products'), orderBy('timestamp', 'desc'));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	console.log(doc.id, " => ", doc.data());
});
 */

async function loadProduct(id) {
	let docRef = doc(getFirestore(), 'products', id.toString())
	let docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('Product not found');
	}
}


/* const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
	console.log("Document data:", docSnap.data());
} else {
	// doc.data() will be undefined in this case
	console.log("No such document!");
} */