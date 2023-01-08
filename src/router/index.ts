import { createRouter, createWebHistory } from "vue-router";
import AdminView from "../components/AdminView.vue";
import GameView from "../components/GameView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AdminView,
        },
        {
            path: '/:hash',
            component: GameView,
        }
    ],
});

export default router;
