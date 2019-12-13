<template>
    <div class="schedule">
        <schedule-header @addSchedule="addSchedule"/>
        <div class="schedule-content">
            <transition-group name="toggle-view" tag="div">
                <dayView v-if="currentViewIndex == 0" :key="0"></dayView>
                <weekView v-if="currentViewIndex == 1" :key="1"></weekView>
                <monthView v-if="currentViewIndex == 2 " :key="2"></monthView>
                <yearView v-if="currentViewIndex == 3" :key="3"></yearView>
            </transition-group>
        </div>
        <el-dialog title="添加日志" :visible.sync="dialogAddSchedule">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                        :picker-options="pickerOptions" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="设置提醒">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="会议" name="type"></el-radio>
                        <el-radio label="地推活动" name="type"></el-radio>
                        <el-radio label="线下主题活动" name="type"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <oh-button type="flat" @click="dialogAddSchedule = false">取消</oh-button>
                <oh-button type="primary" @click="dialogAddSchedule = false">保存</oh-button>
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
                dialogAddSchedule: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
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
            transition: all linear .6s;
        }

        .toggle-view-enter, .toggle-view-leave-to {
            opacity: 0;
            transform: translateX(-200%);
        }

        .el-dialog {
            border-radius: 6px;
            box-shadow: 0 0px 20px rgba(0, 0, 0, .2);
        }
    }
</style>
