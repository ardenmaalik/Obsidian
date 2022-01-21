import { initializeApp as firebase } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
	apiKey: "AIzaSyAZSURehD1_BmMp_2uOZ6fIoPIgml7Zs6E",
	authDomain: "obsidian-9d14a.firebaseapp.com",
	projectId: "obsidian-9d14a",
	storageBucket: "obsidian-9d14a.appspot.com",
	messagingSenderId: "347282622627",
	appId: "1:347282622627:web:00dfe7d6b3fbcce3d95716",
	measurementId: "G-Z3MYL67GQ4",
};

const firebaseApp = firebase(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db, firebaseApp };
