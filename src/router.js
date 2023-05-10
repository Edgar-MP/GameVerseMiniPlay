import { createRouter, createWebHistory, routerKey } from "vue-router";
import Home from './views/Home.vue'
import guessTheCover from './views/guessTheCover.vue'
import GuessTheScreenShot from './views/GuessTheScreenShot.vue'



const routes = [
    { path: '/', component: Home },
    { path: '/guess-the-cover', component: guessTheCover },
    { path: '/guess-the-screenshot', component: GuessTheScreenShot },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;