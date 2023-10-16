import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDiM_SHPytbdPW7hf-EiXEqES1SmlihLMs",
    authDomain: "countriesapp-2a813.firebaseapp.com",
    projectId: "countriesapp-2a813",
    storageBucket: "countriesapp-2a813.appspot.com",
    messagingSenderId: "455481108671",
    appId: "1:455481108671:web:d18e3aa9ac20ea97ae3e0a",
    measurementId: "G-CMHK228FWD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
        console.log(err)
        alert(err.message)
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    }
    catch (err) {
        console.log(err)
        alert(err.message)
    }
}

const logout = () => {
    signOut(auth)
}

export const addFavouriteToFirebase = async (uid, name) => {
    try {
        await addDoc(collection(db, `users/${uid}/favourites`), { name });
        console.log("Favourite added to Firebase database");
    } catch (err) {
        console.error("Error adding favourite to Firebase database: ", err);
    }
};

export const removeFavouriteFromFirebase = async (uid, name) => {
    try {
        if (!name) {
            console.error("Error removing favourite from Firebase database: name parameter is undefined");
            return;
        }
        const q = query(collection(db, `users/${uid}/favourites`), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log("Favourite removed from Firebase database");
        });
    } catch (err) {
        console.error("Error removing favourite from Firebase database: ", err);
    }
};

export const clearFavouritesFromFirebase = async (uid) => {
    try {
        const q = query(collection(db, `users/${uid}/favourites`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log("Favourites removed from Firebase database");
        });
    } catch (err) {
        console.error("Error removing favourites from Firebase database: ", err);
    }
};


export { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logout };