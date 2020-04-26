import {RouteConfig} from "vue-router";

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/details',
        name: 'Details',
        component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
    }
];
