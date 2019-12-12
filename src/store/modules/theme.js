const state = {
    showThemeSelector: false
};
const actions = {};
const mutations = {
    SET_THEME_SELECTOR(state, payload) {
        state.showThemeSelector = payload.showThemeSelector
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}


