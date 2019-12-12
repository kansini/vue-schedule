<template>
    <div class="schedule">
        <schedule-header @addSchedule="addSchedule"/>
        <transition-group name="toggle-view">
            <dayView v-if="currentViewIndex == 0" :key="currentViewIndex"></dayView>
            <weekView v-if="currentViewIndex == 1" :key="currentViewIndex"></weekView>
            <monthView v-if="currentViewIndex == 2 " :key="currentViewIndex"></monthView>
            <yearView v-if="currentViewIndex == 3" :key="currentViewIndex"></yearView>
        </transition-group>
        <el-dialog title="新增日志" :visible.sync="dialogAddSchedule">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddSchedule = false">取 消</el-button>
                <el-button type="primary" @click="dialogAddSchedule = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import scheduleHeader from './Header'
    import dayView from './DayView'
    import weekView from './WeekView'
    import monthView from './MonthView'
    import yearView from './YearView'

    export default {
        name: 'schedule',
        components: {
            scheduleHeader,
            dayView,
            weekView,
            monthView,
            yearView
        },
        data() {
            return {
                dialogAddSchedule: false
            }
        },
        computed: {
            currentViewIndex: {
                get() {
                    return this.$store.state.schedule.currentViewIndex
                },
                set() {

                }
            }
        },
        methods: {
            addSchedule() {
                this.dialogAddSchedule = true
            }
        }
    }
</script>

<style lang="scss">
    .schedule {
        padding: 24px;
        width: 100%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;

        .calendar-week {
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
            }
        }

        .calendar-view {
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

                .day {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 32px;
                    text-align: center;
                    transition: all ease .4s;
                    //@include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
                    background: rgba(0, 0, 0, .02);
                }

                .CALENDAR-list {
                    font-size: 12px;
                    padding: 8px;
                    box-sizing: border-box;

                    .CALENDAR-list-item {
                        color: #999;
                        position: relative;
                        // text-indent: 16px;

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
                            // content: '';
                            position: absolute;
                            top: 4px;
                            left: 0px;
                            width: 8px;
                            height: 8px;
                            border-radius: 8px;
                            // box-shadow: 0 0 0 3px $red-2;
                            background: $red-6;
                        }
                    }
                }


            }

            .current {
                background: #fff;
                transition: all ease .4s;

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
                cursor: not-allowed;
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

        .toggle-view-enter-active, .toggle-view-leave-active {
            transition: all linear .3s;
        }

        .toggle-view-enter, .toggle-view-leave-to {
            opacity: 0;
            transform: translateX(-200%);
        }

    }
</style>
