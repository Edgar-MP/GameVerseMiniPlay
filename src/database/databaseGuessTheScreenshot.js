import { collection, query, getDocs, where, getDoc, doc, setDoc } from 'firebase/firestore/lite'
import { defineStore } from "pinia";
import { db } from '../firebaseConfig'
const coll = collection(db, "guessTheScreenshot");

// Función para obtener los ids de los juegos de la Base de Datos
export async function getIDs() {
    try {
        const q = query(coll);
        const querySnapshot = await getDocs(q);
        let ids = [];
        querySnapshot.forEach((doc) => {
            ids.push(doc.id)
        })
        return ids;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Función para obtener los titulos de los juegos de la Base de Datos
export async function getGamesTitles() {
    try {
        const q = query(coll);
        const querySnapshot = await getDocs(q);
        let gamesTitles = [];
        querySnapshot.forEach((doc) => {
            gamesTitles.push(doc.data().name)
        })
        return gamesTitles;
    } catch (error) {
        console.log(error);
        return null;
    }
}

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
        console.log(idGame);
        const docRef = doc(db, "guessTheScreenshot", idGame);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        g[0] = docSnap.data().name;
        g[1] = docSnap.data().hint4;
        console.log(g);
        return g;
    } catch (error) {
        console.log(error);
        return "No name";
    }
}

// Función que devuelve un array con las istas
export async function getHints(idGame) {
    try {
        console.log(idGame);
        const docRef = doc(db, "guessTheScreenshot", idGame);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
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

// Función que devuelve las plataformas
export async function getGamePlataforms(idGame) {
    try {
        const docRef = doc(db, "guessTheScreenshot", idGame);
        const docSnap = await getDoc(docRef);
        let gamesTitles = [];
        docSnap.data().plataforms.forEach((plat) => {
            gamesTitles.push(plat)
        })
        return gamesTitles;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Función que devuelve los generos
export async function getGameGenres(idGame) {
    try {
        const docRef = doc(db, "guessTheScreenshot", idGame);
        const docSnap = await getDoc(docRef);
        let gamesTitles = [];
        docSnap.data().plataforms.forEach((plat) => {
            gamesTitles.push(plat)
        })
        return gamesTitles;
    } catch (error) {
        console.log(error);
        return null;
    }
}