<template>
    <div class="schedule-year-view">
        <div class="schedule-year-list">
            <div class="schedule-year-list-item" v-for="(item,index) in monthList">
                <monthViewThumb :month="item"></monthViewThumb>
            </div>
        </div>
    </div>
</template>

<script>
    import monthViewThumb from './MonthViewThumb'

    export default {
        name: "yearView",
        components: {monthViewThumb},
        data() {
            return {
                monthList: [
                    {
                        name: '01月',
                        monthIndex: 0
                    },
                    {
                        name: '02月',
                        monthIndex: 1
                    },
                    {
                        name: '03月',
                        monthIndex: 2
                    },
                    {
                        name: '04月',
                        monthIndex: 3
                    },
                    {
                        name: '05月',
                        monthIndex: 4
                    },
                    {
                        name: '06月',
                        monthIndex: 5
                    },
                    {
                        name: '07月',
                        monthIndex: 6
                    },
                    {
                        name: '08月',
                        monthIndex: 7
                    },
                    {
                        name: '09月',
                        monthIndex: 8
                    },
                    {
                        name: '10月',
                        monthIndex: 9
                    },
                    {
                        name: '11月',
                        monthIndex: 10
                    },
                    {
                        name: '12月',
                        monthIndex: 11
                    }
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .schedule-year-view {
        padding-top: 24px;

        .schedule-year-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .schedule-year-list-item {
                width: calc(100% / 4);
                padding: 0 24px;
                box-sizing: border-box;
                border-radius: 0px;
                transition: all ease .6s;

                &:hover {
                    border-radius: 8px;
                    box-shadow: 0 0 30px rgba(0, 0, 0, .1);
                    transform: scale(1.05);
                }
            }
        }

    }
</style>
