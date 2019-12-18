<template>
    <div class="schedule-day-view">
        <div class="schedule-day-header">
            <div class="schedule-day-item" :class="{currentDay:currentDay.isToday}">
                <div class="week">{{currentDay.week}}</div>
                <div class="day">{{currentDay.day}}</div>
            </div>
        </div>
        <div class="schedule-day-content">
            <div class="schedule-day-hour-list">
                <div class="hour"></div>
                <div class="hour" v-for="index in 23">
                    <div class="hour-text">{{index | time}}</div>
                </div>
            </div>
            <div class="schedule-day-list">
                <div class="week" v-for="index in 24" @click="handleHour">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dayView",
        data() {
            return {
                currentDay:
                    {
                        isToday: true,
                        week: '周日',
                        day: '15'
                    }
            }
        },
        methods:{
            handleHour(e) {
                const rect = e.target.getBoundingClientRect()//获取点击的dom的位置
                this.$emit('handleHour', rect);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .schedule-day-view {

        .schedule-day-header {
            display: flex;
            justify-content: flex-start;
            padding: 16px 0 16px 64px;
            box-sizing: border-box;

            .schedule-day-item {
                width: 40px;
                padding: 0 8px;
                text-align: center;

                .week {
                    font-size: 14px;
                    color: #999;
                    margin-bottom: 8px;
                }

                .day {
                    font-size: 24px;
                    font-weight: bold;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 48px;
                    text-align: center;
                    color: #666;
                    transition: all ease .4s;
                    background: rgba(0, 0, 0, .02);
                }
            }

            .currentDay {
                .week {
                    @include listInfo_icon_theme($header-color-theme1);
                }

                .day {
                    @include background_theme($background-theme1);
                    color: #fff;
                }

            }
        }

        .schedule-day-content {
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;

            .schedule-day-hour-list {
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

            .schedule-day-list {
                width: calc(100% - 80px);
                font-size: 14px;
                color: #ccc;
                border-left: 1px solid #f1f1f1;
                border-top: 1px solid #f1f1f1;
                box-sizing: border-box;

                .week {
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
