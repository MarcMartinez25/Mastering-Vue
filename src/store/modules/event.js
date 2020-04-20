import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
    events: [],
    eventsTotal: 0,
    event: {},
};

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event);
    },
    SET_EVENTS(state, events) {
        state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
        state.eventsTotal = eventsTotal;
    },
    SET_EVENT(state, event) {
        state.event = event;
    },
};
export const actions = {
    CreateEvent({ commit, dispatch }, event) {
        return EventService.postEvent(event)
            .then(() => {
                const notification = {
                    type: 'success',
                    message: 'Event created successfully',
                };
                dispatch('notification/Add', notification, { root: true });
                commit('ADD_EVENT', event);
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message: 'There was an issue: ' + error.message,
                };
                dispatch('notification/Add', notification, { root: true });
                throw error;
            });
    },
    FetchEvents({ commit, dispatch }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(response => {
                commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']));
                commit('SET_EVENTS', response.data);
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message: 'There was an issue: ' + error.message,
                };
                dispatch('notification/Add', notification, { root: true });
            });
    },
    GetEvent({ commit, getters, dispatch }, id) {
        var event = getters.GetEvent(id);

        if (event) {
            commit('SET_EVENT', event);
        } else {
            EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data);
                })
                .catch(error => {
                    const notification = {
                        type: 'error',
                        message: 'There was an issue: ' + error.message,
                    };
                    dispatch('notification/Add', notification, { root: true });
                });
        }
    },
};
export const getters = {
    GetEvent: state => id => {
        return state.events.find(event => event.id === id);
    },
};
