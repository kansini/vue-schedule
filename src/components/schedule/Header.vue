<template>
    <div class="schedule-header">
        <div class="schedule-header-item" v-if="hasTitle">
            <div class="logo-icon">
                <oh-animation id="icon-calendar" renderer="canvas"></oh-animation>
            </div>
            <h2>SCHEDULE V0.1.0</h2>
        </div>
        <div class="schedule-header-center" v-if="hasTitle">
            <oh-tab :tabs="views"></oh-tab>
        </div>
        <div class="schedule-header-item" >
            <div class="toggleDate" v-if="currentViewIndex === 0">
                <div class="btn-prev" @click="handlePrevDay"></div>
                <div class="current-date">{{this.time.day}}日</div>
                <div class="btn-next" @click="handleNextDay"></div>
            </div>
            <div class="toggleDate" v-if="currentViewIndex === 1">
                <div class="btn-prev" @click="handlePrevWeek"></div>
                <div class="current-date">{{this.time.month+1}}月{{this.time.day}}日</div>
                <div class="btn-next" @click="handleNextWeek"></div>
            </div>
            <div class="toggleDate" v-if="currentViewIndex === 2">
                <div class="btn-prev" @click="handlePrevMonth"></div>
                <div class="current-date">{{currentDate}}</div>
                <div class="btn-next" @click="handleNextMonth"></div>
            </div>
            <div class="toggleDate" v-if="currentViewIndex === 3">
                <div class="btn-prev" @click="handlePrevYear"></div>
                <div class="current-date">{{this.time.year}}年</div>
                <div class="btn-next" @click="handleNextYear"></div>
            </div>
            <el-tooltip class="item" effect="dark" placement="top" content="返回当前">
                <oh-button icon="restore" rotate circle @click="handleToday"></oh-button>
            </el-tooltip>
<!--            <el-tooltip class="item" effect="dark" content="新增日志">-->
<!--                <oh-button icon="add_circle_outline" circle @click="addSchedule"></oh-button>-->
<!--            </el-tooltip>-->
            <el-tooltip class="item" effect="dark" content="日志列表">
                <oh-button icon="event_note" circle @click="showList"></oh-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="提醒">
                <oh-button :icon="notify?'notifications_active':'notifications'" circle :class="{notify:notify}"
                           @click="notify = !notify"></oh-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="isFullScreen ? '退出全屏' : '全屏' " placement="top">
                <oh-button :icon="fullscreenIcon" circle @click="toggleFullscreen"></oh-button>
            </el-tooltip>
            <el-dropdown trigger="click">
                <oh-button icon="apps" circle></oh-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="showTheme(true)">
                        <i class="font-icons">palette</i>
                        主题
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <i class="font-icons">print</i>
                        打印
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <i class="font-icons">help</i>
                        帮助
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>

<script>
    import * as CALENDAR from '@/utils/calendar.js'
    import screenFull from 'screenfull'

    export default {
        data() {
            return {
                views: ["日", "周", "月", "年"],
                isFullScreen: false,
                fullscreenIcon: "fullscreen",
                notify: false
            }
        },
        props: {
            hasTitle: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            currentViewIndex: {
                get() {
                    return this.$store.state.schedule.currentViewIndex
                },
                set() {

                }
            },
            currentDate: {
                get() {
                    return this.$store.state.schedule.currentDate
                },
                set() {

                }
            },
            time: {
                get() {
                    return this.$store.state.schedule.time
                },
                set() {

                }
            }
        },
        methods: {
            // 前一天
            handlePrevDay() {
                this.time.day -= 1
                let day = new Date(this.time.day + 24 * 60 * 60 * 1000).getDate()
                let currentDate = `${this.time.year}年${this.time.month + 1}月${day}号`;
                this.toggleCurrentDate(currentDate)
            },
            // 后一天
            handleNextDay() {
                this.time.day += 1
                let day = new Date(this.time.day + 24 * 60 * 60 * 1000).getDate()
                let currentDate = `${this.time.year}年${this.time.month + 1}月${day}号`;
                this.toggleCurrentDate(currentDate)
            },
            // 上一周
            handlePrevWeek() {
                this.time.day -= 7
                let day = new Date(this.time.day + 24 * 60 * 60 * 1000).getDate()
                let currentDate = `${this.time.year}年${this.time.month + 1}月${day}号`;
                this.toggleCurrentDate(currentDate)
            },
            // 下一周
            handleNextWeek() {
                this.time.day += 7
            },
            // 上一个月
            handlePrevMonth() {
                let prevMonth = CALENDAR.getDate(this.time.year, this.time.month, 1);
                prevMonth.setMonth(prevMonth.getMonth() - 1);
                this.setTime(CALENDAR.getNewDate(prevMonth))
                let currentDate = `${this.time.year}年${CALENDAR.month(this.time.month)}`;
                this.toggleCurrentDate(currentDate)
            },
            // 下一个月
            handleNextMonth() {
                let nextMonth = CALENDAR.getDate(this.time.year, this.time.month, 1);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                this.setTime(CALENDAR.getNewDate(nextMonth))
                let currentDate = `${this.time.year}年${CALENDAR.month(this.time.month)}`;
                this.toggleCurrentDate(currentDate)
            },
            // 上一年
            handlePrevYear() {
                this.time.year -= 1
                let currentDate = `${this.time.year}年`;
                this.toggleCurrentDate(currentDate)
            },
            // 下一年
            handleNextYear() {
                this.time.year += 1
                let currentDate = `${this.time.year}年`;
                this.toggleCurrentDate(currentDate)
            },
            // 回到今天
            handleToday() {
                this.setTime(CALENDAR.getNewDate(new Date()))
                let today = this.time.year + '年' + CALENDAR.month(this.time.month)
                this.toggleCurrentDate(today)
            },
            //新增日志
            addSchedule() {
                this.$emit('addSchedule');
            },
            showList() {
                this.$emit('showList');
            },
            toggleCurrentDate(currentDate) {
                this.$store.commit("schedule/SET_CURRENT_DATE", {currentDate})
            },
            setTime(time) {
                this.$store.commit("schedule/SET_TIME", {time})
            },
            showTheme(showThemeSelector) {
                this.$store.commit('theme/SET_THEME_SELECTOR', {showThemeSelector})
            },
            toggleFullscreen() {
                screenFull.toggle()
                if (!this.isFullScreen) {
                    this.isFullScreen = true
                    this.fullscreenIcon = "fullscreen_exit"
                } else {
                    this.isFullScreen = false
                    this.fullscreenIcon = "fullscreen"
                }
            },
        }
    }
</script>

<style lang="scss">
    .schedule-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        box-sizing: border-box;
        // border-bottom: 1px solid #f1f1f1;
        background: rgba(255, 255, 255, .9);
        box-shadow: 0 0px 20px rgba(0, 0, 0, .03);
        z-index: 999;

        .schedule-header-item {
            align-items: center;
            display: flex;
            justify-content: space-between;

            .logo-icon {
                position: relative;
                width: 48px;
                height: 48px;
                margin-right: 8px;
                overflow: hidden;

                #icon-calendar {
                    position: absolute;
                    left: -36px;
                    top: -36px
                }
            }

            .toggleDate {
                align-items: center;
                display: flex;
                justify-content: space-between;

                .btn-prev,
                .btn-next {
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    text-align: center;
                    line-height: 32px;
                    border-radius: 32px;
                    color: #999;
                    transition: all ease .6s;

                    &:hover {
                        @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
                    }

                    &::before {
                        font-family: 'Material Icons';
                        font-size: 20px;
                        -webkit-font-smoothing: antialiased;
                        text-rendering: optimizeLegibility;
                        -moz-osx-font-smoothing: grayscale;
                        -webkit-font-feature-settings: 'liga';
                        -moz-font-feature-settings: 'liga';
                        font-feature-settings: 'liga';
                    }
                }

                .btn-prev {
                    &::before {
                        content: 'navigate_before';
                    }
                }

                .btn-next {
                    &::before {
                        content: 'navigate_next';
                    }

                }
            }

            .el-dropdown {
                margin-left: 16px;
            }

            .btn-today {
                margin-right: 24px;
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 20px;
                text-align: center;
                transition: all ease .4s;
                @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
                cursor: pointer;

                &:hover {
                    @include background_theme($background-theme1);
                    color: #fff;
                }
            }
        }

        .schedule-header-center {
            align-items: center;
            position: absolute;
            width: 256px;
            left: calc(50% - 128px);

        }

        .toggle-view-tab {
            display: flex;

            .toggle-view-tab-item {
                width: 64px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                //color: #999;
                font-weight: 300;
                @include border_theme($border_theme1);
                border: 1px solid;
                box-sizing: border-box;
                transition: all ease .6s;
                cursor: pointer;

                &:not(:nth-child(1)) {
                    margin-left: -1px;
                }

                &:nth-child(1) {
                    border-radius: 6px 0 0 6px;
                }

                &:nth-last-child(1) {
                    border-radius: 0 6px 6px 0;
                }
            }

            .notCurrent {
                @include listInfo_icon_theme($header-color-theme1);

                &:hover {
                    @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
                }
            }

            .current {
                @include border_theme($border_theme1);
                @include background_theme($background-theme1);
                color: #fff;
                box-sizing: border-box;
            }
        }


        .current-date {
            font-size: 20px;
            color: #333;
            //font-weight: bold;
            margin: 0 4px;
        }

        .schedule-today {
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #2061FF;
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 14px;
            color: #2061FF;
            cursor: pointer;
        }

        .notify {
            @include listInfo_icon_theme($header-color-theme1);
            animation: swing linear .3s infinite;
        }

        @keyframes swing {
            0% {
                transform: rotate(25deg);
            }
            25% {
                transform: rotate(-25deg);
            }
            50% {
                transform: rotate(25deg);
            }
            75% {
                transform: rotate(-25deg);
            }
            100% {
                transform: rotate(25deg);
            }

        }
    }
</style>
