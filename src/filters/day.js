import Vue from 'vue'

Vue.filter('day', (value) => {

    return value < 10 ? `0${value}` : value;

})
