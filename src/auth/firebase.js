// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDiM_SHPytbdPW7hf-EiXEqES1SmlihLMs",
    authDomain: "countriesapp-2a813.firebaseapp.com",
    projectId: "countriesapp-2a813",
    storageBucket: "countriesapp-2a813.appspot.com",
    messagingSenderId: "455481108671",
    appId: "1:455481108671:web:d18e3aa9ac20ea97ae3e0a",
    measurementId: "G-CMHK228FWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)

//login in
const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
        console.log(err)
        alert(err.message)
    }
}

//create user
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

//logout
const logout = () => {
    signOut(auth)
}


export { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logout };