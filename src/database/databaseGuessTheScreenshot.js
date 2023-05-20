import { collection, query, getDocs, where, getDoc, doc, setDoc } from 'firebase/firestore'
import { defineStore } from "pinia";
import { db } from '../firebaseConfig'
const coll = collection(db, "guessTheScreenshot");

// Función que comprueba si la respuesta es correcta
export async function checkResultWithCorrect(idGame, result) {
    try {
        const docRef = doc(db, "guessTheScreenshot", idGame);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name === result)
            return true
        return false
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Función que devuelve el nombre y el año del videojuego
export async function getVideoGameNameAndYear(idGame) {
    try {
        let g = [];
        const docRef = doc(db, "guessTheScreenshot", idGame);
        const docSnap = await getDoc(docRef);
        g[0] = docSnap.data().name;
        g[1] = docSnap.data().hint4;
        return g;
    } catch (error) {
        console.log(error);
        return "No name";
    }
}

// Función que devuelve un array con las istas
export async function getHints(idGame) {
    try {
        const docRef = doc(db, "guessTheScreenshot", idGame);
        const docSnap = await getDoc(docRef);
        return [
            docSnap.data().hint1,
            docSnap.data().hint2,
            docSnap.data().hint3,
            docSnap.data().hint4,
            docSnap.data().hint5
            ];
    } catch (error) {
        console.log(error);
        return "No hints";
    }
}