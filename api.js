// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where 
} from "firebase/firestore/lite"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNjdOc7gZnGMAT6LQonaE9tcfNCn6eyDg",
  authDomain: "vanlife-d7e39.firebaseapp.com",
  projectId: "vanlife-d7e39",
  storageBucket: "vanlife-d7e39.appspot.com",
  messagingSenderId: "89604337340",
  appId: "1:89604337340:web:404b143ec365559b396ab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")



export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    
    return vans
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}