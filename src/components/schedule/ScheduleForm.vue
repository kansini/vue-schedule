<template>
    <div class="schedule-form">
        <form action="" v-model="form">
            <oh-form-item>
                <oh-input label="请添加日志标题" large v-model="form.name" auto-focus icon="title"/>
            </oh-form-item>
            <oh-form-item>
                <oh-input label="开始日期" v-model="startDate" icon="access_time" readonly/>
                <oh-input label="结束日期" v-model="startDate" icon="remove" readonly/>
            </oh-form-item>
            <oh-form-item>
                <oh-input label="添加邀请对象" v-model="form.inviter" icon="people"/>
            </oh-form-item>
            <oh-form-item>
                <oh-input label="添加地点" v-model="form.date1" icon="location_on"/>
            </oh-form-item>
            <oh-form-item>
                <oh-input label="设置提醒" v-model="form.date1" icon="notifications_active"/>
            </oh-form-item>
            <oh-form-item>
                <oh-input label="添加说明" v-model="form.date1" icon="subject"/>
            </oh-form-item>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ScheduleForm",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: this.startDate,
                    date2: '',
                    inviter: '老王',
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        computed:{
            startDate: {
                get() {
                    return this.$store.state.schedule.currentDay
                },
                set() {

                }
            }

        }
    }
</script>

<style lang="scss" scoped>
</style>
