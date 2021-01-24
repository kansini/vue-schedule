<template>
    <div class="oh-date-picker">
        <div class="oh-date-picker-item">
            <oh-input placeholder="开始日期" @focus="showPanel = true" @blur="showPanel = false"/>
            <div class="oh-date-picker-panel" v-if="showPanel">
                <monthViewThumb/>
            </div>
        </div>
        <div class="oh-separator">-</div>
        <div class="oh-date-picker-item">
            <oh-input placeholder="结束日期" @focus="showPanel = true" @blur="showPanel = false"/>
            <div class="oh-date-picker-panel" v-if="showPanel">
                <monthViewThumb/>
            </div>
        </div>

        <!--        <el-date-picker-->
        <!--                v-model="aaa"-->
        <!--                type="daterange"-->
        <!--                range-separator="至"-->
        <!--                start-placeholder="开始日期"-->
        <!--                end-placeholder="结束日期"-->
        <!--                @change="handleToChange"-->
        <!--                @input="handleToInput"-->
        <!--        >-->
        <!--        </el-date-picker>-->
    </div>
</template>

<script>
    import monthViewThumb from '@/components/schedule/MonthViewThumb'

    export default {
        name: "DatePicker",
        components: {monthViewThumb},
        data() {
            return {
                aaa: '',
                showPanel: false
            }
        },
        methods: {
            handleToInput(e) {
                this.$emit('input', e)
            },
            handleToChange(e) {
                this.$emit('change', e)
            },
        }

    }
</script>

<style lang="scss" scoped>
    .oh-date-picker {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .oh-date-picker-item {
            width: 100%;
            position: relative;

            .oh-date-picker-panel {
                position: absolute;
                min-width: 320px;
                z-index: 9999;
                background: #fff;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);

            }
        }

        .oh-separator {
            padding: 0 12px;
            color: #999;
        }
    }
</style>
