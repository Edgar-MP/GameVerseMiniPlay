<template>
    <div id="guessTheCover" class="m-auto justify-center justify-items-center mt-14 grid">
        <img id="imgGuessTheCover" :src="url" alt="" class="border-2 border-white">
        <div id="playableBtns" class="mt-5 flex gap-2">
            <input v-model="search" @input="onChange" type="text" class="text-black px-3" />
            <button
                class="bg-green-700 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-all">Adivinar!</button>
            <button :onClick="omitir"
                class="bg-amber-400 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-amber-900 transition-all">Omitir</button>
        </div>
        <div id="results" style="display:none" class="text-center">
            <p>El juego era:</p>
            <h2 id="name"></h2>
            <h3 id="year">2022</h3>
        </div>
        <div id="clues" style="display:none">
            <p>Plataformas</p>
            <div id="plataforms" class="flex"></div>
            <p>Generos</p>
            <div id="genres" class="flex"></div>
        </div>
        <div id="hearts" class="flex bg-white mt-5 rounded-sm">
            <div id="heart0">
                <img id="heart0Good" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2Ffcd0300deb4fd92735c20a6ea91ec1ca.png?alt=media">
                <img id="heart0Bad" style="display: none;" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2FWither_29_JE2_BE2.webp?alt=media">
            </div>
            <div id="heart1">
                <img id="heart1Good" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2Ffcd0300deb4fd92735c20a6ea91ec1ca.png?alt=media">
                <img id="heart1Bad" style="display: none;" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2FWither_29_JE2_BE2.webp?alt=media">
            </div>
            <div id="heart2">
                <img id="heart2Good" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2Ffcd0300deb4fd92735c20a6ea91ec1ca.png?alt=media">
                <img id="heart2Bad" style="display: none;" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2FWither_29_JE2_BE2.webp?alt=media">
            </div>
            <div id="heart3">
                <img id="heart3Good" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2Ffcd0300deb4fd92735c20a6ea91ec1ca.png?alt=media">
                <img id="heart3Bad" style="display: none;" width="50"
                    src="https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/icons%2FWither_29_JE2_BE2.webp?alt=media">
            </div>
        </div>
    </div>
</template>

<script setup>

import VueMagnifier from '@websitebeaver/vue-magnifier';
import '@websitebeaver/vue-magnifier/styles.css';
import { getGame, getIDs } from '../database/database';
import { PLATAFORMS } from '../icons/plataforms'
import { GENRES } from '../icons/genres'
import { onMounted } from 'vue';

let imgSrc = "https://placehold.co/300x400"
let imgID = localStorage.getItem("guessTheCoverActualGameID");
let game = undefined;

// Método para obtener la fase en la que se encuentra el jugador
const getPhase = () => {
    let phase = localStorage.getItem("guessTheCoverPhase");
    console.log("Phase: "+phase);
    switch (phase) {
        case "0":
            console.log("p0");
            return "_p0";
            break;
        case "1":
            console.log("p1");
            return "_p1";
            break;
        case "2":
            console.log("p2");
            return "_p2";
            break;
        case "3":
            console.log("p3");
            return "_p3";
            break;
        default:
            console.log("default");
            return ""
            break;
    }
}

// Método para obtener una imagen
const getImg = () => {
    console.log("object");
    let idGame = localStorage.getItem("guessTheCoverActualGameID");
    console.log("idGame: " + idGame);
    console.log("phase: " + getPhase());
    return "https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheCover%2F" + idGame + getPhase() + ".jpg?alt=media"
}


let url = getImg();


// Método para cargar una imagen 
const loadImg = (url) => {
    console.log("url: " + url);
    document.getElementById("imgGuessTheCover").src = url;
}

// Método para pasar de fase
const nextPhase = () => {
    let actualPhase = Number(localStorage.getItem("guessTheCoverPhase"))
    actualPhase++;
    localStorage.setItem("guessTheCoverPhase", actualPhase);
}


// Método para omitir un intento
const omitir = () => {
    if (localStorage.getItem("guessTheCoverHearts") === "0") {
        document.getElementById("clues").style.display = "block";
        document.getElementById("playableBtns").style.display = "none";
        document.getElementById("results").style.display = "block";
        document.getElementById("hearts").style.display = "none";
    } 
    nextPhase()
    loadImg(getImg());
    removeHeart();
}



function resetContent() {
    document.getElementById("name").innerHTML = '';
    document.getElementById("genres").innerHTML = '<p>A</p>';
    document.getElementById("plataforms").innerHTML = '';
    document.getElementById("year").innerHTML = '';
}

const loadGenres = (genres) => {
    // Cargar iconos generos
    genres.forEach(gen => {
        document.getElementById("genres").innerHTML += `<div class='icon bg-white h-16 w-16 m-2'><img src='${GENRES[gen]["slug"]}' title='${GENRES[gen]["name"]}'></div>`
    });;
}

const loadPlataforms = (plataforms) => {
    // Cargar iconos plataformas
    plataforms.forEach(plat => {
        document.getElementById("plataforms").innerHTML += `<div class='icon bg-white h-16 w-16 m-2'><img src='${PLATAFORMS[plat]["slug"]}' title='${PLATAFORMS[plat]["name"]}'></div>`
    });;
}


const loadGame = () => {
    getGame().then(element => {
        game = element;
        document.getElementById("name").innerHTML = element["name"];
        document.getElementById("year").innerHTML = element["year"];
        loadGenres(element["genres"]);
        loadPlataforms(element["plataforms"]);
    });
}

// Función que devuelve la fecha en formato dd-mm-yyyy
const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

const getRandomGameID = () => {
    let arr = [];
    let e = "";
    if (!localStorage.usedGames) {
        e = localStorage.getItem("guessTheCoverIDs").split(",").random();
        arr.push(e);
        console.log("arr: " + arr);
    } else {
        arr = JSON.parse(localStorage.usedGames);
        e = localStorage.guessTheCoverActualGameID;
        while (arr.includes(e)) {
            e = localStorage.getItem("guessTheCoverIDs").split(",").random();
        }
        arr.push(e);
    }
    localStorage.setItem("usedGames", JSON.stringify(arr));
    localStorage.setItem("guessTheCoverActualGameID", e);
    loadImg(getImg());
}

// Cargar los ids de los juegos en el localStorage
const loadGamesInLocalStorage = () => {
    getIDs().then(e => {
        localStorage.guessTheCoverIDs = e;
        localStorage.guessTheCoverIDsDate = getDate();
        getRandomGameID()
    })
}

const loadHearts = () => {
    let h = localStorage.guessTheCoverHearts;
    let cont = 4;
    while (h < cont) {
        document.getElementById("heart" + h + "Good").style.display = "none";
        document.getElementById("heart" + h + "Bad").style.display = "block";
        h++;
    }
}

const removeHeart = () => {
    localStorage.guessTheCoverHearts = localStorage.guessTheCoverHearts - 1;
    // if (localStorage.getItem("guessTheCoverHearts") > 0)
    loadHearts();
}
const resetHearts = () => {
    localStorage.guessTheCoverHearts = 4;
}


// A realizar una vez cargado el contenido del DOM
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.guessTheCoverHearts != 0) {
        loadHearts();
    } else {
        console.log("Sin corazones");
        loadHearts();

    }
    loadImg(getImg(getPhase()));
    // if (localStorage.guessTheCoverLoadNewGame) {
    //     getRandomGameID();
    //     localStorage.removeItem("guessTheCoverLoadNewGame");
    // }
});



mounted: {
    // loadGame();
    // Comprobar si es la primera vez que se entra
    if (!localStorage.guessTheCoverFirstGamePlayed) {
        localStorage.guessTheCoverFirstGamePlayed = true;
        localStorage.guessTheCoverLoadNewGame = true;
        localStorage.setItem("guessTheCoverPhase", 0);
        resetHearts();
        loadGamesInLocalStorage();
        console.log("Primera vez que entro :D");
    } else {
        // Comprobar si la última vez que se entro fue ese mismo día y si estan guardados los IDs de los juegos
        if (localStorage.guessTheCoverIDsDate != getDate() && !localStorage.guessTheCoverIDs) {
            loadGamesInLocalStorage();
            console.log("No existe el IDs o no has entrado hoy");
        } else {

        }
        // if (localStorage.guessThtCoverID) {
        //     console.log("Existe el id: " + localStorage.guessThtCoverID);
        // } else {
        //     console.log("No existe el id");
        //     localStorage.guessThtCoverID = "co55md";
        // }
    }

}
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

</script>