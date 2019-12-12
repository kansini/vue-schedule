import * as CALENDAR from '@/utils/calendar'

let {year, month, day} = CALENDAR.getNewDate(new Date())
let currentDate = `${year}年${month + 1}月`

const state = {
    currentViewIndex: 2,
    currentDate: currentDate,
    time: {year, month, day}
};
const actions = {};
const mutations = {
    SET_CURRENT_VIEW(state, payload) {
        state.currentViewIndex = payload.currentViewIndex
    },
    SET_CURRENT_DATE(state, payload) {
        state.currentDate = payload.currentDate
    },
    SET_TIME(state, payload) {
        state.time = payload.time
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}


