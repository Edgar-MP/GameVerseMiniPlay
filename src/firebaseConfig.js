import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

// Configuración de firebase
const firebaseConfig = {
    apiKey: "AIzaSyB1WAoED3Mcy3Po0vZGex8HWR6XZm2JNzA",
    authDomain: "game-verse-mini-play.firebaseapp.com",
    projectId: "game-verse-mini-play",
    storageBucket: "game-verse-mini-play.appspot.com",
    messagingSenderId: "148737346787",
    appId: "1:148737346787:web:9611827d3ba82467aa09d6"
  };

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };