import { collection, query, getDocs, where, getDoc, doc, setDoc } from 'firebase/firestore'
import { defineStore } from "pinia";
import { db } from '../firebaseConfig'
const coll = collection(db, "guessTheCover");

// Función para obtener los ids de los juegos de la Base de Datos
export async function getIDs() {
    try {
        const q = query(collection(db, "guessTheCover"));
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
        const q = query(collection(db, "guessTheCover"));
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
        const docRef = doc(db, "guessTheCover", idGame);
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
        const docRef = doc(db, "guessTheCover", idGame);
        const docSnap = await getDoc(docRef);
        g[0] = docSnap.data().name;
        g[1] = docSnap.data().year;
        return g;
    } catch (error) {
        console.log(error);
        return "No name";
    }
}

// Función que devuelve las plataformas
export async function getGamePlataforms(idGame) {
    try {
        const docRef = doc(db, "guessTheCover", idGame);
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
        const docRef = doc(db, "guessTheCover", idGame);
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