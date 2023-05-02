import { createRouter, createWebHistory, routerKey } from "vue-router";
import Home from './views/Home.vue'
import guessTheCover from './views/guessTheCover.vue'
import GuessTheScreenShoot from './views/GuessTheScreenShoot.vue'



const routes = [
    { path: '/', component: Home },
    { path: '/guess-the-cover', component: guessTheCover },
    { path: '/guess-the-screenshoot', component: GuessTheScreenShoot },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;