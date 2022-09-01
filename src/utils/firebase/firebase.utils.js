import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjThMbGFzJMsMjJYfoJdqBDuaHLqJ4nrI",
    authDomain: "crwn-clothing-db-107ce.firebaseapp.com",
    projectId: "crwn-clothing-db-107ce",
    storageBucket: "crwn-clothing-db-107ce.appspot.com",
    messagingSenderId: "1031079181872",
    appId: "1:1031079181872:web:9fbe00f0f3fa783be1b7f5"
};  
    
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    //if user data does not exist
    //create / set the document with the data from userAuth in my collection

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    //if user data exists
    //return userDocRef

    return userDocRef
}