<template>
    <div :icon="icon" class="oh-button" :class="{rotate:rotate}" @click="handleToClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "oh-button",
        props: {
            icon: {
                type: String,
                default: ""
            },
            rotate: {
                type: Boolean,
                default: false
            }

        },
        methods: {
            handleToClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .oh-button {
        position: relative;
        width: 40px;
        height: 40px;
        line-height: 42px;
        text-align: center;
        border-radius: 20px;
        //border: 1px solid rgba(0,0,0,0);
        box-sizing: border-box;
        transition: all linear .4s;
        cursor: pointer;
        color: #333;

        &:hover {
            transform: scale(1.2);
            @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
        }

        &::before {
            content: attr(icon);
            font-family: 'Material Icons';
            font-size: 22px;
        }
    }

    .rotate {
        &:hover {
            transform: rotate(-360deg);
        }
    }

</style>
