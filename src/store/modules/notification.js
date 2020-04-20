export const namespaced = true;

export const state = {
    notifications: [],
};

let nextId = 1;
export const mutations = {
    PUSH(state, notification) {
        state.notifications.push({
            ...notification,
            id: nextId++,
        });
    },
    DELETE(state, notificationToRemove) {
        state.notifications = state.notifications.filter(
            notification => notification.id !== notificationToRemove.id
        );
    },
};

export const actions = {
    Add({ commit }, notification) {
        commit('PUSH', notification);
    },
    Remove({ commit }, notificationToRemove) {
        commit('DELETE', notificationToRemove);
    },
};
