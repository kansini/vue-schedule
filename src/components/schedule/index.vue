<template>
    <div class="schedule">
        <schedule-header @addSchedule="newSchedule" @showList="showScheduleList"/>
        <div class="schedule-content">
            <transition-group name="toggle-view" tag="div">
                <dayView v-if="currentViewIndex == 0" :key="0"></dayView>
                <weekView v-if="currentViewIndex == 1" :key="1"></weekView>
                <monthView v-if="currentViewIndex == 2 " :key="2" @handleDay="clickDay"></monthView>
                <yearView v-if="currentViewIndex == 3" :key="3"></yearView>
            </transition-group>
        </div>
        <oh-dialog :visible.sync="showDialog" :width="`${dialogWidth}px`" :height="`${dialogHeight}px`" title="新增日志"
                   :left="dialogLeft"
                   :top="dialogTop"
                   :ani="ani">
            <schedule-form></schedule-form>
            <div slot="extra" class="header-extra">
                <oh-button circle icon="more_vert"></oh-button>
            </div>
            <div slot="footer" class="dialog-footer">
                <oh-button type="flat" @click="showDialog = false">取消</oh-button>
                <oh-button type="primary" @click="showDialog = false">保存</oh-button>
            </div>
        </oh-dialog>
        <theme/>
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
                showDialog: false,
                drawer: false,
                dialogLeft: 16,
                dialogTop: 16,
                dialogWidth: 480,
                dialogHeight: 496,
                ani:"leftIn"
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
                this.showDialog = true
            },
            showScheduleList() {
                this.drawer = true
            },
            clickDay(rect) {
                this.showDialog = true
                let fullWidth = document.documentElement.clientWidth
                let fulHeight = document.documentElement.clientHeight
                let x = fullWidth - rect.x - rect.width - 40
                let y = fulHeight - rect.y
                if (x > this.dialogWidth) {
                    this.dialogLeft = rect.x + rect.width
                    this.ani = "leftIn"

                } else {
                    this.dialogLeft = rect.x - this.dialogWidth
                    this.ani = "rightIn"
                }
                if (y > this.dialogHeight) {
                    this.dialogTop = rect.y
                } else if (y < rect.height) {
                    this.dialogTop = rect.y - this.dialogHeight
                } else if (rect.y < this.dialogHeight) {
                    this.dialogTop = 16
                } else {
                    this.dialogTop = rect.y - this.dialogHeight + rect.height
                }
                // console.log(y)
                // console.log(dialogHeight)
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
