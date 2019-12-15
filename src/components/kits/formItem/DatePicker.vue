<template>
    <div class="oh-date-picker">
        <el-date-picker
                v-model="aaa"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleToChange"
                @input="handleToInput"
        >
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "DatePicker",
        data() {
            return {
                aaa: ''
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
        margin-bottom: 16px;;
        .el-date-editor {
            width: 100%;
            height: 40px;
            line-height: 40px;
        }
        .el-input__inner{
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #f1f1f1;
        }
    }
</style>
