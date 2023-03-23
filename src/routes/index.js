import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/questions',
        name: 'questions',
        component: () => import('../views/Questions.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
