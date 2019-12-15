import Vue from 'vue'
import Vuex from 'vuex'
import schedule from './modules/schedule'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        schedule,
        theme
    }
})
