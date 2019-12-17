<template>
    <div class="schedule-week-view">
        <div class="schedule-week-header">
            <div class="week-list">
                <div class="week-list-item" v-for="(week,index) in weeks" :key="index">{{week}}</div>
            </div>
            <div class="day-list">
                <div class="day-list-item" :class="[{today:isToday(item.date)},{notToday:!isToday(item.date)}]"
                     v-for="(item,index) in visibleCalendar" :key="index" @click="jumpToDay(0)">{{item.day | day}}
                </div>
            </div>
        </div>
        <div class="schedule-week-content">
            <div class="schedule-week-hour-list">
                <div class="hour"></div>
                <div class="hour" v-for="index in 23">
                    <div class="hour-text">{{index | time}}</div>
                </div>
            </div>
            <div class="schedule-week-day-list">
                <div class="hour" v-for="index in 24">
                    <div class="day" v-for="index in 7"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as CALENDAR from '@/utils/calendar.js';

    export default {
        name: "weekView",
        data() {
            return {
                weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            }
        },
        computed: {
            time: {
                get() {
                    return this.$store.state.schedule.time
                },
                set() {

                }
            },
            visibleCalendar() {
                let weekArr = [];
                let {year, month, day} = CALENDAR.getNewDate(CALENDAR.getDate(this.time.year, this.time.month, this.time.day));
                let currentFirstDay = CALENDAR.getDate(year, month, this.time.day);
                // 获取当前天是星期几
                let weekDay = currentFirstDay.getDay();
                let MSPerDay = 24 * 60 * 60 * 1000 //每天毫秒数
                let startTime;
                if (weekDay === 0) {
                    startTime = currentFirstDay - 6 * MSPerDay;
                } else {
                    startTime = currentFirstDay - (weekDay - 1) * MSPerDay;
                }
                let weekDayNum = 7
                for (let i = 0; i < weekDayNum; i++) {
                    weekArr.push({
                        date: new Date(startTime + i * 24 * 60 * 60 * 1000),
                        year: year,
                        month: month + 1,
                        day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
                    })
                }
                return weekArr
            }

        },
        methods: {
            // 是否是今天
            isToday(date) {
                let {year: currentYear, month: currentMonth, day: currentDay} = CALENDAR.getNewDate(new Date());
                let {year, month, day} = CALENDAR.getNewDate(date);
                return currentYear == year && currentMonth == month && currentDay == day;
            },
            jumpToDay(currentViewIndex) {
                this.$store.commit("schedule/SET_CURRENT_VIEW", {currentViewIndex})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .schedule-week-view {
        .schedule-week-header {
            padding: 16px 0 16px 48px;
            box-sizing: border-box;

            .week-list {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #999;
                margin-bottom: 8px;

                .week-list-item {
                    width: calc(100% / 7);
                    text-align: center;
                }
            }

            .day-list {
                width: 100%;
                display: flex;
                justify-content: space-between;
                color: #666;

                .day-list-item {
                    margin: 0 auto;
                    font-size: 24px;
                    font-weight: bold;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 48px;
                    text-align: center;
                    transition: all ease .4s;
                    background: rgba(0, 0, 0, .02);
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }

            .today {
                color: #fff;
                @include background_theme($background-theme1);
            }

            .notToday {
                &:hover {
                    @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
                }
            }

            .currentDay {
                .week {
                    @include listInfo_icon_theme($header-color-theme1);
                }

            }
        }

        .schedule-week-content {
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;

            .schedule-week-hour-list {
                font-size: 12px;
                color: #999;
                width: 80px;

                .hour {
                    height: 48px;

                    .hour-text {
                        position: relative;
                        top: -6px;
                    }
                }
            }

            .schedule-week-day-list {
                width: calc(100% - 80px);
                font-size: 14px;
                color: #ccc;
                border-left: 1px solid #f1f1f1;
                border-top: 1px solid #f1f1f1;
                box-sizing: border-box;

                .hour {
                    position: relative;
                    width: 100%;
                    height: 48px;
                    border-bottom: 1px solid #f1f1f1;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    box-sizing: border-box;

                    &::before {
                        position: absolute;
                        content: '';
                        left: -16px;
                        top: -1px;
                        width: 16px;
                        height: 1px;
                        background: #f1f1f1;
                    }


                    .day {
                        height: 48px;
                        width: calc(100% / 7);
                        border-right: 1px solid #f1f1f1;
                        box-sizing: border-box;

                    }
                }
            }
        }
    }
</style>
