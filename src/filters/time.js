import Vue from 'vue'

Vue.filter('time', (value) => {
    //let timeArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
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
    } else {
        return `晚上${value - 12}点`
    }
})
