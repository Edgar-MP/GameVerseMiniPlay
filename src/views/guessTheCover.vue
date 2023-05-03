<template>
    <div id="guessTheCover" class="m-auto justify-center justify-items-center mt-14 grid">
        <img id="imgGuessTheCover" :src="url" alt="" class="border-2 border-white">
        <div id="playableBtns" class="mt-5 grid gap-2 justify-center">
            <div class="autocomplete">
                <input id="myInput" class="w-full" type="text" name="myVideogame" placeholder="Videojuego" v-model="result">
            </div>

            <div class="grid md:grid-cols-2 gap-2">
                <button :onClick="checkResult"
                    class="bg-green-700 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-all">Adivinar!</button>
                <button :onClick="omitir"
                    class="bg-amber-400 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-amber-900 transition-all">Omitir</button>
            </div>
        </div>
        <div id="results" style="display:none" class="text-center">
            <p id="badResult" style="display: none;">El juego era:</p>
            <h2 id="name"></h2>
            <h3 id="year"></h3>
        </div>
        <div id="clues" style="display:none">
            <p class="text-center">Plataformas</p>
            <div id="plataforms" class="flex justify-center"></div>
            <p class="text-center">Generos</p>
            <div id="genres" class="flex justify-center"></div>
        </div>
        <div id="newGame" style="display: none">
            <button :onClick="newGame"
                class="bg-green-300 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-all">NUeva
                Partida</button>
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
        <div class="">
            <h2>Racha actual: <span id="currentWins">0</span></h2>
            <h2>Racha máxima: <span id="allwaysMaxWins"></span></h2>
        </div>
    </div>
</template>

<script setup>

// Importaciones
import { checkResultWithCorrect, getIDs, getGamesTitles, getGameGenres, getGamePlataforms, getVideoGameNameAndYear } from '../database/database';
import VueMagnifier from '@websitebeaver/vue-magnifier';
import '@websitebeaver/vue-magnifier/styles.css';
import { PLATAFORMS } from '../icons/plataforms'
import { GENRES } from '../icons/genres'
import { onMounted } from 'vue';

let result = ""
let actualWins = 0;

// Método para obtener la fase en la que se encuentra el jugador
const getPhase = () => {
    let phase = localStorage.getItem("guessTheCoverPhase");
    // console.log("Phase: " + phase);
    switch (phase) {
        case "0":
            return "_p0";
            break;
        case "1":
            return "_p1";
            break;
        case "2":
            return "_p2";
            break;
        case "3":
            return "_p3";
            break;
        default:
            return ""
            break;
    }
}

// Método para obtener una imagen
const getImg = () => {
    // console.log("object");
    let idGame = localStorage.getItem("guessTheCoverActualGameID");
    // console.log("idGame: " + idGame);
    // console.log("phase: " + getPhase());
    return "https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheCover%2F" + idGame + getPhase() + ".jpg?alt=media"
}


let url = getImg();


// Método para cargar una imagen 
const loadImg = (url) => {
    // console.log("url: " + url);
    document.getElementById("imgGuessTheCover").src = url;
}

// Método para pasar de fase
const nextPhase = () => {
    // console.log("NUEVA FASEEEEEEEE");
    let actualPhase = Number(localStorage.getItem("guessTheCoverPhase"))
    actualPhase++;
    localStorage.setItem("guessTheCoverPhase", actualPhase);
}


// Método para omitir un intento
const omitir = () => {
    if (localStorage.getItem("guessTheCoverHearts") === "1") {
        // console.log("Omiciooon");
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

// Función para cargar los iconos de los generos
const loadGenres = (genres) => {
    getGameGenres(localStorage.getItem("guessTheCoverActualGameID")).then(gen => {
        // console.log("gen");
        // console.log(gen);
        // Cargar iconos generos
        gen.forEach(g => {
            document.getElementById("genres").innerHTML += `<div class='icon bg-white h-16 w-16 m-2'><img src='${GENRES[g]["slug"]}' title='${GENRES[g]["name"]}'></div>`
        });;
    })
}

// Función para cargar los iconos de las plataformas
const loadPlataforms = () => {
    getGamePlataforms(localStorage.getItem("guessTheCoverActualGameID")).then(plat => {
        // Cargar iconos plataformas
        plat.forEach(p => {
            document.getElementById("plataforms").innerHTML += `<div class='icon bg-white h-16 w-16 m-2'><img src='${PLATAFORMS[p]["slug"]}' title='${PLATAFORMS[p]["name"]}'></div>`
        });;
    })
}

// Función para mostrar las pistas
const loadClues = () => {
    loadPlataforms();
    loadGenres();
    document.getElementById("clues").style.display = "block";
}

// Función para borrar las pistas
const deleteClues = () => {
    document.getElementById("genres").innerHTML = "";
    document.getElementById("plataforms").innerHTML = "";
    document.getElementById("clues").style.display = "none";
}

// Función para ocultar el panel de corazones
const hideHearts = () => {
    document.getElementById("hearts").style.display = "none";
}

// Función para mostrar el panel de corazones
const showHearts = () => {
    document.getElementById("hearts").style.display = "flex";
}

// Función para cargar el nombre y el año del videojuego
const loadNameAndYear = () => {
    getVideoGameNameAndYear(localStorage.getItem("guessTheCoverActualGameID")).then(e => {
        // console.log("EE");
        // console.log(e);
        document.getElementById("name").innerHTML = e[0];
        document.getElementById("year").innerHTML = e[1];
        document.getElementById("results").style.display = "block";
    })
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
        // console.log("arr: " + arr);
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

// Función para cargar los corazones
const loadHearts = () => {
    let h = localStorage.guessTheCoverHearts;
    console.log("Hearts: " + h);
    let cont = 4;
    while (h < cont) {
        document.getElementById("heart" + h + "Good").style.display = "none";
        document.getElementById("heart" + h + "Bad").style.display = "block";
        h++;
    }
}

// Función que elimina un corazón
const removeHeart = () => {
    localStorage.guessTheCoverHearts = localStorage.guessTheCoverHearts - 1;
    if (localStorage.getItem("guessTheCoverHearts") == 0) {
        // console.log("OLEEEEEEEEEEEE 0 VIDAS");
        setLastPhase();
        loadImg(getImg());
        loadLost();
    }
    loadHearts();
}
// Función que reinicia los corazones
const resetHearts = () => {
    localStorage.guessTheCoverHearts = 4;
    for (let h = 0; h <= 3; h++) {
        document.getElementById("heart" + h + "Good").style.display = "block";
        document.getElementById("heart" + h + "Bad").style.display = "none";
    }
}





mounted: {
    getGamesTitles().then(e => {
        // console.log("autocomplete loading");
        autocomplete(document.getElementById("myInput"), e);
        // console.log("autocomplete loaded");
    })
    // Comprobar si es la primera vez que se entra
    if (!localStorage.guessTheCoverFirstGamePlayed) {
        localStorage.allwaysMaxWins = "-";
        localStorage.guessTheCoverFirstGamePlayed = true;
        localStorage.guessTheCoverLoadNewGame = true;
        localStorage.setItem("guessTheCoverPhase", 0);
        localStorage.guessTheCoverHearts = 4;
        loadGamesInLocalStorage();
        // console.log("Primera vez que entro :D");
    } else {
        // Comprobar si la última vez que se entro fue ese mismo día y si estan guardados los IDs de los juegos
        if (localStorage.guessTheCoverIDsDate != getDate() && !localStorage.guessTheCoverIDs) {
            loadGamesInLocalStorage();
            // console.log("No existe el IDs o no has entrado hoy");
        } else {

        }
    }
}
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}


const reloadWins = () => {
    if (localStorage.getItem("allwaysMaxWins") == "-") {
        localStorage.setItem("allwaysMaxWins", localStorage.getItem("currentWins"));
    }
    if (localStorage.getItem("allwaysMaxWins") < localStorage.getItem("currentWins")) {
        localStorage.setItem("allwaysMaxWins", localStorage.getItem("currentWins"));
    }
}

const reloadFrontViews = () => {
    document.getElementById("allwaysMaxWins").innerHTML = localStorage.getItem("allwaysMaxWins");
    document.getElementById("currentWins").innerHTML = localStorage.getItem("currentWins");
}

// Función para cargar la victoria
const loadWin = () => {
    let w = localStorage.getItem("currentWins");
    w++;
    localStorage.setItem("currentWins", w);
    reloadWins();
    reloadFrontViews();
    loadClues();
    loadNameAndYear();
    hideHearts();
    document.getElementById("newGame").style.display = "block";
    document.getElementById("playableBtns").style.display = "none";
    // console.log("HAS GANADO");
    localStorage.setItem("guessTheCoverWin", true);
    document.getElementById("myInput").value = "";
}

// Función para cargar la derrota
const loadLost = () => {
    localStorage.setItem("currentWins", 0);
    localStorage.removeItem("usedGames", []);
    reloadWins();
    reloadFrontViews();
    localStorage.setItem("currentWins", 0);
    loadClues();
    loadNameAndYear();
    hideHearts();
    document.getElementById("newGame").style.display = "block";
    document.getElementById("badResult").style.display = "block";
    document.getElementById("playableBtns").style.display = "none";
    // console.log("HAS Perdido :(");
    localStorage.setItem("guessTheCoverLost", true);
    document.getElementById("myInput").value = "";
}


// Función para cargar una nueva partida
const newGame = () => {
    deleteClues();
    localStorage.setItem("guessTheCoverPhase", 0);
    resetHearts();
    loadGamesInLocalStorage();
    getGamesTitles().then(e => {
        // console.log("autocomplete loading");
        autocomplete(document.getElementById("myInput"), e);
        // console.log("autocomplete loaded");
    })
    document.getElementById("badResult").style.display = "none";
    document.getElementById("playableBtns").style.display = "grid";
    localStorage.removeItem("guessTheCoverWin");
    localStorage.removeItem("guessTheCoverLost");
    document.getElementById("myInput").value = "";
    document.getElementById("name").innerHTML = "";
    document.getElementById("year").innerHTML = "";
    document.getElementById("results").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    showHearts();
    loadHearts();
}

// Función para cargar como fase la imagen sin pixelar
const setLastPhase = () => {
    localStorage.setItem("guessTheCoverPhase", 10);
}

// Función que comprueba el resultado
const checkResult = () => {
    if (result !== "") {
        // console.log(result);
        let idGame = localStorage.getItem("guessTheCoverActualGameID");
        checkResultWithCorrect(idGame, result).then(e => {
            // console.log(e);
            if (e) {
                // Has adivinado el juego
                localStorage.setItem("guessTheCoverPhase", 10);
                setLastPhase();
                loadImg(getImg());
                loadWin();
            } else {
                // No lo has adivinado
                removeHeart();
                nextPhase();
                loadImg(getImg())
                result = "";
                document.getElementById("myInput").value = "";
            }
        })
    }

}


// A realizar una vez cargado el contenido del DOM
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("guessTheCoverHearts") != 0) {
        loadHearts();
    } else {
        // console.log("Sin corazones");
        // console.log("OLEEEEEEEEEEEE 0 VIDAS");
        setLastPhase();
        loadImg(getImg());
        loadLost();
    }
    // loadImg(getImg());

    getGamesTitles().then(e => {
        // console.log("autocomplete loading");
        autocomplete(document.getElementById("myInput"), e);
        // console.log("autocomplete loaded");
    })
    if (localStorage.getItem("guessTheCoverWin")) {
        loadWin();
    }
    document.getElementById("allwaysMaxWins").innerHTML = localStorage.getItem("allwaysMaxWins");
});

// Funciones para el autocompletado

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        document.getElementsByTagName("body")[0].style.background = "red";
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
                b.innerHTML += `<input type='hidden' value="${arr[i]}">`;
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