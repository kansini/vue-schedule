import Vue from 'vue'

Vue.filter('time', function (value) {
    if (value < 10) {
        return `上午0${value}`
    } else if (value < 12 && value >= 10) {
        return `上午${value}`
    } else if (value == 12) {
        return `中午${value}`
    } else if (value > 12 && value < 18) {
        return `下午${value}`
    } else if (value >= 18) {
        return `晚上${value}`
    }
})
