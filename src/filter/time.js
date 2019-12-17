import Vue from 'vue'

Vue.filter('time', function (value) {
    if (value < 10) {
        return `上午0${value}点`
    } else if (value < 12 && value >= 10) {
        return `上午${value}点`
    } else if (value == 12) {
        return `中午${value}点`
    } else if (value > 12 && value < 18) {
        return `下午0${value - 12}点`
    } else if (value >= 18 && value < 22) {
        return `晚上0${value - 12}点`
    }else {
        return `晚上${value - 12}点`
    }
})
