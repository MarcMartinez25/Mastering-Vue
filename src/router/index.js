import Vue from 'vue';
import VueRouter from 'vue-router';
import EventList from '../views/EventList';
import EventShow from '../views/EventShow';
import EventCreate from '../views/EventCreate';
import NProgress from 'nprogress';
import store from '@/store/index.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'event-list',
        component: EventList,
        props: true,
    },
    {
        path: '/event/:id',
        name: 'event-show',
        component: EventShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store.dispatch('event/GetEvent', routeTo.params.id).then(event => {
                routeTo.params.event = event;
                next();
            });
        },
    },
    {
        path: '/event/create',
        name: 'event-create',
        component: EventCreate,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
