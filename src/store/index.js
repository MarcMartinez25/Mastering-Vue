import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: { id: 'abc123', name: 'Marco Martinez' },
        categories: [
            'sustainablility',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community',
        ],
        events: [],
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event);
        },
    },
    actions: {
        CreateEvent({ commit }, event) {
            return EventService.postEvent(event).then(() => {
                commit('ADD_EVENT', event);
            });
        },
    },
    modules: {},
    getters: {},
});
