<template>
    <div id="guessTheCover" class="m-auto justify-center justify-items-center mt-14 grid">
        <img id="imgGuessTheCover" :src="url" alt="" class="border-2 border-white">
        <div id="playableBtns" class="mt-5 flex gap-2">
            <div class="autocomplete" style="width:300px;">
                <input id="myInput" type="text" name="myCountry" placeholder="Country" v-model="result">
            </div>

            <button :onClick="checkResult"
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
import { getGame, getIDs, getGamesTitles } from '../database/database';
import { PLATAFORMS } from '../icons/plataforms'
import { GENRES } from '../icons/genres'
import { onMounted } from 'vue';

let imgSrc = "https://placehold.co/300x400"
let imgID = localStorage.getItem("guessTheCoverActualGameID");
let game = undefined;
let result = ""

// Método para obtener la fase en la que se encuentra el jugador
const getPhase = () => {
    let phase = localStorage.getItem("guessTheCoverPhase");
    console.log("Phase: " + phase);
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
    if (localStorage.getItem("guessTheCoverHearts") === "1") {
        console.log("Omiciooon");
        nextPhase()
        loadImg(getImg());
        removeHeart();
        document.getElementById("clues").style.display = "block";
        document.getElementById("playableBtns").style.display = "none";
        document.getElementById("results").style.display = "block";
        document.getElementById("hearts").style.display = "none";
    } else {
        nextPhase()
        loadImg(getImg());
        removeHeart();
    }
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

    getGamesTitles().then(e => {
        console.log("autocomplete loading");
        autocomplete(document.getElementById("myInput"), e);
        console.log("autocomplete loaded");
    })
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
    }

}
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}


const checkResult = () => {
    console.log(result);
}




// Autocomplete

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    result = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

</script>