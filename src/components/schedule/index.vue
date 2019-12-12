<template>
    <div class="schedule">
        <schedule-header @addSchedule="addSchedule"/>
        <div class="schedule-content">
            <transition-group name="toggle-view" tag="div">
                <dayView v-if="currentViewIndex == 0" :key="currentViewIndex"></dayView>
                <weekView v-if="currentViewIndex == 1" :key="currentViewIndex"></weekView>
                <monthView v-if="currentViewIndex == 2 " :key="currentViewIndex"></monthView>
                <yearView v-if="currentViewIndex == 3" :key="currentViewIndex"></yearView>
            </transition-group>
        </div>
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

<style lang="scss" >
    .schedule {
        //padding: 24px;
        width: 100%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;

        .schedule-content {
            margin-top: 64px;

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
