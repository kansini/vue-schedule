<template>
    <div class="schedule">
        <schedule-header @addSchedule="newSchedule" @showList="showScheduleList"/>
        <div class="schedule-content">
            <transition-group name="toggle-view" tag="div">
                <dayView v-if="currentViewIndex == 0" :key="0"></dayView>
                <weekView v-if="currentViewIndex == 1" :key="1"></weekView>
                <monthView v-if="currentViewIndex == 2 " :key="2" @handleDay="dialogAddSchedule = true"></monthView>
                <yearView v-if="currentViewIndex == 3" :key="3"></yearView>
            </transition-group>
        </div>
        <oh-dialog :visible.sync="dialogAddSchedule" :close-on-click="true">
            <schedule-form></schedule-form>
            <div slot="extra" class="header-extra">
                <oh-button circle icon="edit"></oh-button>
                <oh-button circle icon="delete"></oh-button>
                <oh-button circle icon="more_vert"></oh-button>
            </div>
            <div slot="footer" class="dialog-footer">
                <oh-button type="flat" @click="dialogAddSchedule = false">取消</oh-button>
                <oh-button type="primary" @click="dialogAddSchedule = false">保存</oh-button>
            </div>
        </oh-dialog>
    </div>
</template>

<script>
    import scheduleHeader from './Header'
    import dayView from './DayView'
    import weekView from './WeekView'
    import monthView from './MonthView'
    import yearView from './YearView'
    import scheduleForm from './ScheduleForm'

    export default {
        name: 'schedule',
        components: {
            scheduleHeader,
            dayView,
            weekView,
            monthView,
            yearView,
            scheduleForm
        },
        data() {
            return {
                dialogAddSchedule: false,
                drawer: false
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
            newSchedule() {
                this.dialogAddSchedule = true
            },
            showScheduleList() {
                this.drawer = true
            }

        }
    }
</script>

<style lang="scss">
    .schedule {
        width: 100%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;

        .schedule-content {
            margin-top: 64px;
        }

        .toggle-view-enter-active, .toggle-view-leave-active {
            transition: all linear .6s;
        }

        .toggle-view-enter, .toggle-view-leave-to {
            opacity: 0;
            transform: translateX(-200%);
        }

        .el-dialog {
            border-radius: 8px;
            box-shadow: 0 0px 20px rgba(0, 0, 0, .2);
        }

    }
</style>
