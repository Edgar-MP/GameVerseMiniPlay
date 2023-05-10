<template>
    <div class="grid md:grid-cols-3 mt-10">
        <!-- Leyenda -->
        <div class="flex items-center justify-end">
            <span class="bg-orange-400 rounded-sm w-5 h-5"></span>
            <span>&nbsp;&nbsp;= Saltado</span>
        </div>
        <div class="flex items-center justify-center">
            <span class="bg-red-400 rounded-sm w-5 h-5"></span>
            <span>&nbsp;&nbsp;= Fallado</span>
        </div>
        <div class="flex items-center justify-start">
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
                <button v-if="game.played" disabled
                    class="bg-green-400/10 font-arcade text-center text-black px-4 py-3 rounded-lg transition-all w-48">
                    {{ game.day }}</button>
                <button v-if="!game.played"
                    class="bg-green-400 font-arcade text-center text-black px-4 py-3 rounded-lg hover:bg-green-900 hover:text-white transition-all w-48">
                    {{ game.day }}</button>
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
import { gameList } from '../assets/guessTheScreenshot.min'
import { onMounted } from 'vue';


// Función que devuelve los días que hay desde el
const getDays = () => {
    var date1 = new Date("5/10/2023");
      var date2 = new Date();
      var Difference_In_Time = date2.getTime() - date1.getTime();
      return Math.floor(Difference_In_Time / (1000 * 3600 * 24))
    // return Math.ceil((date_2.getTime() - date_1.getTime()) / (1000 * 3600 * 24)) + 1;
}

// 
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

// 
const checkPlayedDays = () => {
    let days = getDays();
    console.log("Days: " + days);
    for (let i = 0; i <= days; i++) {
        if (localStorage.getItem(i + "-status") === "finished")
            gameListCustom[i].played = true;
    }
}

let gameListCustom = gameList;







mounted: {
    console.log("Antes");
    console.log(gameListCustom);
    checkPlayedDays();
    console.log("Despues");
    console.log(gameListCustom);
}



</script>