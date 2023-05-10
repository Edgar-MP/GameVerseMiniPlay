<template>
    <!-- Grid con la home -->
    <section class="grid lg:grid-cols-3 gap-10 mt-10 text-black min-h-[20em] h-fit font-poppins">
        <!-- Carta Nº1 -->
        <article class="bg-white/90 mx-auto rounded-md p-10 text-center ">
            <h2>Adivina la portada</h2>
            <p class="mt-3">En este minijuego se te presentara una portada de un videojuego parcialmente pixelada y tendras
                que adivinar
                el videojuego del que viene.</p>
            <p><b>¿Cuántas seras capaz de adivinar?</b></p>
            <a href="/guess-the-cover">
                <button
                    class="minecraft-btn relative top-8 w-48 text-center text-white truncate px-4 py-1 border-2 border-b-4 hover:text-yellow-200">Jugar!</button>
            </a>
        </article>
        <!-- Carta Nº2 -->
        <article class="bg-white/90 mx-auto rounded-md p-10 text-center ">
            <h2>Adivina la captura</h2>
            <p class="mt-3">En este minijuego se te iran mostrando capturas de un videojuego y tendras que adivinar el
                videojuego del que viene. </p>
            <p class=" text-center"><b>Cada día podras jugar una partida.</b></p>
            <a href="/guess-the-screenshot" class="">
                <button
                    class="minecraft-btn relative top-8 w-48 text-center text-white truncate mx-auto px-4 py-1 border-2 border-b-4 hover:text-yellow-200">Jugar!</button>
            </a>
        </article>
        <!-- Carta Nº3 -->
        <article class="bg-white/90 mx-auto rounded-md p-10 text-center min-h-[20em] h-full w-full">
            <div class="overflow-auto h-[20em]">
                <div class="border-b-2 border-gray-700 mt-3">
                    <h2>Versión 0.3</h2>
                    <p class="text-left mt-2">En esta Versión se ha añadido la lógica del minijuego Adivina la portada</p>
                </div>

                <div class="border-b-2 border-gray-700">
                    <h2>Versión 0.2</h2>
                    <p class="text-left mt-2">En esta Versión se ha añadido el estilo del minijuego Adivina la portada</p>
                </div>

                <div class="border-b-2 border-gray-700 mt-3">
                    <h2>Versión 0.1</h2>
                    <p class="text-left mt-2">En esta Versión se ha añadido el menú de la home</p>
                </div>
                
            </div>
        </article>
    </section>
</template>

<script setup>

</script>