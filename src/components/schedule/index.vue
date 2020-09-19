<template>
    <div class="schedule">
        <schedule-header @addSchedule="newSchedule" @showList="showScheduleList"/>
        <div class="schedule-content">
            <transition-group name="toggle-view" tag="div">
                <dayView v-if="currentViewIndex == 0" :key="0" @handleHour="DayNewSchedule"></dayView>
                <weekView v-if="currentViewIndex == 1" :key="1" @handleHour="newSchedule"></weekView>
                <monthView v-if="currentViewIndex == 2 " :key="2" @handleDay="newSchedule"></monthView>
                <yearView v-if="currentViewIndex == 3" :key="3"></yearView>
            </transition-group>
        </div>
        <oh-dialog title="新增日志"
                   :visible.sync="showDialog"
                   :width="`${dialogWidth}px`"
                   :height="`${dialogHeight}px`"
                   :left="dialogLeft"
                   :top="dialogTop"
                   :ani="ani"
                   :close-on-click="true"
        >
            <schedule-form :form="form"></schedule-form>
            <div slot="extra" class="header-extra">
                <el-tooltip effect="dark" content="更多">
                    <oh-button circle icon="more_vert"></oh-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="保存">
                    <oh-button circle icon="save" @click="saveSchedule"></oh-button>
                </el-tooltip>
            </div>
            <!--            <div slot="footer" class="dialog-footer">-->
            <!--                <oh-button type="flat" @click="showDialog = false">取消</oh-button>-->
            <!--                <oh-button type="primary" @click="showDialog = false">保存</oh-button>-->
            <!--            </div>-->
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
                ani: "leftIn",
                form: {
                    title: '',
                    startDate: '',
                    region: '',
                    isNotify: false,
                    date1: '',
                    date2: '',
                    inviter: '',
                    type: [],
                    resource: '',
                    desc: ''
                }
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
            showScheduleList() {
                this.drawer = true
            },
            newSchedule(rect, item) {
                this.showDialog = true
                //this.form.date1 = date
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
                console.log(item.event.title)
            },
            saveSchedule() {
                this.showDialog = false

            },
            DayNewSchedule(rect) {
                this.showDialog = true
                let fulHeight = document.documentElement.clientHeight
                let y = fulHeight - rect.y
                this.dialogLeft = 400
                this.ani = "leftIn"
                if (y > this.dialogHeight) {
                    this.dialogTop = rect.y
                } else if (y < rect.height) {
                    this.dialogTop = rect.y - this.dialogHeight
                } else if (rect.y < this.dialogHeight) {
                    this.dialogTop = 16
                } else {
                    this.dialogTop = rect.y - this.dialogHeight + rect.height
                }
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
