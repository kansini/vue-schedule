<template>
    <div class="month-view-thumb">
        <div class="month-view-thumb-title">{{month.name}}</div>
        <div class="week-list">
            <div v-for="(item,index) in weekArr">{{item}}</div>
        </div>
        <div class="day-list">
            <div :class="[{'current':isCurrentMonth(item.date)},
                 {'notCurrent':!isCurrentMonth(item.date)},
                 {today:isToday(item.date)}]"
                 v-for="(item,index) in visibleCalendar">
                <span @click="jumpToDay(0)">{{item.day | day}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import * as CALENDAR from '@/utils/calendar.js';

    export default {
        name: "MonthViewThumb",
        props: {
            month: {
                type: Object,
                default: () => {
                    return {
                        name: "01月",
                        monthIndex: 0
                    }
                }
            }
        },
        data() {
            return {
                weekArr: ['一', '二', '三', '四', '五', '六', '日'],
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
                let calendarArr = [];
                let {year, month, day} = CALENDAR.getNewDate(CALENDAR.getDate(this.time.year, this.month.monthIndex, 1));
                let currentFirstDay = CALENDAR.getDate(year, month, 1);
                // 获取当前月第一天星期几
                let weekDay = currentFirstDay.getDay();
                let MSPerDay = 24 * 60 * 60 * 1000 //每天毫秒数
                let startTime;
                if (weekDay === 0) {
                    startTime = currentFirstDay - 6 * MSPerDay;
                } else {
                    startTime = currentFirstDay - (weekDay - 1) * MSPerDay;
                }
                let monthDayNum = 42
                for (let i = 0; i < monthDayNum; i++) {
                    calendarArr.push({
                        date: new Date(startTime + i * 24 * 60 * 60 * 1000),
                        year: year,
                        month: month + 1,
                        day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
                    })
                }
                return calendarArr
            }
        },
        methods: {
            // 是否是当前月
            isCurrentMonth(date) {
                let {year: currentYear, month: currentMonth} = CALENDAR.getNewDate(CALENDAR.getDate(this.time.year, this.month.monthIndex, 1));
                let {year, month} = CALENDAR.getNewDate(date);
                return currentYear == year && currentMonth == month
            },
            // 是否是今天
            isToday(date) {
                let {year: currentYear, month: currentMonth, day: currentDay} = CALENDAR.getNewDate(new Date());
                let {year, month, day} = CALENDAR.getNewDate(date);
                return currentYear == year && currentMonth == month && currentDay == day;
            },
            // 点击某一天
            jumpToDay(currentViewIndex) {
                this.$store.commit("schedule/SET_CURRENT_VIEW", {currentViewIndex})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .month-view-thumb {
        font-size: 12px;

        .month-view-thumb-title {
            width: 100%;
            padding: 16px;
            box-sizing: border-box;
            font-size: 14px;
            font-weight: bold;
            //text-align: center;
            color: #333;
        }

        .week-list, .day-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            color: #666;
            margin-bottom: 8px;

            div {
                width: calc(100% / 7);
                text-align: center;

                &:nth-child(7n + 6),
                &:nth-child(7n) {
                    @include listInfo_icon_theme($header-color-theme1);
                }
            }
        }

        .day-list {
            div {
                margin: 8px 0;

                span {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    border-radius: 24px;
                    line-height: 24px;
                    cursor: pointer;
                    transition: all ease .4s;
                }
            }
        }

        .today {
            span {
                @include background_theme($background-theme1);
                color: #fff;
            }

            &:hover span {
                transform: rotateX(360deg);
            }
        }

        .current {
            span {
                &:hover {
                    @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
                }
            }
        }

        .notCurrent {
            span {
                color: #ccc;
            }
        }


    }
</style>
