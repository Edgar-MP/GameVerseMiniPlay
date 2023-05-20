import { createRouter, createWebHistory, routerKey } from "vue-router";
import Home from './views/Home.vue'
import guessTheCover from './views/guessTheCover.vue'
import GuessTheScreenShot from './views/GuessTheScreenShot.vue'
import GuessTheScreenShotGame from './views/GuessTheScreenShotGame.vue'
import doc from './views/doc.vue'

// Rutas de la aplicación web
const routes = [
    { path: '/', component: Home },
    { path: '/guess-the-cover', component: guessTheCover },
    { path: '/guess-the-screenshot', component: GuessTheScreenShot },
    { path: '/guess-the-screenshot/game/:id', component: GuessTheScreenShotGame },
    { path: '/doc', component: doc },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;