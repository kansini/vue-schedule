<template>
    <div class="schedule-month-view">
        <div class="schedule-week">
            <div v-for="(item, index) in weekArr" :key="index" class="week-item">{{item}}</div>
        </div>
        <div class="schedule-view">
            <div v-for="(item, index) in visibleCalendar" :key="index" class="date-view"
                 :class="[{'current':isCurrentMonth(item.date)},
                 {'notCurrent':!isCurrentMonth(item.date)},
                 {today:isToday(item.date)}]" @click="handleDay">
                <span class="day" @click="jumpToDay(0)">{{item.day}}</span>
                <div class="schedule-list">
                    <div class="schedule-list-item">
                        <template>
                            <span>{{item.event.title}}</span>
                            <span>{{item.event.startTime}}</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import * as CALENDAR from '@/utils/calendar.js';

    export default {
        name: "monthView",
        data() {
            return {
                weekArr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日 '],
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
                let {year, month, day} = CALENDAR.getNewDate(CALENDAR.getDate(this.time.year, this.time.month, 1));
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
                let monthDayNum
                if (weekDay == 0) {
                    monthDayNum = 42
                } else {
                    monthDayNum = 35
                }
                for (let i = 0; i < monthDayNum; i++) {
                    calendarArr.push({
                        date: new Date(startTime + i * 24 * 60 * 60 * 1000),
                        year: year,
                        month: month + 1,
                        day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
                        event: {
                            title: "",
                            startTime: ""
                        }
                    })
                }
                return calendarArr
            }
        },
        methods: {
            // 是否是当前月
            isCurrentMonth(date) {
                let {year: currentYear, month: currentMonth} = CALENDAR.getNewDate(CALENDAR.getDate(this.time.year, this.time.month, 1));
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
                // this.$forceUpdate();
                // this.$emit('handleClickDay', item);
                // this.calendarList.map(x => {
                //     x.clickDay = false;
                // });
                // this.$set(item, 'clickDay', true);
            },
            handleDay(item) {
                this.$emit('handleDay', item);
            }
        }
    }
</script>

<style lang="scss">
    .schedule-month-view {

        .schedule-week {
            width: 100%;
            display: flex;
            justify-content: center;

            .week-item {
                width: calc(100% / 7);
                text-align: center;
                font-size: 16px;
                padding: 24px 0;
                color: #333;
                font-weight: bold;
                box-sizing: border-box;

                &:nth-child(6),
                &:nth-child(7) {
                    @include listInfo_icon_theme($header-color-theme1);
                }
            }
        }

        .schedule-view {
            width: 100%;
            border-top: 1px solid #f1f1f1;
            border-left: 1px solid #f1f1f1;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .date-view {
                width: calc(100% / 7);
                height: 128px;
                padding: 8px;
                color: #666;
                font-size: 14px;
                border-right: 1px solid #f1f1f1;
                border-bottom: 1px solid #f1f1f1;
                box-sizing: border-box;
                cursor: pointer;

                &:nth-child(7n+6),
                &:nth-child(7n) {
                    @include listInfo_icon_theme($header-color-theme1);
                }


                .day {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 32px;
                    text-align: center;
                    transition: all ease .4s;
                    background: rgba(0, 0, 0, .02);
                }

                .schedule-list {
                    font-size: 12px;
                    padding: 8px;
                    box-sizing: border-box;

                    .schedule-list-item {
                        color: #999;
                        position: relative;

                        div {
                            margin-bottom: 8px;
                            display: flex;
                            justify-content: flex-start;

                            span {
                                display: block;
                            }

                            span:nth-child(1) {
                                width: 56px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            span:nth-child(2) {
                                color: #aaa;
                            }
                        }

                        &::before {
                            //content: '';
                            position: absolute;
                            top: 4px;
                            left: 0px;
                            width: 8px;
                            height: 8px;
                            border-radius: 8px;
                            box-shadow: 0 0 0 3px $red-2;
                            background: $red-6;
                        }
                    }
                }
            }

            .current {
                background: #fff;
                transition: all ease .4s;

                &::before {
                    position: absolute;
                    left: calc(50% - 16px);
                    top: calc(50% - 16px);
                    content: 'add';
                    font-family: 'Material Icons';
                    font-size: 32px;
                    transform: scale(0);
                    opacity: 0;
                    @include listInfo_icon_theme($header-color-theme1);
                    transition: all ease .6s;
                }

                &:hover::before {
                    transform: scale(1);
                    opacity: 1;
                }

                &:hover {
                    box-shadow: 0 0 20px rgba(0, 0, 0, .15);
                    transform: scale(1.1);
                    border-radius: 6px;
                    border: none;

                    .day {
                        transform: rotateX(360deg);
                        @include background_theme($background-theme1);
                        color: #fff;
                    }
                }
            }

            .notCurrent {
                background-image: linear-gradient(45deg, rgba(0, 0, 0, .01) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .01) 75%, transparent 75%, transparent);
                background-size: 20px 20px;
                color: #ccc;
                pointer-events: none;
            }

            .today {
                border-radius: 8px;
                @include listInfo_theme($dropMenu-bg-theme1, $listInfo-border-theme1);

                .day {
                    @include background_theme($background-theme1);
                    color: #fff;
                }
            }
        }
    }

</style>
