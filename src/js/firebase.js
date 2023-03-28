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
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore';

import { where, getDocs } from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
	apiKey: "AIzaSyDxRs5bfxod4r3VNena7w24o_2M2J4KNp0",
	authDomain: "funiro-b8eaa.firebaseapp.com",
	projectId: "funiro-b8eaa",
	storageBucket: "funiro-b8eaa.appspot.com",
	messagingSenderId: "410910209464",
	appId: "1:410910209464:web:6353d0cc87ceecd80c0b4d"
};

const app = initializeApp(firebaseConfig);

async function loadProducts(count) {
	// Create the query to load the last 12 messages and listen for new ones.
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

	let q = query(collection(getFirestore(), 'products'), orderBy('id'), limit(count));

	let querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data());
	});
}

loadProducts(4);



/* let query = query(collection(getFirestore(), 'products'), orderBy('timestamp', 'desc'));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	console.log(doc.id, " => ", doc.data());
});
 */
