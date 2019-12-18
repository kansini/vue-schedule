<template>
    <div class="oh-form-item" :class="{divider:divider}">
        <div class="form-item-icon" v-if="icon">
            <i class="font-icons">{{icon}}</i>
        </div>
        <div class="form-item-label" v-if="label">
            <span>{{label}}</span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "form-item",
        props: {
            icon: {
                type: String,
                default: null
            },
            label: {
                type: String,
                default: null
            },
            divider: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .oh-form-item {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .form-item-icon {
            height: 40px;
            line-height: 34px;
            color: #666;
            font-size: 22px;
            margin-right: 8px;
        }

        .form-item-label {
            color: #999;
            font-size: 14px;
            margin-right: 16px;
        }

        &:not(:last-child) {
            margin-bottom: 24px;
        }

        .oh-input:not(:last-child) {
           // margin-right: 8px;
        }
    }
    .divider {
        position: relative;
        &::before{
            position: absolute;
            content: '';
            width: calc(100% - 18px);
            height: 1px;
            right: 0;
            bottom: 0;
            background: #f1f1f1;
        }
    }

</style>
