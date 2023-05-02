<template>
    <section class="justify-center mt-10 grid xl:grid-cols-3 justify-items-center gap-5 home-container">
        
        <!-- Minujuego Adivina la portada -->
        <article id="minigame1" class="home-columns">
            <h2 class="text-center">Adivina la portada</h2>
            <p class="mt-3">En este minijuego se te presentara una portada de un videojuego parcialmente pixelada y tendras que adivinar el videojuego del que viene.</p>
            <p class=" text-center"><b>¿Cuántas seras capaz de adivinar?</b></p>
            <p class="font-bold" id="guessTheCoverRecord">Record actual: <span>X</span></p>
            <div class="flex justify-center justify-items-center">
                <a href="/guess-the-cover">
                    <button class="minecraft-btn mx-auto w-64 text-center text-white truncate px-4 py-1 border-2 border-b-4 hover:text-yellow-200">Jugar!</button>
                </a>
            </div>
        </article>
        
        <!-- Minijuego adivina la captura -->
        <article id="minigame2" class="home-columns">
            <h2 class="text-center">Adivina la captura</h2>
            <p class="mt-3">En este minijuego se te iran mostrando capturas de un videojuego y tendras que adivinar el videojuego de las capturas.</p>
            <p class=" text-center"><b>Cada día podras jugar una partida nueva.</b></p>
            <br>
            <div class="flex justify-center justify-items-center">
                <router-link to="/guess-the-screenshoot">
                    <button class="minecraft-btn mx-auto w-64 text-center text-white truncate px-4 py-1 border-2 border-b-4 hover:text-yellow-200">Jugar!</button>
                </router-link>
            </div>
        </article>
        
        <!-- Notas de versión -->
        <article id="patchNotes" class="home-columns">
            <h2 class="text-center">Notas de Versión</h2>
            <div class="mt-3">
                <h3 class="font-bold">Versión 0.1</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit debitis assumenda ipsum totam tenetur quaerat modi iste quos sunt blanditiis. Minus, omnis tenetur quia cumque reiciendis autem similique nobis eveniet.</p>
            </div>
        </article>
    </section>
</template>

<script setup>
import { useDatabaseStore } from '../database/database';


const dataBaseStore = useDatabaseStore();
dataBaseStore.getUrls();
    // const cambiarFoto = () => {
    //     document.getElementById("foto").src = "https://d2c6c3qulxklrf.cloudfront.net/covers/webp/co1lbm.webp";
    // }
</script>