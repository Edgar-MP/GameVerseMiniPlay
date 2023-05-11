<template>
    <div class="flex justify-center mt-10 flex-wrap">
        <!-- Contenedor de imágenes -->
        <div class="aspect-video w-[848px] relative overflow-hidden max-h-[432px] basis-full justify-center flex">
            <img id="img1" alt="Imagen 1" class="absolute visible w-full max-w-[848px] h-full max-h-[432px]"
                :src="'https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheScreenshot%2F' + idGame + '_p1.jpg?alt=media'">
            <img id="img2" alt="Imagen 2" class="relative hidden w-full max-w-[848px] h-full max-h-[432px]"
                :src="'https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheScreenshot%2F' + idGame + '_p2.jpg?alt=media'">
            <img id="img3" alt="Imagen 3" class="absolute hidden w-full max-w-[848px] h-full max-h-[432px]"
                :src="'https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheScreenshot%2F' + idGame + '_p3.jpg?alt=media'">
            <img id="img4" alt="Imagen 4" class="absolute hidden w-full max-w-[848px] h-full max-h-[432px]"
                :src="'https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheScreenshot%2F' + idGame + '_p4.jpg?alt=media'">
            <img id="img5" alt="Imagen 5" class="absolute hidden w-full max-w-[848px] h-full max-h-[432px]"
                :src="'https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheScreenshot%2F' + idGame + '_p5.jpg?alt=media'">
            <img id="img6" alt="Imagen 6" class="absolute hidden w-full max-w-[848px] h-full max-h-[432px]"
                :src="'https://firebasestorage.googleapis.com/v0/b/game-verse-mini-play.appspot.com/o/guessTheScreenshot%2F' + idGame + '_p6.jpg?alt=media'">
        </div>
        <!-- Contenedor de botones -->
        <div class="grid grid-cols-6 w-96 gap-3 justify-center text-xl md:text-3xl mt-3 btn-container">
            <button id="1" @click="changeImg(1)" class="actual active w-12 p-3 rounded-md">1</button>
            <button id="2" @click="changeImg(2)" disabled class="active w-12 p-3 rounded-md">2</button>
            <button id="3" @click="changeImg(3)" disabled class="active w-12 p-3 rounded-md">3</button>
            <button id="4" @click="changeImg(4)" disabled class="active w-12 p-3 rounded-md">4</button>
            <button id="5" @click="changeImg(5)" disabled class="active w-12 p-3 rounded-md">5</button>
            <button id="6" @click="changeImg(6)" disabled class="active w-12 p-3 rounded-md">6</button>
        </div>
        <!-- Caja de texto -->
        <div
            class="autocomplete autocomplete-guessTheScreenshot basis-full gueesTheScreenshot-input mt-5 flex justify-center">
            <input id="myInput" class="w-96" type="text" name="myVideogame" placeholder="Videojuego" v-model="result">
        </div>
        <!-- Contenedor con los botones -->
        <div class="grid md:grid-cols-2 gap-2 mt-3 w-96">
            <button :onClick="checkResult"
                class="bg-green-700 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-all">Adivinar!</button>
            <button :onClick="omitir"
                class="bg-amber-400 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-amber-900 transition-all">Omitir</button>
        </div>
        <!-- Contenedor con los resultados -->
        <div id="results" style="display:none" class="text-center">
            <p id="badResult" style="display: none;">El juego era:</p>
            <h2 id="name"></h2>
            <h3 id="year"></h3>
        </div>
        <!-- Contenedor con las pistas -->
        <div id="clues" style="display:none">
            <p class="text-center">Plataformas</p>
            <div id="plataforms" class="flex justify-center"></div>
            <p class="text-center">Generos</p>
            <div id="genres" class="flex justify-center"></div>
        </div>
        <!-- Botón de nueva partida -->
        <div id="newGame" style="display: none">
            <button :onClick="newGame"
                class="bg-green-300 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-all">Nueva
                Partida</button>
        </div>
    </div>
</template>

<script setup>
// Importar database
import { checkResultWithCorrect, getIDs, getGamesTitles, getGameGenres, getGamePlataforms, getVideoGameNameAndYear } from '../database/databaseGuessTheScreenshot';

let idGame = "";

function getLastUrlSegment(url) {
    return new URL(url).pathname.split('/').filter(Boolean).pop();
}


const loadBtns = (cant) => {
    console.log("cant: " + cant);
    for (let i = 1; i <= cant; i++) {
        console.log("object");
        document.getElementById(i).disabled = false;
    }
}

mounted: {
    idGame = getLastUrlSegment(window.location.href);
    if (localStorage.getItem(idGame) == null)
        localStorage.setItem(idGame, 1);

}

console.log(idGame);



// A realizar una vez cargado el contenido del DOM
document.addEventListener("DOMContentLoaded", () => {
    loadBtns(localStorage.getItem(idGame));
    getGamesTitles().then(e => {
        autocomplete(document.getElementById("myInput"), e);
    })
});

const changeImg = (id) => {
    console.log(id);
    for (let i = 1; i <= 6; i++) {
        if (i == id)
            document.getElementById("img" + i).style.display = "block";
        else
            document.getElementById("img" + i).style.display = "none";
        document.getElementById(i).classList.remove("actual")
    }
    document.getElementById(id).classList.add("actual")
}

// Funciones para el autocompletado de opciones
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items-guessTheScreenshot");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += `<input type='hidden' value="${arr[i]}">`;
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    result = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { //up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items-guessTheScreenshot");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

</script>