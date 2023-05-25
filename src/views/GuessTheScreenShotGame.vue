<template>
    <div class="flex justify-center mt-10 flex-wrap">
        <!-- Contenedor de imágenes y pistas -->
        <div class="aspect-video w-[848px] relative overflow-hidden max-h-[432px] basis-full justify-center flex">
            <!-- Pistas -->
            <p id="hint-1" class="bg-black/40 px-4 py-2 absolute z-50" style="display: none;">Puntuación de metacritic:
                <span id="hint1">85%</span>
            </p>
            <p id="hint-2" class="bg-black/40 px-4 py-2 absolute z-50" style="display: none;">Plataformas en las que se
                lanzo: <span id="hint2"></span></p>
            <p id="hint-3" class="bg-black/40 px-4 py-2 absolute z-50" style="display: none;">Géneros: <span
                    id="hint3"></span></p>
            <p id="hint-4" class="bg-black/40 px-4 py-2 absolute z-50" style="display: none;">Año de lanzamiento: <span
                    id="hint4"></span></p>
            <p id="hint-5" class="bg-black/40 px-4 py-2 absolute z-50" style="display: none;">Desarrolladora: <span
                    id="hint5"></span></p>
            <!-- Imágenes -->
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
            <button id="1" @click="changeImg(1); changeHint(0)" class="actual active w-12 p-3 rounded-md">1</button>
            <button id="2" @click=" changeImg(2); changeHint(1) " disabled class="active w-12 p-3 rounded-md">2</button>
            <button id="3" @click=" changeImg(3); changeHint(2) " disabled class="active w-12 p-3 rounded-md">3</button>
            <button id="4" @click=" changeImg(4); changeHint(3) " disabled class="active w-12 p-3 rounded-md">4</button>
            <button id="5" @click=" changeImg(5); changeHint(4) " disabled class="active w-12 p-3 rounded-md">5</button>
            <button id="6" @click=" changeImg(6); changeHint(5) " disabled class="active w-12 p-3 rounded-md">6</button>
        </div>
        <!-- Caja de texto -->
        <div id="inputBox"
            class="autocomplete autocomplete-guessTheScreenshot basis-full gueesTheScreenshot-input mt-5 flex justify-center">
            <input id="myInput" class="w-96" type="text" name="myVideogame" placeholder="Videojuego" v-model=" result ">
            <div class="myInputautocomplete-list"></div>
        </div>
        <!-- Contenedor con los botones -->
        <div id="btns" class="grid md:grid-cols-2 gap-2 mt-3 w-96">
            <button :onClick=" checkResult "
                class="bg-green-700 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-all">Adivinar!</button>
            <button :onClick=" skip "
                class="bg-amber-400 font-arcade text-center text-white px-4 py-3 rounded-lg hover:bg-amber-900 transition-all">Omitir</button>
        </div>
    </div>
    <!-- Contenedor con los resultados -->
    <div id="results" class="text-center mt-3 md:text-2xl font-arcade">
        <p id="badResult" style="display: none">El juego era:</p>
        <p id="goodResult" style="display: none">Has Ganado!!</p>
        <h2 id="name"></h2>
        <h3 id="year" class="mt-2"></h3>
    </div>
    <!-- Botón de nueva partida -->
    <div id="newGame" style="display: none" class="justify-center mt-4">
        <a href="/guess-the-screenshot"
            class="bg-green-400 font-arcade text-center text-black px-4 py-3 rounded-lg hover:bg-green-900 cursor-pointer hover:text-white transition-all">Más
            partidas</a>
    </div>
</template>

<script setup>
// Importar database
import { checkResultWithCorrect, getVideoGameNameAndYear, getHints } from '../database/databaseGuessTheScreenshot';
import { gameList } from '../assets/videoGamesList'


let idGame = "";
let result = "";
let urlParams = new URLSearchParams(window.location.search).get('id');

// Obtener id del Día
function getLastUrlSegment(url) {
    return new URL(url).pathname.split('/').filter(Boolean).pop();
}

// Cargar año y nombre del videojuego
const loadNameAndYear = () => {
    getVideoGameNameAndYear(idGame).then(e => {
        document.getElementById("name").innerHTML = e[0];
        document.getElementById("year").innerHTML = e[1];
    })
}

// Cargar pistas
const loadHints = () => {
    (idGame);
    getHints(idGame).then(e => {
        document.getElementById("hint1").innerHTML = e[0];
        document.getElementById("hint2").innerHTML = e[1];
        document.getElementById("hint3").innerHTML = e[2];
        document.getElementById("hint4").innerHTML = e[3];
        document.getElementById("hint5").innerHTML = e[4];
    })
}
// Comprobar estado de la parida
const checkState = () => {
    if (localStorage.getItem(idGame) < 6)
        return true

    return false
}

// Cargar derrota
const loadDefeat = () => {
    document.getElementById("results").style.display = "block";
    document.getElementById("badResult").style.display = "block";
    document.getElementById("newGame").style.display = "flex";
    localStorage.setItem(urlParams + "-status", "defeat");
    document.getElementById("inputBox").style.display = "none";
    document.getElementById("btns").style.display = "none";
    loadBtns(6);
    loadNameAndYear();
}

// Cargar victoria
const loadWin = () => {
    saveResults("a")
    localStorage.setItem(idGame, 6);
    localStorage.setItem(urlParams + "-status", "win");
    document.getElementById("results").style.display = "block";
    document.getElementById("goodResult").style.display = "block";
    document.getElementById("newGame").style.display = "flex";
    document.getElementById("inputBox").style.display = "none";
    document.getElementById("btns").style.display = "none";
    loadBtns(6);
    loadNameAndYear();
}

// Saltar el turno
const skip = () => {
    saveResults("o");
    if (localStorage.getItem(idGame) < 6)
        nextImg();
    else {
        loadDefeat();
    }
}

// Cargar botones
const loadBtns = (cant) => {
    for (let i = 1; i <= cant; i++) {
        document.getElementById(i).disabled = false;
    }
}

// Cargar antes de cargar la página
mounted: {
    idGame = getLastUrlSegment(window.location.href);
    if (localStorage.getItem(idGame) == null)
        localStorage.setItem(idGame, 1);

}

// Guardar resultados en el localStorage
const saveResults = (letter) => {
    let position = localStorage.getItem(idGame) - 1;
    let arr = JSON.parse(localStorage.getItem(urlParams));
    arr[position] = letter;
    localStorage.setItem(urlParams, JSON.stringify(arr));
}

// Función que comprueba el resultado
const checkResult = () => {
    if (result !== "") {
        checkResultWithCorrect(idGame, result).then(e => {
            if (e) {
                // Has adivinado el juego
                loadWin()
            } else {
                // No lo has adivinado
                saveResults("f");
                nextImg();
                result = "";
                document.getElementById("myInput").value = "";
            }
        })
    }

}

// mostrar siguiente imaen
const nextImg = () => {
    localStorage.setItem(idGame, Number(localStorage.getItem(idGame)) + 1);
    changeImg(localStorage.getItem(idGame));
    loadBtns(localStorage.getItem(idGame));
    changeHint(Number(localStorage.getItem(idGame)) - 1);
}

// A realizar una vez cargado el contenido del DOM
document.addEventListener("DOMContentLoaded", () => {

    loadHints();
    if (localStorage.getItem(urlParams + "-status") == "-") {
        loadBtns(localStorage.getItem(idGame));
        setTimeout(() => {
            autocomplete(document.getElementById("myInput"), gameList)
        }, 1000);
    }
    else {
        if (localStorage.getItem(urlParams + "-status") == "win")
            loadWin();
        else
            loadDefeat();
    }
});

// Cambiar imagen
const changeImg = (id) => {
    for (let i = 1; i <= 6; i++) {
        if (i == id)
            document.getElementById("img" + i).style.display = "block";
        else
            document.getElementById("img" + i).style.display = "none";
        document.getElementById(i).classList.remove("actual")
    }
    document.getElementById(id).classList.add("actual")
}

// Cambiar la pista
const changeHint = (id) => {
    for (let i = 1; i <= 5; i++) {
        if (id != 0) {
            if (i == id)
                document.getElementById("hint-" + i).style.display = "block";
            else {
                document.getElementById("hint-" + i).style.display = "none";
            }
        } else {
            document.getElementById("hint-1").style.display = "none";
            document.getElementById("hint-2").style.display = "none";
            document.getElementById("hint-3").style.display = "none";
            document.getElementById("hint-4").style.display = "none";
            document.getElementById("hint-5").style.display = "none";
        }
    }
}
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
            if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                b = document.createElement("DIV");
                b.innerHTML = arr[i].replace(new RegExp(val, "gi"), "<strong>$&</strong>");
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