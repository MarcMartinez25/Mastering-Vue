import Vue from 'vue';
import VueRouter from 'vue-router';
import EventList from '../views/EventList';
import EventShow from '../views/EventShow';
import EventCreate from '../views/EventCreate';
import NProgress from 'nprogress';
import store from '@/store/index.js';
import NotFound from '../views/NotFound';
import NetworkIssue from '../views/NetworkIssue';

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
            store
                .dispatch('event/GetEvent', routeTo.params.id)
                .then(event => {
                    routeTo.params.event = event;
                    next();
                })
                .catch(error => {
                    if (error.response && error.response.status == 404) {
                        next({ name: '404', params: { resource: 'event' } });
                    } else {
                        next({ name: 'network-issue' });
                    }
                });
        },
    },
    {
        path: '/event/create',
        name: 'event-create',
        component: EventCreate,
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        props: true,
    },
    {
        path: '/network-issue',
        name: 'network-issue',
        component: NetworkIssue,
    },
    {
        path: '*',
        redirect: { name: '404', params: { resource: 'page' } },
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
