<template>
    <div class="schedule-form">
        <form action="" :v-model="form">
            <oh-input label="请添加日志标题" large v-model="form.name" auto-focus icon="title"/>
            <oh-input label="开始日期 - 结束日期" v-model="form.region" icon="access_time"/>
            <oh-input label="添加邀请对象" v-model="form.date1" icon="people"/>
            <oh-input label="添加地点" v-model="form.date1" icon="location_on"/>
            <oh-input label="设置提醒" v-model="form.date1" icon="notifications_active"/>
            <oh-input label="添加说明" v-model="form.date1" icon="description"/>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ScheduleForm",
        props: ['form'],
        data() {
            return {
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: '明天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() + 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '一周后',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>
