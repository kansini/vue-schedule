<template>
    <div class="schedule-form">
        <form action="" v-model="form">
            <oh-form-item icon="title">
                <oh-input placeholder="请添加日志标题" large v-model="form.title" auto-focus clearable/>
            </oh-form-item>
            <oh-form-item icon="access_time">
                <oh-date-picker placeholder="开始日期" v-model="form.startDate"/>
<!--                <oh-input placeholder="结束日期" v-model="form.startDate"/>-->
            </oh-form-item>
            <oh-form-item icon="group_add">
                <oh-input placeholder="添加邀请对象" v-model="form.inviter" clearable/>
            </oh-form-item>
            <oh-form-item icon="location_on">
                <oh-input placeholder="添加地点" v-model="form.date1"/>
            </oh-form-item>
            <oh-form-item icon="notifications" divider>
                <ohSwitch label="开启提醒" v-model="form.isNotify" @click.native="aaa"></ohSwitch>
            </oh-form-item>
            <oh-form-item icon="subject">
                <oh-input placeholder="添加说明" type="textarea" v-model="form.date1" clearable/>
            </oh-form-item>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ScheduleForm",
        props: ['form'],
        data() {
            return {}
        },
        computed: {
            startDate: {
                get() {
                    return this.$store.state.schedule.currentDay
                },
                set() {

                }
            }

        },
        methods: {
            aaa() {
                this.$nextTick(() => {
                    //  console.log(this.form.isNotify)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
