import { createRouter, createWebHistory } from "vue-router";
import AdminView from "../components/AdminView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AdminView,
        }
    ],
});

export default router;
