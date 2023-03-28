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

