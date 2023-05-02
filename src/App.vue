<template>
  <header class="flex justify-center mt-5">
    <nav>
        <router-link to="/"><h1 class="text-white font-minecraft text-3xl text-center w-fit">GameVerse <span
            class="text-purple-700">MiniPlay</span></h1></router-link>
    </nav>
  </header>
  <!-- <div>
    <nav>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Registro</router-link>
      <button>Logout</button>
    </nav>
  </div> -->
  <router-view></router-view>
</template>