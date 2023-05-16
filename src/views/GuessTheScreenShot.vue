<template>
    <div class="grid grid-cols-2 md:grid-cols-3 mt-10">
        <!-- Leyenda -->
        <div class="flex items-center justify-center md:justify-end">
            <span class="bg-orange-400 rounded-sm w-5 h-5"></span>
            <span>&nbsp;&nbsp;= Saltado</span>
        </div>
        <div class="flex items-center justify-center md:justify-center">
            <span class="bg-red-400 rounded-sm w-5 h-5"></span>
            <span>&nbsp;&nbsp;= Fallado</span>
        </div>
        <div class="flex items-center justify-center col-span-2 md:col-auto md:justify-start">
            <span class="bg-green-400 rounded-sm w-5 h-5"></span>
            <span>&nbsp;&nbsp;= Acertado</span>
        </div>
        <!-- Fin Leyenda -->
    </div>
    <!-- Contador de partidas -->
    <div class="grid gap-5 mt-5 justify-center">
        <template v-for="(game, index) in gameListCustom" :key="index">
            <div class="grid grid-cols-2 gap-5" v-if="index <= getDays()">
                <!-- Cargar botón para jugar -->
                <button v-if="game.played"
                    class="bg-green-400/10 font-arcade text-center text-black px-4 py-3 rounded-lg transition-all w-48 cursor-not-allowed">
                    {{ game.day }}</button>
                <a v-if="!game.played" :href="'/guess-the-screenshot/game/' + game.id + '?id=' + index"
                    class="bg-green-400 font-arcade text-center text-black px-4 py-3 rounded-lg hover:bg-green-900 cursor-pointer hover:text-white transition-all w-48">
                    {{ game.day }}</a>
                <!-- Fin de botones -->
                <!-- Cargar resultado de cada vida -->
                <div class="flex items-center justify-center gap-3">
                    <!-- Recorrer los resultados según los obtenidos -->
                    <template v-for="result in getResultsOfDay(index)">
                        <!-- Si el resultado es un fallo se dibuja el rojo -->
                        <span v-if="result == 'f'" class="bg-red-400 rounded-sm w-5 h-5"></span>
                        <!-- Si el resultado es una omisión se dibuja el Naranja -->
                        <span v-else-if="result == 'o'" class="bg-orange-400 rounded-sm w-5 h-5"></span>
                        <!-- Si el resultado es un acierto se dibuja el Verde -->
                        <span v-else-if="result == 'a'" class="bg-green-400 rounded-sm w-5 h-5"></span>
                        <!-- Si el resultado no es ninguno de los anteriores se dibuja el vacio -->
                        <span v-else class="bg-transparent border-2 border-white rounded-sm w-5 h-5"></span>
                    </template>
                </div>
                <!-- Fin de carga de resultados -->

            </div>
        </template>
    </div>
</template>

<script setup>
// Importaciones necesarias
import { gameList } from '../assets/guessTheScreenshot.min'
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

// Comprobar si la URL tiene un parámetro denominado "location" y, si lo tiene, extraer el valor del parámetro idDay.
if (urlParams.has('location')) {
    let locationFilter = urlParams.get('idDay=');
}
// Función que devuelve los días que hay desde el lanzamiento de la aplicación (10/5/2023) hasta el día actual
const getDays = () => {
    var date1 = new Date("5/10/2023");
    var date2 = new Date();
    var Difference_In_Time = date2.getTime() - date1.getTime();
    return Math.floor(Difference_In_Time / (1000 * 3600 * 24))
}

// Obtener los resultados obternidos un día
const getResultsOfDay = (day) => {
    // Acierto = a
    // Fallo = f
    // Omitido = o
    // Vacío = Cualquier carácter excepto "a", "f" u "o"
    // localStorage.setItem("resultat", JSON.stringify(this.resultats));
    if (JSON.parse(localStorage.getItem(day) != null))
        return JSON.parse(localStorage.getItem(day))
    return ["z", "z", "z", "z", "z", "z"]
}

// Comprobar los días jugados
const checkPlayedDays = () => {
    let days = getDays();
    for (let i = 0; i <= days; i++) {
        if (localStorage.getItem(i + "-status") === "win" || localStorage.getItem(i + "-status") === "defeat")
            gameListCustom[i].played = true;
        if (localStorage.getItem(i) == null) 
            localStorage.setItem(i, JSON.stringify(["x", "x", "x", "x", "x", "x"]))
            
        if (localStorage.getItem(i+"-status") == null) 
            localStorage.setItem(i+"-status", "-")
    }
}

let gameListCustom = gameList;


// Realizar antes de cargar la página
mounted: {
    checkPlayedDays();
}



</script>