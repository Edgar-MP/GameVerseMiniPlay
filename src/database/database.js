import { collection, query, getDocs, where, getDoc, doc, setDoc } from 'firebase/firestore/lite'
import { defineStore } from "pinia";
import { db } from '../firebaseConfig'
const coll = collection(db, "guessTheCover");

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        genres: []
    }),
    actions: {
        async getUrls() {
            try {
                const q = query(collection(db, "guessTheCover"));
                const querySnapshot = await getDocs(q);
                let ids = [];
                querySnapshot.forEach((doc) => {
                    ids.push(doc.id)
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            } catch (error) {
                console.log(error);
            }
        }
        
    }
})
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

export async function getGame() {
    try {
        const docRef = doc(db, "guessTheCover", "co55md");
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {
        console.log(error);
        return null;
    }
}

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