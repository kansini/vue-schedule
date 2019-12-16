import * as CALENDAR from '@/utils/calendar'

let {year, month, day} = CALENDAR.getNewDate(new Date())
let currentDate = `${year}年${month + 1}月`
let currentDay = `${year}年${month + 1}月${day}日`
const state = {
    currentViewIndex: 2,
    currentDate: currentDate,
    currentDay:currentDay,
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
    SET_CURRENT_DAY(state, payload) {
        state.currentDay = payload.currentDay
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


